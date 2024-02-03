import * as Yup from "yup";

const phone_number =  Yup.string()
    .required("Phone number is required")
    .min(9)
    .max(12)
    .test("phone-number-regex", "Invalid phone number format", (value) => {
      const regex = /^\d{9,15}$/;
      return regex.test(value);
     });

// Separate schema for phone validation
const phoneSchema = Yup.object().shape({
  phone_number
});

const editAccountSchema =  Yup.object().shape({
    phone_number,
    email_adress: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    user_name: Yup.string().required("Username is required").min(4).max(20),
    new_password: Yup.string().min(6).optional(),
    confirm_password: Yup.string()
      .min(6)
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.new_password === value;
      })
      .optional(),
  });

export default editAccountSchema;
export { phoneSchema };
