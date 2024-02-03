import classes from "./Navigation.module.css";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Navigation({ children }) {
  return (
    <ul className={classes.container}>
      <li>
        <Link href="./">
          <HomeIcon  />
        </Link>
        <ChevronRightIcon className={classes.rightIcon} />
      </li>

      {children}
    </ul>
  );
}
