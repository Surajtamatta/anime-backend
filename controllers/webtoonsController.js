import  Webtoons  from '../models/webtoon.js';



export const getWebtoons = async (req, res) => {
    try {
        const webtoons = await Webtoons.find()
        res.status(200).json(webtoons);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error,"error fetching webtoons");

        
      }
}




export const getWebtoonById =async (req, res) => {
    try {
      const webtoon = await Webtoon.findById(req.params.id);
      if (!webtoon) return res.status(404).json({ error: 'Webtoon not found' });
      res.json(webtoon);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }




export const addWebtoon=async (req, res) => {
    try {
      const { title, summary, characters, imgUrl } = req.body;
      console.log(title, summary, characters, imgUrl);
      
      const newWebtoon = new Webtoons({ title, summary, characters, imgUrl });
      await newWebtoon.save();
      res.status(201).json({
        message: 'Webtoon added successfully',
        webtoon: newWebtoon
    });
    } catch (error) {
      res.status(400).json({ error: 'Error adding webtoon',message: error });
    }
  }





export const deleteWebtoon =async (req, res) => {
    try {
      const webtoon = await Webtoon.findById(req.params.id);
      if (!webtoon) return res.status(404).json({ error: 'Webtoon not found' });
  
      await webtoon.remove();
      res.json({ message: 'Webtoon removed' });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }
