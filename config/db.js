import mongoose from 'mongoose';
import  {DB_NAME}  from '../constant.js';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`,clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('MongoDB Connected...');
    }
    catch(error){
        console.error('error connecting mongoose',error);
        process.exit(1);
    }
    // finally {
    //     await mongoose.disconnect();
    //   }
}

export default connectDB;