import Image from "next/image";
import classes from "./Spinner.module.css";

const Spinner = ({size}) => {
  return <Image width={size} height={size} className={classes.spinner} src="/images/icons/spinner.svg"  alt='spinner' />;
};
export default Spinner;
