import { cn } from "@/lib/utils";

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "bg-neutral-900 text-white hover:bg-neutral-700",
        "focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}