import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_USER_EVENT = "newUser"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId, username) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const [users, setUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // setUsers(users.concat(username));

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
      username: { username },
    });

    //trying to add new user to list only first time they enter chat room
    socketRef.current.emit(NEW_USER_EVENT, {
      username: username,
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };

      setMessages((messages) => [...messages, incomingMessage]);
      
    });

    socketRef.current.on(NEW_USER_EVENT, (username) => {
      const newUser = {
        ...username,
      };
      //just quick fix for empty user events
      console.log("current users: " + users.toString() + "\nadding: " + newUser.username);
      if(username){
      setUsers((users)=> [...users,newUser]);
      console.log("users is now: " + users.toString());
    }


    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody, username) => {
    if (messageBody) {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: socketRef.current.id,
        username: username,
      });
    }
  };

  const updateUsers = (username) => {
    socketRef.current.emit(NEW_USER_EVENT, {
      username: username,
    });
  };

  return { messages, users, sendMessage, updateUsers };
};

export default useChat;
