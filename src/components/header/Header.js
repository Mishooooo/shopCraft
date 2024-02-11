import Image from "next/image";
import classes from "./Header.module.css";
import SearchForm from "./searchForm/SearchForm";
import Link from "next/link";
import NavItems from "./NavItems";
import AccountDropdown from "./account/AccountDropdown";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link href="/" className={classes.logo}>
          <Image
            width={80}
            height={80}
            src="/images/logo.png"
            alt="Logo"
            priority
          />
        </Link>

        <SearchForm />
        <div className={classes.navigation}>
          <NavItems />
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
}                            
