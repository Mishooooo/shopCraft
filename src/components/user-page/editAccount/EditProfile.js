import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import classes from "./EditProfile.module.css";
import AccInput from "./input/AccInput";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
export default function EditProfile() {
  const { values, setFieldValue } = useFormikContext();

const dispatch = useDispatch();

  const handleDeleteImage = async () => {
    setFieldValue(
      "image",
      "https://i.im.ge/2023/04/25/Lg2cWX.user-image-default.jpg"
    );
  };

  const handleImageChange = async (event) => {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const formData = new FormData();

      formData.append("file", file);
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
             const errorText = `Sorry, there was a problem updating your profile picture. Please try again later. HTTP error! Status: ${response.status}`;
             return dispatch(setOverlay({ text: errorText }));
           }

      const image = await response.json();

      setFieldValue("image", image.url);
    
  };

  return (
    <div className={classes.container}>
      <div>
        <img src={values.image} alt="picture of author" />
        <div className={classes.editPhoto}>
          <TrashIcon onClick={handleDeleteImage} />
          <label htmlFor="image">
            <PencilAltIcon />
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>
      </div>

      <div className={classes.nameForm}>
        <AccInput inputName={"user_name"}  />
      </div>
    </div>
  );
}
