import React from "react";

function RadioChat({ contents, message, username, setMessage, handleEnter }) {
  return (
    <div className={"chat-box"}>
      <div className="header"></div>
      <div className={"contents"}>
        {contents.map((message, index) => (
          <div key={index}>
            {message.username} : {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          placeholder="input your messages..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSearch={(value) => handleEnter(username, value)}
          enterButton={"Enter"}
        />
      </div>
    </div>
  );
}

export default RadioChat;
