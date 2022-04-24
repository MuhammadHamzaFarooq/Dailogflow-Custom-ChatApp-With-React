import React from "react";
import { useState } from "react";
import "./ChatWindow.css";

const ChatWindow = () => {
  const [userText, setuserText] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => {
      return [{ sender: "user", text: userText }, ...prevMessages];
    });

    //Todo : send message to Dailogflow

    setuserText("");

    setTimeout(() => {
      setMessages((prevMessages) => {
        return [
          {
            sender: "chatbot",
            text: "Hello and Welcome I am virtual Version of Hamza!",
          },
          ...prevMessages,
        ];
      });
    }, 1000);
  };

  return (
    <>
      <div>ChatWindow</div>
    
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Enter your message here ..."
            onChange={(e) => {
              setuserText(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>

        {/* Show Messages */}

        <div>
          {messages.map((eachMessage, index) => {
            return (
              <>
                <h3>{eachMessage.sender}</h3>
                <p>{eachMessage.text}</p>
              </>
            );
          })}
        </div>
     
    </>
  );
};

export default ChatWindow;
