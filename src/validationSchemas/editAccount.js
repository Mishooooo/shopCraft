import * as Yup from "yup";

const editAccountSchema = Yup.object().shape({
  phone_number: Yup.string()
    .min(9)
    .max(12)
    .matches(/^\d{9,15}$/, "Invalid phone number format")
    .optional(),
  email_adress: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .optional(),
  user_name: Yup.string()
    .required("Username is required")
    .min(4)
    .max(20)
    .optional(),
  new_password: Yup.string().min(6).optional(),
  confirm_password: Yup.string()
    .min(6)
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.new_password === value;
    })
    .optional(),
});

export default editAccountSchema;
