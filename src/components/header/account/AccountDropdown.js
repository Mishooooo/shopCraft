"use client";
import { useState } from "react";
import classes from "./AccountDropdown.module.css";
import AccountDropdownNav from "./AccountDropdownNav";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


const AccountDropdown = () => {
  const session = useSession();
  const pathname = usePathname();

  const authPage = pathname.includes("auth/sign");


  const [showDropdown, setShopDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShopDropdown((dropdown) => !dropdown);
  };

  return (
    <div
      href="/"
      className={`${classes.container} ${authPage ? classes.authPage : ""}`}
    >
      {session.data ? (
        <div onClick={handleShowDropdown} className={classes.accountImg}>
          <img
            src={session.data.user.image}
            alt="user profile"
            className={classes.accountImg}
          />
          <ChevronDownIcon
            className={`${classes.directionIcon}  ${
              showDropdown && classes.upDirection
            }  `}
          />
        </div>
      ) : (
        <Link href={"/auth/signin"} className={classes.signSuggest}>
          <UserCircleIcon />
          <p>sign in/sign up</p>
        </Link>
      )}
      {showDropdown && session.data && (
        <div className={classes.dropdown}>
          <div className={classes.user}>
            <img src={session.data.user.image} alt="user image" />
            <p>{session.data.user.userName}</p>
          </div>
          <hr />

          <AccountDropdownNav />
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
