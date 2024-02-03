"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import classes from "./AccountDropdownNav.module.css";
import { CogIcon, LogoutIcon, ViewGridIcon } from "@heroicons/react/outline";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
import NavItems from "../NavItems";

export default function AccountDropdownNav() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(
      setOverlay({
        text: "Warning: You are about to log out. Remember, you can also delete your account in the settings if you wish to!",
        onConfirm: () => {
          signOut({ redirect: false });
          router.push("/");
        },
      })
    );
  };

  return (
    <ul className={classes.container}>
<NavItems  />
      <Link href="/user-page/my-ads">
        <ViewGridIcon />
        <p>My products</p>
      </Link>
      <Link href="/user-page/edit-account">
        <CogIcon />
        <p>Edit account</p>
      </Link>
      <hr />
      <button onClick={handleSignOut}>
        <LogoutIcon />
        <p>Sign out</p>
      </button>
    </ul>
  );
}
