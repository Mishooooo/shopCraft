import styles from "./AboutProduct.module.css";

import timeAgoString from "@/lib/timeAgoString";
import {
  ChatIcon,
  HeartIcon,
  PhoneIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";


import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "@/store/favoritesSlice";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { selectFavoritesAndCart } from "@/store";
import Link from "next/link";
import Spinner from "../UI/spinner/Spinner";
import fetchFunction from "@/lib/fetch/fetchFunction";

export default function AboutProduct({ data }) {

  const { status } = useSession();
  const dispatch = useDispatch();
  
 const { favorites, cart } = useSelector(selectFavoritesAndCart);


  if (!data) return <Spinner size={150} />; 
 

  const inFavorites = favorites.some((item) => item?._id === data._id);
  const inCart = cart.some((item) => item?._id === data._id);

  const handleCart = () => {
    if (!inCart) dispatch(addToCart(data));
    if (inCart) dispatch(removeFromCart(data));

    fetchFunction(
      `/api/user-page/cart?productId=${data._id}`,
      inCart ? "DELETE" : "POST"
    );
  };

  const handleFavorites = () => {
    if (!inFavorites) dispatch(addToFavorites(data));
    if (inFavorites) dispatch(removeFromFavorites(data));

    fetchFunction(
      `/api/user-page/favorites?productId=${data._id}`,
      inFavorites ? "DELETE" : "POST"
    );
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["details"]}>
        <div>{data.condition}</div>
        <p className={styles["post-details"]}>
          {timeAgoString(data.createdAt)} ago, {data.views} views
        </p>
      </div>
      <div className={styles["title-price"]}>
        <h1>{data.title}</h1>
        <div className={styles.price}>
          <span>{data.price}$</span>
        </div>
      </div>
      <hr />
      <div className={styles.description}>
        <label>Description:</label>
        <p>{data.description}</p>
      </div>

      <div className={styles["about-user"]}>
        <div className={styles["user-info"]}>
          <img src={data.userId?.image} alt="picture of author" />
          <div>
            <p>{data.userId?.userName}</p>
          </div>
        </div>

        <div className={styles["connection-info"]}>
          <div>
            <PhoneIcon />
            <p>+9955123212</p>
          </div>
          <Link href={"/user-page/messages/" + data.userId?._id}>
            <ChatIcon />
            <p>message saller</p>
          </Link>
        </div>
        <div className={styles["user-addvertisments"]}>
          <Link href={"/user-ads/" + data.userId?._id}>
            See {data.userId?.userName}&apos;s other addvertisments
          </Link>
        </div>
      </div>

      {status === "authenticated" && (
        <div className={styles.addToPageButtons}>
          <button
            onClick={handleCart}
            className={inCart ? styles.activedButton : ""}
          >
            + <ShoppingCartIcon />
          </button>
          <button
            onClick={handleFavorites}
            className={inFavorites ? styles.activedButton : ""}
          >
            + <HeartIcon />
          </button>
        </div>
      )}
    </div>
  );
}
