'use client'

import NewPassowrdForm from "./NewPasswordForm";
import classes from "./RecoverPassword.module.css";
import styles from "../global.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";

import SendEmailForm from "./sendEmailForm";

const RecoverPassword = () => {
 const router = useRouter();

 const [verifiedEmail, setVerifiedEmail] = useState(false);

 const [errorMessage, setErrorMessage] = useState("");


 const handleGoBack = () => {
  //  setTimerIsActive(false); // Reset the timer when cancleling
   router.push("/auth/signin");
 };
 

  return (
    <main className={styles.main}>

    <div className={styles.formContainer}>
      <button className={classes.goBack} onClick={handleGoBack}>
        <ArrowCircleLeftIcon />
      </button>
 
      <h2 className={classes.signHeader}>Recover password</h2>
      <p styles={{ color: "red" }}>{errorMessage}</p>

      {verifiedEmail ? (
        <NewPassowrdForm
          setErrorMessage={setErrorMessage}
          verifiedEmail={verifiedEmail}
          router={router}
        />
      ) : (
        <SendEmailForm
          setVerifiedEmail={setVerifiedEmail}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
    </ main>
  );
};

export default RecoverPassword;
