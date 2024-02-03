import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import classes from "./global.module.css";
import { useParams } from "next/navigation";
import { Rating } from "@mui/material";
import * as Yup from "yup";
import { setOverlay } from "@/store/overlaySlice";
import { useDispatch } from "react-redux";

export default function AddReview({ session, addReview }) {
  const params = useParams();
  const productId = params.productId;
  const dispatch = useDispatch();



  const validationSchema = Yup.object().shape({
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: Yup.string().required("Comment is required"),
  });



  const onSubmitHandler = async (values, {resetForm}) => {
    const formData = {
      userId: session?.data?.id,
      rating: +values.rating,
      comment: values.comment,
    };

      const response = await fetch(
        `/api/product/review?productId=${productId}`,
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

    if (!response.ok || !(response.status >= 200 && response.status < 300)) {
      const errorText = `Sorry, there was a problem adding review. Please try again later. HTTP error! Status: ${response.status}`;
      return dispatch(setOverlay({ text: errorText }));
    }

      const resData = await response.json();
      resData.userId = {
        image: session.data?.user?.image,
        userName: session.data?.user?.userName,
        _id: session.data.id,
      }; // temporarily show user their review, and show their profile, by using session data

      addReview(resData);
      resetForm();

  };

  return (
    <Formik
      initialValues={{ rating: null, comment: "" }}
      validationSchema={validationSchema}
      onSubmit={
        onSubmitHandler
     }
    >
      {({ isSubmitting, setFieldValue, values }) => {
      return (
        <Form>
          <div className={classes.reviewContainer}>
            <div className={classes.user}>
              <img
                src={session.data?.user?.image}
                alt="avatar"
                width={50}
                height={50}
              />
              <p>{session.data?.user?.userName}</p>
            </div>
            <div className={classes.comment}>
              <div className={classes.ratingContainer}>
                <Field
                  name="rating"
                  type="number"
                  min={1}
                  max={5}
                  as={Rating}
                  style={{ color: "#FACF19" }}
                  value={values.rating}
                  onChange={(event, newValue) => {
                    setFieldValue("rating", newValue);
                  }}
                />
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="error"
                  style={{ color: "red" }}
                />
              </div>
              <div className={classes["line-with-border"]}></div>
              <div className={classes.commentContainer}>
                <Field name="comment" placeholder="Write your comment..." />
                <ErrorMessage
                  name="comment"
                  component="p"
                  className="error"
                  style={{ color: "red" }}
                />
              </div>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </Form>
      );
      }}
    </Formik>
  );
}
