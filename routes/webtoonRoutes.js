import  express from 'express';
import  { protect }  from '../middlwares/auth.js';
import  {getWebtoons,getWebtoonById,addWebtoon,deleteWebtoon} from '../controllers/webtoonsController.js'

const router = express.Router();;

router.get('/',getWebtoons );


router.post('/addwebtoons', protect, addWebtoon);


  // @desc Get a specific webtoon by ID
router.get('/:id',protect, getWebtoonById);
  

  router.delete('/:id', protect, deleteWebtoon);
  


export default router;