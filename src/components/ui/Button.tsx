import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";

const variantClasses: Record<Variant, string> = {
  primary: "bg-shrine-gold-500 text-shrine-maroon-900 hover:bg-shrine-gold-300 shadow-shrine",
  secondary: "bg-shrine-maroon-600 text-shrine-cream hover:bg-shrine-maroon-500",
  ghost: "bg-transparent text-shrine-maroon-600 hover:bg-shrine-maroon-50",
  "outline-light": "border border-shrine-cream/70 text-shrine-cream hover:bg-shrine-cream/10",
};

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> & {
    to: string;
    href?: never;
  };

type AnchorButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    to?: never;
  };

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    to?: never;
    href?: never;
  };

export type ButtonProps = LinkButtonProps | AnchorButtonProps | NativeButtonProps;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-[transform,box-shadow,background-color,color,border-color,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-shrine active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shrine-gold-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:active:scale-100";

export function Button(props: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[props.variant ?? "primary"], props.className);

  if ("to" in props && props.to) {
    const { to, variant, children, className, icon, ...anchorRest } = props;
    void variant;
    void className;
    return (
      <Link to={to} className={classes} {...anchorRest}>
        {children}
        {icon}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const { href, variant, children, className, icon, ...anchorRest } = props;
    void variant;
    void className;
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {children}
        {icon}
      </a>
    );
  }

  const { variant, children, className, icon, ...buttonRest } = props as NativeButtonProps;
  void variant;
  void className;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
      {icon}
    </button>
  );
}
