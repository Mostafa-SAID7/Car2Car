import * as React from "react";
import { cn } from "../../lib/utils";

const DialogContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null);

function Dialog({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (value: boolean) => { if (controlledOpen === undefined) setUncontrolledOpen(value); onOpenChange?.(value); };
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}
function DialogTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const context = React.useContext(DialogContext);
  if (!context) return null;
  return asChild ? React.cloneElement(children, { onClick: () => context.setOpen(true) }) : <button type="button" onClick={() => context.setOpen(true)}>{children}</button>;
}
function DialogContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DialogContext);
  if (!context?.open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) context.setOpen(false); }}><div role="dialog" aria-modal="true" className={cn("w-full rounded-lg border bg-card text-card-foreground shadow-lg", className)}>{children}</div></div>;
}
export { Dialog, DialogTrigger, DialogContent };
