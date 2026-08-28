import * as React from "react";
import { cn } from "../../lib/utils";

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (open: boolean) => void; variant?: "default" | "destructive" };
export type ToastActionElement = React.ReactElement;
function Toast({ className, open = true, variant = "default", onOpenChange, children, ...props }: ToastProps) {
  if (!open) return null;
  return <div role="status" className={cn("flex items-start justify-between gap-4 rounded-md border p-4 shadow-lg", variant === "destructive" ? "border-destructive bg-destructive text-destructive-foreground" : "bg-card text-card-foreground", className)} {...props}>{children}<button type="button" aria-label="Dismiss notification" onClick={() => onOpenChange?.(false)}>×</button></div>;
}
const ToastTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("font-semibold", className)} {...props} />;
const ToastDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("text-sm opacity-90", className)} {...props} />;
export { Toast, ToastTitle, ToastDescription };
