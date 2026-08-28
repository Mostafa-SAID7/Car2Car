import { useToast } from "../../hooks/use-toast";
import { Toast, ToastDescription, ToastTitle } from "./Toast";

export function Toaster() {
  const { toasts } = useToast();
  return <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2">{toasts.map(({ id, title, description, action, ...props }) => <Toast key={id} {...props}><div className="grid gap-1">{title ? <ToastTitle>{title}</ToastTitle> : null}{description ? <ToastDescription>{description}</ToastDescription> : null}</div>{action}</Toast>)}</div>;
}
