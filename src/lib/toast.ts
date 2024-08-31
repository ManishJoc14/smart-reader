import { Bounce, toast } from "react-toastify";

// Utility function for toasts
export default function warnToast(text: string) {
  toast.warn(text);
}

export function successToast(text: string) {
  toast.success(text);
}

export function errorToast(text: string) {
  toast.error(text);
}

export function infoToast(text: string) {
  toast.info(text);
}
