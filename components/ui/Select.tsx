import * as React from "react";
import { cn } from "../../lib/utils";

function Select({ value, onValueChange, children }: { value?: string; onValueChange?: (value: string) => void; children: React.ReactNode }) {
  return <div data-value={value}>{React.Children.map(children, (child) => React.isValidElement(child) ? React.cloneElement(child, { value, onValueChange } as Record<string, unknown>) : child)}</div>;
}
function SelectTrigger({ id, className, children, value, onValueChange }: React.SelectHTMLAttributes<HTMLSelectElement> & { onValueChange?: (value: string) => void }) {
  return <select id={id} value={value} onChange={(event) => onValueChange?.(event.target.value)} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground", className)}>{children}</select>;
}
function SelectValue({ placeholder }: { placeholder?: string }) { return <option value="">{placeholder}</option>; }
function SelectContent({ children }: { children: React.ReactNode }) { return <>{children}</>; }
function SelectItem({ value, children }: { value: string; children: React.ReactNode }) { return <option value={value}>{children}</option>; }
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
