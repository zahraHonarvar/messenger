
import * as request from '../routes/request';
export function getChatMessages(chatId, userId, messageId) {
    let url = `chats/load/${chatId}/user/${userId}/`;
    if (messageId) {
      url += `?message=${messageId}`
    }
    return request.get(url);
  }
  