import React, { Component, useEffect } from "react";
import useChat from "../useChat.js";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import "../scss/ChatRoom.scss";
import "terminal.css";

var messagesEnd;

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
  var username = props.username;
  const { roomId } = props.roomId; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    if (event.target.value.substr(-1)=="\n") {
        sendMessage(newMessage);
        setNewMessage("");
    } else {
      setNewMessage(event.target.value);
    }
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(()=>{
      scrollToBottom();
  })

  

//   const handleKeyPress = (event) => {
//     console.log(event.key);
//     if (event.key == "Enter") {
//       sendMessage(newMessage);
//       setNewMessage("");
//     }
//   };

  return (
    <Draggable>
      <div className="chat-room-container">
          <div class="messages-header">rave theory chat</div>
        <div className="messages-container">
          <ol className="messages-list no-list-numbers">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >  
                {message.ownedByCurrentUser ? username+ ": " + message.body : "other user: " + message.body}
              </li>
            ))}
          </ol>
        {/*dummy div for snapping scrollbar*/ }
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { messagesEnd = el; }}>
        </div>
        </div>
        <textarea
          value={newMessage}
          //onKeyPress={handleKeyPress}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        {/* <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button> */}
      </div>
    </Draggable>
  );
};

export default ChatRoom;
