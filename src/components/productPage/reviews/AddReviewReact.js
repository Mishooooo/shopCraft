import { ThumbUpIcon } from "@heroicons/react/outline";
import classes from "./AddReviewReact.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
export default function AddReviewReact({ session, reviewId, revReacts }) {
  const dispatch = useDispatch();

  const userId = session.data?.id;

  const [likesQuantity, setLikesQuantity] = useState(revReacts.length);
  const [alreadyLiked, setAlreadyLiked] = useState(revReacts.includes(userId));

  const reactToReview = async () => {
    setLikesQuantity(alreadyLiked ? likesQuantity - 1 : likesQuantity + 1);
    setAlreadyLiked((prevState) => !prevState);

    const response = await fetch(`/api/product/review/reacts?reviewId=${reviewId}`, {
      method: "POST",
    });
    if (!response.ok || !(response.status >= 200 && response.status < 300)) {
      return dispatch(
        setOverlay({
          text: `Sorry, could not react to this review. status: ${response.status}`,
        })
      );
    }
  };

  return (
    <div className={classes.container}>
      <ThumbUpIcon
        onClick={reactToReview}
        className={alreadyLiked ? classes.liked : ""}
      />

      <span>{likesQuantity} like</span>
    </div>
  );
}
