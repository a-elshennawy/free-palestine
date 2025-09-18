import "./App.css";
import Counter from "./Counter";
import DateDisplay from "./DateDisplay";
import { useState, useEffect } from "react";

function App() {
  const [textMessage, setTextMessage] = useState("i hate israel");
  const [counterMessage, setCounterMessage] = useState(
    "hatred counter for israel"
  );
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/TextMessage.json")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        if (data.length > 0) {
          setTextMessage(data[0].text);
          setCounterMessage(data[0].counterMessage);
        }
      })
      .catch((error) => console.error("Error loading messages:", error));
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % messages.length;
        setTextMessage(messages[newIndex].text);
        setCounterMessage(messages[newIndex].counterMessage);
        return newIndex;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <>
      <div className="container-fluid text-center m-0 py-5">
        <DateDisplay />
        <div className="innerContent row justify-content-center align-items-center gap-4 m-0 p-0">
          <h1 className="col-12 m-0 p-0">{textMessage}</h1>
          <Counter
            counterMessage={counterMessage}
            currentIndex={currentIndex}
          />
        </div>
      </div>
    </>
  );
}

export default App;
