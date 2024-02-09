"use client";
import React, { useState } from "react";
import classes from "./MessagesContainer.module.css";
import { Field, Form, Formik } from "formik";
import timeAgoString from "@/lib/timeAgoString";
import useSWR, { mutate } from "swr";
import fetchFunction from "@/lib/fetch/fetchFunction";
import { useParams } from "next/navigation";
import Spinner from "@/components/UI/spinner/Spinner";
import { setOverlay } from "@/store/overlaySlice";
import { useDispatch } from "react-redux";

export default function MessageContainer({ userId }) {
  const dispatch = useDispatch();
  const params = useParams();
  const personId = Array.isArray(params?.personId) ? params.personId[0] : '';
  const [messageContent, setMessageContent] = useState(null);

  const apiUrl = `/api/user-page/messages/message-content?personId=${personId}`;
  const { data, error } = useSWR(apiUrl, fetchFunction);

if (error) throw error;
  if (!data || !userId) return <Spinner size={100} />;

  if (!messageContent ) setMessageContent(data.messages);

  const person = data?.person;

  const onSubmitHandler = async (values, actions) => {
    if (values.message === "") return;
    try {
      const response = await fetch(
        `/api/user-page/messages?receiver=${personId}`,

        {
          method: "POST",
          body: JSON.stringify({
            message: values.message,
          }),
        }
      );

            if (
              !response.ok ||
              !(response.status >= 200 && response.status < 300)
            ) {
              throw new Error(response.status);
            }

      setMessageContent((prevData) =>
        prevData.concat({
          sender: userId,
          receiver: person.id,
          message: values.message,
          createdAt: Date.now(),
        })
      );
      actions.resetForm();

      //  In order to Update inbox messages.
      mutate(`/api/user-page/messages`);

    } catch (error) {
       const errorText = `Could not send message. HTTP error! Status: ${error.message}`;
       dispatch(setOverlay({ text: errorText }));
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.messages_header}>
        {person && (
          <>
            <img src={person.image} alt="User Icon" />
            <span>{person.userName}</span>
          </>
        )}
      </div>
      <ul className={classes.messages}>
        {messageContent?.map((message, index) => (
          <li
            key={index}
            className={
              userId !== message.sender // check the role
                ? classes.others_message
                : classes.users_message
            }
          >
            <p className={classes.message_text}>{message.message}</p>
            <span className={classes.message_timestamp}>
              {timeAgoString(message.createdAt)} ago
            </span>
          </li>
        ))}
      </ul>

      <Formik initialValues={{ message: "" }} onSubmit={onSubmitHandler}>
        {({ isSubmitting }) => (
          <Form>
            <div className={classes.input_container}>
              <Field
                name="message"
                type="text"
                placeholder="Type a message..."
              />
              <button type="submit" disabled={isSubmitting}>
                {!isSubmitting ? "send" : "sending..."}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
