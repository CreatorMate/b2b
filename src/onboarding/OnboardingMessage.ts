import type {Sender} from "~/src/chat/Sender";
import type {OnboardingMessageType} from "~/src/onboarding/OnboardingMessageType";

export type OnboardingMessage = {
    sender: Sender
    message: string,
    type: OnboardingMessageType,
    id: number
}