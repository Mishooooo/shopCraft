"use client";
import { signIn} from "next-auth/react";
import Link from "next/link";
import classes from "./global.module.css";
import ProvidersInput from "./input/ProvidersInput";
import {  Form, Formik } from "formik";
import EmailInput from "./input/Emailnput";
import PasswordInput from "./input/PasswordInput";
import { useRouter, } from "next/navigation";
import { signInSchema } from "@/validationSchemas/auth";

const SignIn = () => {
  const router = useRouter();

  const onHandleLogin = async (values, { setStatus, resetForm }) => {
    const result = await signIn("signin", {
      redirect: false,
      ...values
    });
    resetForm();
    if (result.error) {

           return setStatus(
             result.error.replace("ValidationError", 'Validation error')
           );
    }

    // redirects the user after authentication
    router.push("/");
  };

  return (
    <main className={classes.main}>
      <div className={classes.formContainer}>
        <h1 className={classes.signHeader}>Sign In</h1>
        <Formik
          initialValues={{ password: "", email: "" }}
          validationSchema={signInSchema}
          onSubmit={onHandleLogin}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status && <div className={classes.errorMessage}>{status}</div>}
              <EmailInput />
              <PasswordInput />
              <Link href={"./auth/signin/recover-password"}>Forgot password?</Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className={classes.signButton}
              >
                {isSubmitting ? "Signing ..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        <hr className={classes.orLine} />
        <ProvidersInput providerName="facebook" />
        <ProvidersInput providerName="google" />
        <ProvidersInput providerName="github" />
      </div>
      <hr className={classes.newLine} />
      <div className={classes.registerButton}>
        <Link href="./signup">Create your ShopCraft account</Link>
      </div>
    </main>
  );
};

export default SignIn;
