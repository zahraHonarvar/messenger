import React, { useRef, useEffect } from "react";

function Messages({ items, unreadMessageCount, me,selectedChatId ,userId}) {
  const bottomSctoll = useRef(null);

  useEffect(() => {
    console.log(bottomSctoll.current)
    // bottomSctoll.current.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatId]);
  console.log(items);
  return (
    <div>
      {[...items,{ __TYPE: "NONE" }].map((item) => {
        if (items.__TYPE === "NONE") {
    
          return <div ref={bottomSctoll} />;
        }
        return <div>{item.text}</div>;
      
      })}
    </div>
  );
}

export default Messages;
