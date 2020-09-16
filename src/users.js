const users = [
  {
    id: Math.random().toString(),
    name: "ali",
    gender: "man",
    unreadMessageCount: "0",
    chats: [
      {
        chatId: Math.random().toString(),
        time: new Date(),
        userId: "",
        messages: [
          {
            messageId: Math.random().toString(),
            type: "text",
            content: "hi",
            chatId: "",
          },
        ],
      },
    ],
  },
  {
    id: Math.random().toString(),
    name: "maryam",
    gender: "woman",
    unreadMessageCount: "0",
    chats: [
      {
        chatId: Math.random().toString(),
        time: new Date(),

        userId: "",
        messages: [
          {
            messageId: Math.random().toString(),
            type: "text",
            content: "hi",
            chatId: "",
          },
          {
            messageId: Math.random().toString(),
            type: "text",
            content: "hi",
            chatId: "",
          },
        ],
      },
    ],
  },
];
export default users;
