import React, { useState } from "react";
import List from "./list";
import Top from "./top";
import { useSelector } from "react-redux";
function AppStatus({
  name,
  userId,
  chatList,
  onClick,
  selectedChatId,
  messages,
}) {
  const [keyword, setKeyword] = useState("");

  function handleChange(e) {
    setKeyword(e.target.value);
  }
  const filteredItems = chatList.filter((item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase());
  });
  return (
    <div className="app-status">
      <Top onChange={handleChange} value={keyword} />
      <div className="list">
        <List
          messages={messages}
          chatList={filteredItems}
          onClick={onClick}
          selectedChatId={selectedChatId}
        />
      </div>
    </div>
  );
}

export default AppStatus;
