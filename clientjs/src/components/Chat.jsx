import { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
// import { rehype } from "rehype-highlight";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    //ws://localhost:8000

    const ws = new WebSocket("ws://cc-chatbot-5cb2aee8433b.herokuapp.com/");
    ws.addEventListener("open", function (event) {
      console.log("connected");
      setSocket(ws);
    });

    ws.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      setMessageHistory((prevMessages) => [
        ...prevMessages,
        { author: "AI", content: data.content },
      ]);
    });

    return () => {
      ws.close();
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const updateInput = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: "send-prompt",
          content: message.replace(/(\r\n|\n|\r)/gm, ""),
        })
      );
    }
    setMessageHistory((prevMessages) => [
      ...prevMessages,
      { author: "user", content: message },
    ]);
    setMessage("");
  };
  useEffect(() => {
    console.log(messageHistory);
  }, [messageHistory]);

  return (
    <div
      className={`fixed  right-[30px] bg-white rounded-lg shadow-lg border border-gray-200 ${
        isOpen ? "w-[400px] bottom-[40px]" : "w-20 bottom-[70px]"
      } h-600 transition-all duration-300 ease-in-out z-10`}
    >
      <button
        className="m-2 bg-primary-yellow hover:bg-yellow-500 rounded-full p-2 z-10"
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={toggleChat}
      >
        {isOpen ? (
          <svg
            className="w-4 h-4 text-white fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.59l4.29-4.29a1 1 0 1 1 1.42 1.42L11.41 10l4.3 4.29a1 1 0 0 1-1.42 1.42L10 11.41l-4.29 4.3a1 1 0 1 1-1.42-1.42L8.59 10 4.29 5.71a1 1 0 0 1 1.42-1.42L10 8.59z" />
          </svg>
        ) : (
          <Image src="/chat-icon.png" alt="Chat" width={30} height={30} />
        )}
      </button>
      <div className={`${isOpen ? "block" : "hidden"} p-4 h-full relative`}>
        <div className="h-[200px] border-b border-gray-200 mb-4 overflow-y-scroll">
          {messageHistory.map((mess, idx) => (
            <div
              key={mess.author + idx}
              className={`flex justify-${
                mess.author === "user" ? "end" : "start"
              }`}
            >
              <div
                className={`${
                  mess.author === "user"
                    ? "bg-primary-blue"
                    : "bg-primary-yellow"
                } text-white py-2 px-4 rounded-lg my-2 mx-2`}
                style={{ wordWrap: "break-word" }}
              >
                <ReactMarkdown>{mess.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-[45px] w-400">
          <textarea
            className="flex-grow border border-gray-200 rounded-md mr-2 p-2 resize-none"
            placeholder="Type your message..."
            onChange={updateInput}
            value={message}
          ></textarea>
          <button
            className="bg-primary-yellow hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
