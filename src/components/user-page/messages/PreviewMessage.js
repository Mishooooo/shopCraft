import { useRouter } from "next/navigation";
import classes from "./PreviewMessage.module.css";
import timeAgoString from "@/lib/timeAgoString";

const PreviewMessage = ({ userId, message, user}) => {
   const router = useRouter();
   console.log("message: ", message)

   let person = {};
   let messageContent;

   if (message?.members?.length === 2) {
     const otherPersonIndex = userId === message.members[0]._id ? 1 : 0;
     person = message.members[otherPersonIndex];
     messageContent = `${otherPersonIndex === 1 ? person.userName : "you"}: ${
       message.messages[message.messages.length - 1].message   // last message
     }`;
   }

   if (user) {
     person = user;
   }

   const handleOpenMessage = () => {
     router.push("/user-page/messages/" + person._id);
   };



  return (
    <li className={classes.messagePreview} onClick={handleOpenMessage}>
      <div className={classes.userIcon}>
        <img
          className={classes.userIcon}
          src={person.image}
          alt="User Icon"
          width={40}
          height={40}
          layout="responsive"
        />
      </div>

      <div className={classes.userInfo}>
        <span className={classes.userName}>{person.userName}</span>

        {message && (
          <span className={classes.messageText}>{messageContent}</span>
        )}
      </div>
      {message && (
        <span className={classes.timestamp}>
          {
          // Show last send message's time stamp
          timeAgoString(
            message.messages[message.messages.length - 1].createdAt 
          )} {" "}
          ago
        </span>
      )}
    </li>
  );
};

export default PreviewMessage;
