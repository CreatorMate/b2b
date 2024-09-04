import type {Sender} from "~/src/chat/Sender";

export type ChatMessage = {
    sender: Sender
    message: string,
    type: string,
}