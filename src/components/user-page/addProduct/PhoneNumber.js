"use client";
import React, { useState } from "react";
import classes from "./PhoneNumber.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
import editAccountSchema from "@/validationSchemas/editAccount";

export default function PhoneNumber() {
  const dispatch = useDispatch();

  const { data: session, status } = useSession();
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    pending: false,
  });

  const handleEditPhoneNumber = async (values) => {
    try {
      // Set the form to the pending state
      setSubmitStatus({ ...submitStatus, pending: true });

      const response = await fetch(
        "/api/user-page/edit-account?editOnlyPhone=true",
        {
          method: "PUT",
          body: JSON.stringify(values),
        }
      );

      if (!response.ok || !(response.status >= 200 && response.status < 300)) {
        throw new Error(response.status);
      }

      // Set a success message in the form state
      setSubmitStatus({
        success: "Phone number was updated successfully",
        pending: false,
      });

      // Optionally, reset the success message after a certain time
      setTimeout(() => {
        setSubmitStatus({ ...submitStatus, success: null });
      }, 5000); // Reset after 5 seconds (adjust as needed)
    } catch (error) {
      const errorText = `Sorry, there was a problem updating your phone number! Status: ${error.message}`;
      dispatch(setOverlay({ text: errorText }));

      // Set an error message and reset the pending state
      setSubmitStatus({ success: null, pending: false });
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.formName}>Phone number</h2>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <Formik
          onSubmit={(values, actions) => {
            handleEditPhoneNumber(values, actions);
          }}
          validationSchema={editAccountSchema}
          initialValues={{ phone_number: session?.user?.phone }}
        >
          <Form>
            <ErrorMessage
              name="phone_number"
              component="p"
              className={classes.error}
            />
            {submitStatus.success && (
              <p className={classes.success}>{submitStatus.success}</p>
            )}

            <Field type="text" name="phone_number" />

            <button type="submit" disabled={submitStatus.pending}>
              {submitStatus.pending ? "Updating..." : "Edit phone number"}
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
}
