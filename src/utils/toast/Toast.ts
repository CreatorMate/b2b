import type {ToastType} from "~/src/utils/toast/ToastType";

export type Toast = {
    id: number,
    type: ToastType,
    message: string
}