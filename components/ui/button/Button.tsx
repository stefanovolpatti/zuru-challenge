import Link from "next/link";
import { cn } from "cn";

export type ButtonVariant = "ghost" | "red" | "neutral";

// The classes themselves live in app/globals.css (.btn + one class per variant).
const variantClasses: Record<ButtonVariant, string> = {
  ghost: "btn-ghost",
  red: "btn-red",
  neutral: "btn-neutral",
};

export type ButtonProps = Omit<
  React.ComponentProps<"button">,
  "className" | "children"
> & {
  variant?: ButtonVariant;
  /** With `href` the button renders as a link, so it is one focusable element. */
  href?: string;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "ghost",
  href,
  className,
  children,
  ...buttonProps
}: ButtonProps) {
  const classes = cn("btn", variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
