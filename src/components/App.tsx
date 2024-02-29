import { useState } from "react";
import ChatPage from "./ChatPage";
import Login from "./Login";
import ClientSignUp from "./ClientSignUp";
import HomePage from "./HomePage";
import ComplaintPage from "./ComplaintPage";

function App() {
  const [current_page, setCurrentPage] = useState("login");
  const [userId, setUserId] = useState<string | null>(null);

  if (current_page === "register") {
    return <ClientSignUp setCurrentPage={setCurrentPage} />;
  } else if (current_page === "login") {
    return <Login setCurrentPage={setCurrentPage} setUserId={setUserId} />;
  } else if (current_page === "home") {
    return <HomePage setCurrentPage={setCurrentPage} userId={userId} />;
  } else if (current_page === "chat-page") {
    return <ChatPage setCurrentPage={setCurrentPage} />;
  } else if (current_page === "complaint-page") {
    return <ComplaintPage setCurrentPage={setCurrentPage} userId={userId} />;
  } else {
    return null;
  }
}

export default App;
