import { useState } from "react";
import classes from "./RecoverPassword.module.css";
import Timer from "./timer/Timer";
import { Form, Formik } from "formik";
import EmailInput from "../input/Emailnput";
import { setOverlay } from "@/store/overlaySlice";
import { useDispatch } from "react-redux";

const SendEmailForm = ({ setVerifiedEmail, setErrorMessage }) => {
  const dispatch = useDispatch();

  const [activeTime, setActiveTime] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [recieveButtonText, setRecieveButtonText] = useState("Receive code");

  const validateEmail = (email) => {
    if (!email) {
      setErrorMessage("Email is required");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid email address");
      return false;
    }
    // You can add more email validation logic if needed
    setErrorMessage("");
    return true;
  };

  const handleSendEmailCode = async (values) => {
    if (!validateEmail(values.email)) {
      return;
    }

    setRecieveButtonText("Sending email...");

      const response = await fetch("/api/auth/recover-password", {
        method: "POST",
        body: JSON.stringify({ email: values.email }),
      });

      const resData = await response.json();

      if (!response.ok || !(response.status >= 200 && response.status < 300)) {
        return dispatch(
          setOverlay({
            text: `Sorry, error occured on server! Could not send email. status: ${response.status}`,
          })
        );
      }
      setRecieveButtonText("Send again");

      if (resData.error) return setErrorMessage(resData.error);
      setActiveTime(180); // Start the timer when sending email code
      setUserEmail(values.email);

  };

  const handleVerificationCode = async (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue.length !== 6) return;

    const response = await fetch(
      `/api/auth/recover-password?verification-value=${inputValue}&email=${userEmail}`
    );

        if (
          !response.ok ||
          !(response.status >= 200 && response.status < 300)
        ) {
          return dispatch(
            setOverlay({
              text: `Sorry, error occured on server! Could not validate verification code. status: ${response.status}`,
            })
          );
        }

    const resData = await response.json();

    if (resData.error) {
      e.target.value = "";
      return setErrorMessage(resData.error);
    }
    setErrorMessage("");
    setVerifiedEmail(resData);
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => {
        handleSendEmailCode(values);
      }}
      // validationSchema={validationSchema}
    >
      <Form>
        <EmailInput />

        {activeTime !== 0 && (
          <Timer activeTime={activeTime} setActiveTime={setActiveTime} />
        )}

        <div className={classes.receiveCode}>
          <input
            type="number"
            name="code"
            id="code"
            placeholder={`Enter verification code`}
            className={classes.input}
            onChange={handleVerificationCode}
            disabled={!userEmail}
          />
          <button type="submit">{recieveButtonText}</button>
        </div>
      </Form>
    </Formik>
  );
};

export default SendEmailForm;
