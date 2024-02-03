import { useDispatch } from 'react-redux';
import classes from './AccDeleteButton.module.css'
import { UserRemoveIcon } from "@heroicons/react/outline";
import {  setOverlay } from '@/store/overlaySlice';
import { useRouter } from 'next/navigation';

export default function AccDeleteButton({userId}) {
    const dispatch = useDispatch();
    const router = useRouter();

const handleDeleteAccount = async (id) => {
  try {
      const response = await fetch(
        "/api/user-page/edit-account/delete-account?userId="+id,
        {
          method: "DELETE",
        }
      );

            if (
              !response.ok ||
              !(response.status >= 200 && response.status < 300)
            ) {
              throw new Error( response.status );
            }

 router.push('/')
  dispatch(
    setOverlay({
      text: "your account, data and activites was permanently deleted!",
    })
  );
  
    } catch (error) {
            const errorText = `Failed to update account details. HTTP error! Status: ${error.message}`;
            dispatch(setOverlay({ text: errorText }));
    }

}


function showWarning() {
  dispatch(
    setOverlay({
      text: "Warning: Deleting your account will permanently erase all your activities and cannot be undone!",
      onConfirm: handleDeleteAccount.bind(null, userId),
    })
  );
}

  return (
    <button type='button' onClick={showWarning} className={classes.container}>
      <UserRemoveIcon />
      <span>Delete account</span>
    </button>
  );
}
