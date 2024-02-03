"use client";
import { signIn } from "next-auth/react";
import classes from "./global.module.css";
import ProvidersInput from "./input/ProvidersInput";
import Link from "next/link";
import { Form, Formik } from "formik";
import UserNameInput from "./input/NameInput";
import EmailInput from "./input/Emailnput";
import PasswordInput from "./input/PasswordInput";
import ConfirmPasswordInput from "./input/ConfirmPasswordInput";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/validationSchemas/auth";

export default function SignUp() {
  const router = useRouter();


  const onSubmitHandler = async (values, { setStatus }) => {
    const result = await signIn("signup", {
      redirect: false,
      ...values
    });

    if (result.error) {
     return setStatus(
       result.error.replace("ValidationError: ", "Validation error: ")
     );
    }

    // redirects the user after authentication
    router.push("/");
  };

  return (
    <main className={classes.main}>

    <div className={classes.formContainer}>
      <h1 className={classes.signHeader}>Sign Up</h1>
      <Formik
        initialValues={{
          password: "",
          email: "",
          user_name: "",
          confirm_password: "",
        }}
        onSubmit={onSubmitHandler}
        validationSchema={signUpSchema}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && <div className={classes.errorMessage}>{status}</div>}
            <UserNameInput />

            <EmailInput />

            <PasswordInput />

            <ConfirmPasswordInput />

            <button
              type="submit"
              className={classes.signButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing ..." : "Sign up"}
            </button>
          </Form>
        )}
      </Formik>
      <hr className={classes.orLine} />
      <ProvidersInput providerName="facebook" />
      <ProvidersInput providerName="google" />
      <ProvidersInput providerName="github" />
      <p>
        Already have an account? <Link href={"./signin"}>sign in</Link>
      </p>
    </div>
    </ main >
  );
}
