import UsersPageNav from "@/components/user-page/UserPageNav";
import classes from "./layout.module.css";
export default function Layout({ children }) {
  return (
    <main className={classes.main_container}>
      <UsersPageNav />
      <div className={classes.page_container}>
        {children}
      </div>
    </main>
  );
}
