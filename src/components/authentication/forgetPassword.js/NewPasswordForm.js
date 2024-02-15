import styles from "../global.module.css";
import { signIn } from "next-auth/react";
import ConfirmPasswordInput from "../input/ConfirmPasswordInput";
import PasswordInput from "../input/PasswordInput";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";

const NewPasswordForm = ({ setErrorMessage, verifiedEmail, router }) => {
  const dispatch = useDispatch();


  const onSubmitHandler = async (values, { resetForm }) => {
      if (values.password !== values.confirm_password) {
        resetForm(); // Reset the form values
        return setErrorMessage("passwords should match");
      }

      if (values.password.length < 6 || values.confirm_password.length < 6) {
  
        resetForm(); // Reset the form values
        return setErrorMessage("Password should be at least 6 characters long");
      }

      const response = await fetch(
        `/api/user-page/edit-account?userId=${verifiedEmail.userId}`,
        {
          method: "PUT",
          body: JSON.stringify({ new_password: values.password, confirm_password: values.confirm_password}),
        }
      );

          if (
            !response.ok ||
            !(response.status >= 200 && response.status < 300)
          ) {
            return dispatch(
              setOverlay({
                text: `Could not change password! status: ${response.status}`,
              })
            );
          }

      const result = await signIn("signin", {
        redirect: false,
        email: verifiedEmail.email,
        password: values.password,
      });

      if (result.error) {
        resetForm(); // Reset the form values
        return setErrorMessage(result.error);
      }

      router.push("/");

  };

  return (
    <Formik onSubmit={onSubmitHandler} initialValues={{password: "", confirm_password: ""}}>
      <Form>
        <PasswordInput />

        <ConfirmPasswordInput />
        <button type="submit" className={styles.signButton}>
          Change password
        </button>
      </Form>
    </Formik>
  );
};

export default NewPasswordForm;
