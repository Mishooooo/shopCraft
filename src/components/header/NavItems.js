"use client";

import classes from "./NavItems.module.css";

import Link from "next/link";
import {
  ChatIcon,
  HeartIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

import { useDispatch, useSelector } from "react-redux";


import { useEffect } from "react";
import { addToCart, resetCart } from "@/store/cartSlice";
import { addToFavorites, resetFavorites } from "@/store/favoritesSlice";
import { selectFavoritesAndCart } from "@/store";
import { setOverlay } from "@/store/overlaySlice";
import  fetchFunction  from "@/lib/fetch/fetchFunction";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const dispatch = useDispatch();
  const { status } = useSession();
const pathname = usePathname()


  const authPage = pathname.includes('auth/sign')

  const { favorites, cart } = useSelector(selectFavoritesAndCart);

  const favoritesQuantity = favorites.length;
  const cartQuantity = cart.length;
  
  useEffect(() => {
 
    if (status !== "authenticated") {
      // reset the store data, In case user logs out
      if (favorites.length > 0) dispatch(resetFavorites());
      if (cart.length > 0) dispatch(resetCart());
      return;
    }

 if (cartQuantity > 0 || favoritesQuantity > 0) {
   return; 
   // in store was already fetched, and NavItems component is being displayed in dropdown again (happens when windows screen size is samll), 
   // then we don't need to fetch data again
 }

    const fetchStoreData = async () => {
      try {
        const [favoritesData, cartData] = await Promise.all([
          fetchFunction("/api/user-page/favorites"),
          fetchFunction("/api/user-page/cart"),
        ]);
        dispatch(addToFavorites(favoritesData));
        dispatch(addToCart(cartData));
      } catch (error) {
        return dispatch(
          setOverlay({
            text: "Warning: Error occured while fetching cart or wishlist list!",
          })
        );
      }
    };

    fetchStoreData();
  }, [status]);

  return (
    <nav className={`${classes.container} ${authPage ? classes.authPage : ''}`}>
      <Link href="/user-page/add-product" className={classes.addProduct}>
        <PlusCircleIcon />
        <p className={classes.navText}>Add advertisment</p>
      </Link>

      <Link href="/user-page/messages" className={classes.navLink}>
        <ChatIcon />
        <p className={classes.navText}>Chat</p>
      </Link>
      <Link href="/user-page/favorites" className={classes.navLink}>
        <HeartIcon />
        <p className={classes.navText}>Wishlist</p>
        <p className={classes.navBadge}>{favoritesQuantity}</p>
      </Link>
      <Link href="/user-page/cart" className={classes.navLink}>
        <ShoppingCartIcon />
        <p className={classes.navText}>Cart</p>
        <p className={classes.navBadge}>{cartQuantity}</p>
      </Link>
    </nav>
  );
}
