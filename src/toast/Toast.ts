import type {ToastType} from "~/src/toast/ToastType";

export type Toast = {
    id: number,
    type: ToastType,
    message: string
}