import React, { Component } from "react";
import useChat from "../useChat.js";

import "../scss/ChatRoom.scss"

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
      <div className="chat-room-container">
          <h1>CHAT</h1>
        <div className="messages-container">
          <ol className="messages-list">
            {messages.map((message, i) => (
              <li></li>
            ))}
          </ol>
        </div>
        <textarea
        //   value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button>
      </div>
    );
  
}

export default ChatRoom;
