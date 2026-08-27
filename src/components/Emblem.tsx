import { cn } from "@/utils/cn";

interface EmblemProps {
  className?: string;
}

/** Carpenter's square and lily — attributes of St Joseph the Worker. */
export function Emblem({ className }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
    >
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
      <path
        d="M14 12.5h8.5v4.2H18.2V35H14V12.5Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M18.2 30.8H35v4.2H18.2z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M29.2 11.5c2.4 2.2 3.8 4.6 2.6 7.4-.7 1.6-2.2 2.6-3.8 2.8 1.7.2 3.2 1.2 3.9 2.8 1.2 2.8-.3 5.3-2.7 7.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M28 13.2c.2 3.4.2 7.2.2 11.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="28.1" cy="21.2" r="1.15" fill="currentColor" />
    </svg>
  );
}
