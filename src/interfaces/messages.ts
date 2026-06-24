export type MessagesTypes = "UNREAD" | "READ";

export interface MessagesProps {
  _id: string;
  title: string;
  status: MessagesTypes;
  date: string;
}

export interface MessageDetailsProps {
  _id: string;
  title: string;
  status: string;
  date: string;
  notification: {
    _id: string;
    message: string;
    subject: string;
    type: string;
  };
}
