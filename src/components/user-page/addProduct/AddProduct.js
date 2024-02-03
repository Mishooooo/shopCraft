"use client";
import classes from "./AddProduct.module.css";

import Container from "@/components/UI/Container";
import AttributesForm from "./AttributesForm";
import AddPrice from "./AddPrice";
import AddPhoto from "./AddPhoto";
import DepartmentsForm from "./DepartmentsForm";
import { ErrorMessage, Form, Formik } from "formik";
import PhoneNumber from "./PhoneNumber";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
import addProductSchema from "@/validationSchemas/addProduct";


const AddProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const productData = {
    departments: [],
    title: "",
    price: "",
    condition: "",
    description: "",
    images: [],
    userId: "",
  };

  const onSubmitHandler = async (values, actions) => {

      const response = await fetch("/api/user-page/add-product", {
        method: "POST",
        body: JSON.stringify(values),
      });


    if (!response.ok || !(response.status >= 200 && response.status < 300)) {
      const errorText = `Sorry, there was a problem uploading your product. Please try again later." HTTP error! Status: ${response.status}`;
      return dispatch(setOverlay({ text: errorText }));
    }

      router.push("/user-page/my-ads");

      dispatch(
        setOverlay({
          text: "The product was succesfully uploaded!",
        })
      );
  
  };

  return (
    <>
      <h2>Add Advertisment</h2>
      <Container>
        <Formik
          initialValues={productData}
          onSubmit={onSubmitHandler}
          validationSchema={addProductSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <ErrorMessage
                name="departments"
                component="p"
                className={classes.error}
              />
              <DepartmentsForm />
              <ErrorMessage
                name="title"
                component="p"
                className={classes.error}
              />
              <ErrorMessage
                name="description"
                component="p"
                className={classes.error}
              />
              <ErrorMessage
                name="condition"
                component="p"
                className={classes.error}
              />
              <AttributesForm />
              <ErrorMessage
                name="price"
                component="p"
                className={classes.error}
              />
              <AddPrice />

              <ErrorMessage
                name="images"
                component="p"
                className={classes.error}
              />
              <AddPhoto />

              <button
                type="submit"
                className={classes.publishProduct}
                disabled={isSubmitting}
              >
                {isSubmitting ? "uploading..." : "Publish product"}
              </button>
            </Form>
          )}

          {/* set phone number separatelly because it uses form submition independently */}
        </Formik>
        <PhoneNumber />
      </Container>
    </>
  );
};

export default AddProduct;
