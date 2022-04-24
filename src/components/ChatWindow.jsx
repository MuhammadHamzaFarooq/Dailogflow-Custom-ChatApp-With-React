import React from "react";
import { useState } from "react";
import "./ChatWindow.css";
import "../utility.css";
import {
  Form,
  FormControl,
  Button,
  Stack,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import axios from "axios";

const ChatWindow = () => {
  const [userText, setuserText] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if(userText.trim() === "") return;
    console.log("Send Request");
    setMessages((prevMessages) => {
      return [{ sender: "user", text: userText }, ...prevMessages];
    });

    //Todo : send message to Dailogflow
    let response = await axios.post("http://localhost:8000/talktochatbot", {
      query: userText,
    });

    setuserText("");
    e.target.reset();
    setMessages((prevMessages) => {
      return [...response.data, ...prevMessages];
    });

    //   setTimeout(() => {
    //     setMessages((prevMessages) => {
    //       return [
    //         {
    //           sender: "chatbot",
    //           text: "Hello and Welcome I am virtual Version of Hamza!",
    //         },
    //         ...prevMessages,
    //       ];
    //     });
    //   }, 1000);
    // };
  };

  return (
    <>
      <h1 className="center heading">Chat App</h1>
      <Container>
        <form onSubmit={sendMessage}>
          <Stack
            direction="horizontal"
            gap={3}
            style={{
              padding: " 20px 5px",
            }}
          >
            <Form.Control
              className="me-auto inputField"
              type="text"
              placeholder="Enter your message here ..."
              onChange={(e) => {
                setuserText(e.target.value);
              }}
            />
            <Button variant="primary" type="submit" className="submitButton">
              Submit
            </Button>
          </Stack>
        </form>

        {/* Show Messages */}

        <div>
          <Container>
            {messages.map((eachMessage, index) =>
              eachMessage.sender === "user" ? (
                <Row key={index}>
                  <Col xs={3}></Col>
                  <Col className="message user-message">{eachMessage.text}</Col>
                </Row>
              ) : (
                <Row key={index}>
                  <Col className="message chatbot-message">
                    {eachMessage.text}
                  </Col>
                  <Col xs={3}></Col>
                </Row>
              )
            )}
          </Container>
        </div>
      </Container>
    </>
  );
};

export default ChatWindow;
