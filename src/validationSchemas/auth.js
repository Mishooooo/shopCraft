import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  password: Yup.string().min(6).required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});


export const signUpSchema = Yup.object().shape({
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm password doesn't match!")
    .required("Confirm password is required"),
  password: Yup.string().min(6).required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  user_name: Yup.string()
    .min(3, "Name is too short!")
    .required("Name field is required"),
});