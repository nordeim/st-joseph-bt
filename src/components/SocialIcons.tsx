import { cn } from "@/utils/cn";

interface IconProps {
  className?: string;
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M14.5 8.25H17V5h-2.5C11.91 5 10 6.91 10 9.5V12H7.5v3.25H10V22h3.25v-6.75H16L16.75 12H13.25V9.5c0-.69.56-1.25 1.25-1.25Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M22 12.2s0-3.2-.4-4.6c-.22-.82-.86-1.46-1.68-1.68C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.92.42c-.82.22-1.46.86-1.68 1.68C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.22.82.86 1.46 1.68 1.68C5.5 18.9 12 18.9 12 18.9s6.5 0 7.92-.42c.82-.22 1.46-.86 1.68-1.68.4-1.4.4-4.6.4-4.6ZM10.2 15.15V9.25l5.2 2.95-5.2 2.95Z" />
    </svg>
  );
}
