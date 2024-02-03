"use client";

import { Form, Formik } from "formik";
import Container from "@/components/UI/Container";
import AccInput from "./input/AccInput";
import EditProfile from "./EditProfile";
import classes from "./EditAccount.module.css";

import AccDeleteButton from "./accDeleteButton/AccDeleteButton";
import useSWR from "swr";
import fetchFunction from "@/lib/fetch/fetchFunction";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
import Spinner from "@/components/UI/spinner/Spinner";
import editAccountSchema from "@/validationSchemas/editAccount";


export default function EditAccount() {
  const dispatch = useDispatch();

  const apiUrl = '/api/user-page/edit-account';
  const { data, error } = useSWR(apiUrl, fetchFunction);

  if (error) throw error;

  if (!data)
    return (
      <div className="warning">
        <Spinner size={120} />
      </div>
    );


  const onSubmitHandler = async (values, actions) => {

    const response = await fetch(
      "/api/user-page/edit-account",
      {
        method: "PUT",
        body: JSON.stringify(values),
      }
    );


    if (!response.ok || !(response.status >= 200 && response.status < 300)) {
      actions.resetForm();
      const errorText = `Failed to update account details. HTTP error! Status: ${response.status}`;
    return  dispatch(setOverlay({ text: errorText }));
    }

    dispatch(
      setOverlay({ text: "Account details were successfully updated!" })
    );
  };

 const initialValues = {
   user_name: data.userName,
   email_adress: data.email,
   phone_number: data.phone,
   image: data.image,
   new_password: '',
   confirm_password: '',
 };

  return (
    <>
      <h2>Edit account</h2>
      <Container >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          validationSchema={editAccountSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={classes.container}>
                <div className={classes.containerHeader}>
                  <EditProfile />
                  <AccDeleteButton />
                </div>
                <hr />
                <div className={classes.inputs}>
                  <AccInput
                    inputName="email_adress"
                    type="email"
                  
                  />
                  <AccInput
                    inputName="phone_number"
                  />
                  {!!data.password && (
                    <>
                      <AccInput
                        inputName="new_password"
                        type="password"
                      />
                      <AccInput
                        inputName="confirm_password"
                        type="password"
                      />
                    </>
                  )}
                </div>
                <hr />
                <div className={classes.saveBtn}>
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}
