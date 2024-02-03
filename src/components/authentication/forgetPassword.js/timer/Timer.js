import { useEffect } from "react";
import classes from "./Timer.module.css";

const Timer = ({ activeTime, setActiveTime }) => {
  useEffect(() => {
    let interval;
    if (activeTime ) {
      interval = setInterval(() => {
       setActiveTime((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeTime]);



  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className={classes.container}>
      The 6 digit verification code sent via email remains active for a duration
      of <span>{formatTime(activeTime)}</span>. Please use the code promptly for
      authentication.{" "}
      <span>
        Check spam if you can&apos;t find received email from shopCraft
      </span>
    </div>
  );
};

export default Timer;
