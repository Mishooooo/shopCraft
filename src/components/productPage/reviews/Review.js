"use client";

import React, { useEffect, useState } from "react";
import classes from "./global.module.css";
import { Rating } from "@mui/material";
import { useSession } from "next-auth/react";
import AddReview from "./AddReview";
import DeleteReview from "./DeleteReview";
import AddReviewReact from "./AddReviewReact";
import Link from "next/link";

const RATING_VALUES = [5, 4, 3, 2, 1];

export default function Review({ review }) {
 
  const session = useSession();
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    setReviewData(review || []);
  }, [review]);

  const averageRating = () => {
    const totalRatings = reviewData.reduce((sum, rev) => sum + rev.rating, 0);
    return totalRatings / reviewData.length;
  };

  const calculatePercentage = (rating) => {
    const ratingCount = reviewData.filter(
      (rev) => rev.rating === rating
    ).length;
    const totalReviews = reviewData.length;
    return (ratingCount / totalReviews) * 100 || 0;
  };

  const addReview = (newReview) => {
    setReviewData((prevReviews) => {
      return prevReviews.concat(newReview);
    });
  };

  const delReview = (delReview) => {
    setReviewData((prevReviews) => {
      return prevReviews.filter((review) => review._id !== delReview);
    });
  };

  return (
    <div className={classes.container}>
      <h2>Costumer review</h2>
      <div className={classes["stars-container"]}>
        <div>
          <h6>Average rating</h6>
          <Rating
            name="half-rating-react"
            value={averageRating()}
            precision={0.5}
            readOnly
            style={{ color: "#FACF19 " }}
          />
        </div>
        <ul className={classes.percentage}>
          {RATING_VALUES.map((rating, i) => (
            <li key={i}>
              <Rating
                name="half-rating-react"
                defaultValue={+rating}
                readOnly
                style={{ color: "#FACF19 " }}
              />
              <div className={classes["percentage-range"]}>
                <div
                  style={{
                    width: `${calculatePercentage(rating)}%`,
                  }}
                />
              </div>
              <span>{calculatePercentage(rating).toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </div>

      {reviewData.map((rev, i) => (
        <li key={i} className={classes.reviewContainer}>
          <div className={classes.user}>
            <img src={rev.userId?.image} alt="avatar" width={50} height={50} />
            <p>{rev.userId.userName}</p>
          </div>
          <div className={classes.comment}>
            <div className={classes.ratingContainer}>
              <Rating
                name="half-rating-react"
                defaultValue={+rev.rating}
                readOnly
                style={{ color: "#FACF19" }}
              />
              <AddReviewReact
                revReacts={rev.reacts || []}
                session={session}
                reviewId={rev._id}
              />
            </div>
            <div className={classes.commentContainer}>
              <p>{rev.comment}</p>
              {session.data?.id === rev.userId._id && (
                <DeleteReview reviewId={rev._id} delReview={delReview} />
              )}
            </div>
          </div>
        </li>
      ))}

      {session.status === "authenticated" ? (
        <AddReview session={session} addReview={addReview} />
      ) : (
        <Link href="/auth/signin">
          <button>login and review</button>
        </Link>
      )}
    </div>
  );
}
