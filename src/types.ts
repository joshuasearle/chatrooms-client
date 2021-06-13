export interface Message {
  content: string;
  displayName: string;
}

export interface Room {
  messages: Message[];
  roomName: string;
}
