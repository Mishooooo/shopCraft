import classes from "./ShopPost.module.css";
import styles from "./VerticalShopPost.module.css";
import CarouselContainer from "../slider/CarouselContainer";
import Link from "next/link";
import timeAgoString from "@/lib/timeAgoString";
import { HeartIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "@/store/favoritesSlice";
import { selectFavoritesAndCart } from "@/store";
import { setOverlay } from "@/store/overlaySlice";

const ShopPost = ({
  postData,
  forRecommendationSection,
  displayVertically,
  averagePrice,
  standardDeviation,
  onProductDelete,
  myAds
}) => {
  const dispatch = useDispatch();

  const { favorites } = useSelector(selectFavoritesAndCart);
  const inFavorites = favorites.some((item) => item?._id === postData._id);

  const depParams = postData.departments?.join(".");

  // Function to classify product price
  function classifyPrice(product) {
    const priceDifference = Math.abs(product - averagePrice);

    if (priceDifference <= standardDeviation) {
      return "Average";
    } else if (product < averagePrice) {
      return "Low";
    } else {
      return "High";
    }
  }


  const handleFavorites =  (e) => {
    e.preventDefault(); // prevent 'Link' behavior

      if (!inFavorites) dispatch(addToFavorites(postData));
      if (inFavorites) dispatch(removeFromFavorites(postData));

        fetchFunction(
          `/api/user-page/favorites?productId=${postData?._id}`,
          inFavorites ? "DELETE" : "POST"
        );
     
  };  

const handleProductDelete = (e) => {
  e.preventDefault();
  dispatch(
    setOverlay({
      text: "Warning: Deleting your product cannot be undone!",
      onConfirm: onProductDelete.bind(null, postData._id),
    })
  );
};

  if (displayVertically)
    return (
      <Link
        href={`/product/${postData._id}?dep=${depParams}`}
        className={styles.container}
        prefetch={false} // Disable automatic prefetching
      >
        <div className={styles.imageContainer}>
          <CarouselContainer
            images={postData.images}
            showArrows={true}
            showIndicators={true}
            width={150}
            height={150}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            {!myAds ? ( // if user is not in my-ads page, else show delete button, to  let users delete their product
              <div className={styles.author}>
                <img src={postData.userId?.image} alt="author" />
                <p>{postData.userId?.userName}</p>
              </div>
            ) : (
              <TrashIcon
                className={classes.trashIcon}
                onClick={handleProductDelete}
              />
            )}

            <HeartIcon
              className={inFavorites ? styles.inFavorites : ""}
              onClick={handleFavorites}
            />
          </div>
          <h2 className={styles.title}>{postData.title}</h2>

          <p className={styles.description}>{postData.description}</p>

          <div className={styles["post-footer"]}>
            <div className={styles.info}>
              <p className={styles.price}>${postData.price}</p>
              <span className={styles.estimate_price}>
                {classifyPrice(postData.price)} price
              </span>
            </div>
            <p className={styles["post-details"]}>
              {timeAgoString(postData.createdAt)} ago, {postData.views} views
            </p>
          </div>
        </div>
      </Link>
    );

  return (
    <Link
      href={`/product/${postData._id}?dep=${depParams}`}
      className={classes.container}
      prefetch={false} // Disable automatic prefetching
    >
      <div className={classes["image-container"]}>
        {postData.images && (
          <CarouselContainer
            images={postData.images}
            showArrows={true}
            showIndicators={true}
            width={150}
            height={120}
          />
        )}
      </div>
      <div className={classes.userContainer}>
        {!forRecommendationSection && (
          <div className={classes.author}>
            <img src={postData.userId?.image} alt="author" />
            <p>{postData.userId?.userName}</p>
          </div>
        )}
        <div>
          <h1 className={classes.title}>{postData.title}</h1>
          <div className={classes.info}>
            <p className={classes.price}>${postData.price}</p>
            <span className={classes.estimate_price}>
              {classifyPrice(postData.price)} price
            </span>
          </div>
          {!forRecommendationSection && (
            <div className={classes["post-footer"]}>
              <p className={classes["post-details"]}>
                {timeAgoString(postData.createdAt)} ago, {postData.views} views
              </p>
              <HeartIcon
                className={inFavorites ? classes.inFavorites : ""}
                onClick={handleFavorites}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShopPost;
