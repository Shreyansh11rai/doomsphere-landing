import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";
type ButtonRadius = "md" | "lg" | "xl" | "full";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "ui-button-primary",
  secondary: "ui-button-secondary",
  ghost: "ui-button-ghost",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3",
  icon: "h-10 w-10 px-0 py-0",
};

const radiusClasses: Record<ButtonRadius, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  radius?: ButtonRadius;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  children,
  className,
  radius = "full",
  size = "sm",
  variant = "primary",
  ...props
}: ButtonProps) {
  const buttonClassName = [
    "ui-button",
    variantClasses[variant],
    sizeClasses[size],
    radiusClasses[radius],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    if (isInternalHref(href)) {
      return (
        <Link className={buttonClassName} href={href} {...linkProps}>
          {children}
        </Link>
      );
    }

    return (
      <a className={buttonClassName} href={href} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;

  return (
    <button
      {...buttonProps}
      className={buttonClassName}
      type={buttonProps.type ?? "button"}
    >
      {children}
    </button>
  );
}

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}
