import * as Yup from "yup";
 
 const addProductSchema = Yup.object().shape({
  departments: Yup.array().of(Yup.string()).min(1, "Select department"),
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Enter valid price"),
  condition: Yup.string().required("Condition is required"),
  description: Yup.string().required("Description is required"),
  images: Yup.array().of(Yup.string()).min(1, "At least one image is required"),
});

export default addProductSchema;