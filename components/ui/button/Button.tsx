import Link from "next/link";
import { cn } from "cn";

export type ButtonVariant = "ghost" | "red" | "neutral";

// The classes themselves live in app/globals.css (.btn + one class per variant).
const variantClasses: Record<ButtonVariant, string> = {
  ghost: "btn-ghost",
  red: "btn-red",
  neutral: "btn-neutral",
};

type ButtonBaseProps = Omit<
  React.ComponentProps<"button">,
  "className" | "children"
> & {
  variant?: ButtonVariant;
  /** With `href` the button renders as a link, so it is one focusable element. */
  href?: string;
  className?: string;
  /** Decorative icon, rendered aria-hidden. */
  icon?: React.ReactNode;
};

export type ButtonProps =
  | (ButtonBaseProps & { children: React.ReactNode; iconOnly?: false })
  | (ButtonBaseProps & {
      /** Icon-only circular button. Requires an accessible name. */
      icon: React.ReactNode;
      iconOnly: true;
      "aria-label": string;
      children?: never;
    });

export function Button(props: ButtonProps) {
  const { variant = "ghost", href, className, icon, iconOnly, children, ...buttonProps } = props;

  const classes = cn("btn", variantClasses[variant], iconOnly && "btn-icon", className);
  const iconNode = icon ? (
    <span aria-hidden="true" className="inline-flex">
      {icon}
    </span>
  ) : null;
  const content = iconOnly ? iconNode : (
    <>
      {children}
      {iconNode}
    </>
  );

  if (href) {
    // Links don't take button-only attributes. The rest are forwarded; the
    // cast bridges the button/anchor event-handler generics.
    const { type: _type, disabled: _disabled, ...rest } = buttonProps;
    void _type;
    void _disabled;
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as Omit<React.ComponentProps<typeof Link>, "href">)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
