import { TrashIcon } from '@heroicons/react/outline'
import classes from './DeleteReview.module.css'
import { useDispatch } from 'react-redux';
import { setOverlay } from '@/store/overlaySlice';


export default function DeleteReview({reviewId, delReview}) {
      const dispatch = useDispatch();
  

const deleteReview =  async () => {
     const response = await fetch(
       `/api/product/review?reviewId=${reviewId}` , {
     method: 'DELETE'
       }
     );

    if (!response.ok || !(response.status >= 200 && response.status < 300)) {
      const errorText = `Sorry, there was a problem deleting your review. Please try again later. HTTP error! Status: ${response.status}`;
      return dispatch(setOverlay({ text: errorText }));
    }

     delReview(reviewId);
}

  return (
    <TrashIcon className={classes.trashIcon} onClick={deleteReview}/>
  )
}
