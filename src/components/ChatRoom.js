import React, { Component } from "react";
import useChat from "../useChat.js";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import "../scss/ChatRoom.scss";
import "terminal.css";

const customStyles = {
  content: {
    //   top                   : '50%',
    //   left                  : '50%',
    //   right                 : 'auto',
    //   bottom                : 'auto',
    //   marginRight           : '-50%',
    //   transform             : 'translate(-50%, -50%)'
  },
};

const ChatRoom = (props) => {
  const { roomId } = props.roomId; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <Draggable>
      <div className="chat-room-container">
        <div className="messages-container">
          <ol className="messages-list no-list-numbers">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.body}
              </li>
            ))}
          </ol>
        </div>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button>
      </div>
    </Draggable>
  );
};

export default ChatRoom;
