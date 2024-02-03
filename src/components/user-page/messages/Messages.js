"use client";

import React, { useState } from "react";
import classes from "./Messages.module.css";
import Search from "./Search";
import PreviewMessage from "./PreviewMessage";
import MessageContainer from "./MessagesContainer";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import fetchFunction from "@/lib/fetch/fetchFunction";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/components/UI/spinner/Spinner";

export default function Messages() {
  const  session  = useSession();
 
  const {personId} = useParams();
  const router = useRouter();

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [focusInbox, setFocusInbox] = useState(true);

  const apiUrl = `/api/user-page/messages`;
  const { data: messages, error } = useSWR(apiUrl, fetchFunction);

  if (error) throw error;

  if (!messages || session.status !== "authenticated")
    return (
      <div className={classes.container}>
        <Spinner size={120} />
      </div>
    );

     const userId = session.data.id;

  const handleSearchedUsers = (val) => {
    setFocusInbox(false); // So 'others' button will automatically be focused
    setSearchedUsers(val);
  };

  const handleInitializePersonState = (message) => {
    const personsId =
      userId === message.members[0]._id
        ? message.members[1]._id
        : message.members[0]._id;

    router.push("/user-page/messages/" + personsId);
  };

  if (!personId) handleInitializePersonState(messages[0]);

  return (
    <>
      <h2>Your conversations</h2>
      <div className={classes.container}>
        <div className={classes.user_selector}>
          <Search onSearch={handleSearchedUsers} />
          <div className={classes.section_buttons}>
            <button
              className={focusInbox ? classes.focused_section : ""}
              onClick={() => setFocusInbox(true)}
            >
              Inbox
            </button>
            <button
              className={!focusInbox ? classes.focused_section : ""}
              onClick={() => setFocusInbox(false)}
            >
              Others
            </button>
          </div>
          <ul className={classes.user_list_container}>
            {focusInbox ? (
              messages.map((msg, i) => {
                return <PreviewMessage key={i} userId={userId} message={msg} />;
              })
            ) : searchedUsers.length !== 0 ? (
              searchedUsers.map((user, i) => {
                return <PreviewMessage key={i} userId={userId} user={user} />;
              })
            ) : (
              <p className={classes.noUser}>Search users by their user name</p>
            )}
          </ul>
        </div>
        <MessageContainer userId={userId} />
      </div>
    </>
  );
}
