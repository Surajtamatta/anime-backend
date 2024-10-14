import User  from '../models/user.js'
import jwt  from 'jsonwebtoken'





export const register = async (req, res) => {
    const { username, password, email, fullname } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });
        const newUser = new User({ username, password, email, fullname });
        await newUser.save();

        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();

        newUser.refreshToken = refreshToken;
        await newUser.save();

        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

        res.status(200).json({ user: createdUser });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




// export const login = async (req, res) => {
//     const {password,email} = req.body;
//     try {
//         const user = await User.findOne({email});
//         if(!user) return res.status(400).json({error: 'User not found'});
//         const isMatch = await user.isPasswordCorrect({password})
//         if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();
//         user.refreshToken = refreshToken;
//         await user.save({validateBeforeSave: true});


//         const loginuser = await User.findById(user._id).select("-password -refreshToken");
//         // Send the tokens in the response

//         const options = {
//             httpOnly: true,
//             secure:true
//         }

//         res.status(200)
//         .cookie({"accessToken":accessToken,"refreshToken":refreshToken,options:options,})
//         .json(200,{user:loginuser,accessToken,refreshToken},"user login sucessfully")
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }

// };



export const login = async (req, res) => {
    const { password, email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await user.isPasswordCorrect(password); // Fixed: Pass password directly
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refreshToken in the user document
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: true });
        
        console.log('Generated Tokens:', accessToken, refreshToken);
        
        // Get the user without sensitive fields like password or refreshToken
        const loginUser = await User.findById(user._id).select("-password -refreshToken");

        // Cookie options
        const options = {
            httpOnly: true,
            secure: false, // Set to false for local testing. Change to true when in production (HTTPS).
            sameSite: 'Strict', // To prevent CSRF attacks
        };

        // Set cookies properly
        res.cookie("accessToken", accessToken, options);  // Set accessToken cookie
        res.cookie("refreshToken", refreshToken, options);  // Set refreshToken cookie

        console.log('Cookies set:', req.cookies);

        // Send the response along with tokens and user info
        return res.status(200).json({
            user: loginUser,
            accessToken,
            refreshToken,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};






export const logout = async (req, res) => {
    User.findById(
        req.user._id,
        {
            $set:{
                refreshToken: undefined,
            }
        }

    )

    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(200,"user logout")
};




// export const refreshToken = async (req, res) => {
//     const {refreshToken,email} = req.body;
//     try {
//         const user = await User.findOne({email});
//         if (!user.refreshToken) return res.status(403).json({ message: 'Access denied' });

//         jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//             if (err) return res.status(403).json({ message: 'Invalid refresh token' });
        
//             const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
//             res.json({ accessToken:accessToken });
//           });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }

// };

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies; // Assuming the refresh token is stored in cookies
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found, login again' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'Invalid refresh token' });
        const newAccessToken = user.generateAccessToken();
        res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: false });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};