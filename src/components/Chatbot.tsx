import React, { useState } from "react";
import OpenAI from "openai";
import { TextField, Button } from "@mui/material";
import logoBalck from "../assets/LogoBlack.png";
import "../styles/Chatbot.css";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([] as any[]);
  const [isTyping, setIsTyping] = useState(false);

  const askChatGPT = async (query: string) => {
    try {
      setIsTyping(true);

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [...messages, { role: "user", content: query }],
      });

      const messageContent = completion.choices[0]?.message?.content;

      setTimeout(() => {
        setMessages([
          ...messages,
          { role: "user", content: query },
          { role: "assistant", content: messageContent },
        ]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askChatGPT(input);
    setInput("");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        border: "5px solid #001489",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <img
          src={logoBalck}
          alt="Meera Chatbot"
          style={{ width: "80px", height: "80px", marginRight: "10px" }}
        />
        <h1 style={{ color: "#006000" }}>Ask Me Anything...</h1>{" "}
        {/* Dark Blue text */}
      </div>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              marginBottom: "6px",
              maxWidth: "70%",
              backgroundColor: message.role === "user" ? "#FF9933" : "#138808",
              color: message.role === "user" ? "#000000" : "#ffffff",
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              opacity: isTyping && index === messages.length - 1 ? 0.6 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            {message.content}
          </div>
        ))}
        {isTyping && (
          <div
            className="typing-indicator"
            style={{ animation: "typing 1s infinite" }}
          >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <TextField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          variant="outlined"
          style={{
            width: "calc(100% - 60px)",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            borderRadius: "4px",
            marginLeft: "10px",
            backgroundColor: "#001489",
          }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
