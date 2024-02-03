"use client";
import classes from "./UserPageNav.module.css";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
import { navigationItems } from "@/lib/config";
import { LogoutIcon } from "@heroicons/react/outline";

export default function UsersPageNav() {
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

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
    <nav className={classes.comp_list}>
      <button
        className={classes.user}
        onClick={() => handleNavigation("/user-page/edit-account")}
      >
        <img src={session.data?.user?.image} alt="user image" />
        <p>{session.data?.user?.userName}</p>
        <span>(edit)</span>
      </button>

      <ul className={classes.direct_category}>
        {navigationItems.map((item, index) => (
          <li
            key={index}
            className={item.path === pathname ? classes.activeNav : ""}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
        <li onClick={handleSignOut}>
          <LogoutIcon />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
}
