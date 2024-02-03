import { useState } from "react";
import classes from "./AddPhoto.module.css";
import CompContainer from "@/components/UI/addProduct/CompContainer";
import { Field, useFormikContext } from "formik";

const ImageUploadForm = () => {
  const { values, setFieldValue } = useFormikContext();

  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [isPending, setIsPending] = useState(null);

  const handleImageUpload = async (event) => {
    setIsPending(true);

    try {
      const files = Array.from(event.target.files);

      // const newImages = files.map((file) => URL.createObjectURL(file));

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("file", file);
      });

      formData.append("upload_preset", "image-upload");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_ClOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
            if (
              !response.ok ||
              !(response.status >= 200 && response.status < 300)
            ) {
              const errorText = `Sorry, there was a problem adding product image. Status: ${response.status}`;
              dispatch(setOverlay({ text: errorText }));
            }
      const resData = await response.json();
      // Access the public_id from the Cloudinary response
      const imageUrl = resData.url;
      setFieldValue("images", values.images.concat(imageUrl)); //...values.images, event.target.files[0]]);
    } catch (error) {
      console.error("Error: ", error);
    }
    setIsPending(null);
  };

  const handleDeleteImage = (index) => {
    setFieldValue(
      "images",
      values.images.filter((_, i) => i !== index)
    );
    if (index === mainPhotoIndex) {
      setMainPhotoIndex(-1);
    } else if (index < mainPhotoIndex) {
      setMainPhotoIndex(mainPhotoIndex - 1);
    }
  };

  const handleSetMainPhoto = (index) => {
    setMainPhotoIndex(index);
  };

  return (
    <CompContainer>
      <h2 className={classes.formName}>Upload Photos</h2>
      <div className={classes.imageGrid}>
        {values?.images?.map((uploadedImage, index) => (
          <div
            key={index}
            className={`${classes.imageItem} ${
              index === mainPhotoIndex ? classes.mainPhoto : ""
            }`}
          >
            <span
              className={classes.deleteImage}
              onClick={() => handleDeleteImage(index)}
            >
              &times;
            </span>
            {index !== mainPhotoIndex && (
              <button
                className={classes.setMainButton}
                onClick={() => handleSetMainPhoto(index)}
              >
                Set as Main
              </button>
            )}

            <img src={uploadedImage} alt={`Image ${index}`} />
          </div>
        ))}

        {isPending && <div className={classes.pendingImage}></div>}

        {values.images.length < 5 && (
          <label
            htmlFor="images"
            className={`${classes.addImage} ${
              values.images.length === 0 && !isPending ? classes.addImageWide : ""
            }`}
          >
            <span>+</span> Add photo
          </label>
        )}
        <Field
          value={undefined} // In order to avoid the security error: "Failed to set the 'value' property on 'HTMLInputElement..
          type="file"
          name="images"
          id="images"
          accept="image/*"
          style={{ display: "none" }}
          multiple
          onChange={handleImageUpload}
        />
      </div>
    </CompContainer>
  );
};

export default ImageUploadForm;
