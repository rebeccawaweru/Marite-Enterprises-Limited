import React from "react";

function Message({ message, dispatch }) {
  setTimeout(() => {
    dispatch({ type: "REMOVE_ERROR" });
    dispatch({ type: "REMOVE_MESSAGE" });
  }, 6000);

  return <>{message}</>;
}

export default Message;
