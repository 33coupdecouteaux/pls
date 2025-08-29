import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

const glassButtonVariants = cva(
  "relative isolate all-unset inline-flex items-center cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tighter",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  contentClassName?: string;
  asChild?: boolean; // render styles onto single child element
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, asChild, ...props }, ref) => {
    // Support legacy attribute name 'as-child' without leaking to DOM.
    if (Object.prototype.hasOwnProperty.call(props, 'as-child')) {
      const legacy = (props as Record<string, unknown>)['as-child'];
      if (legacy) asChild = true;
      delete (props as Record<string, unknown>)['as-child'];
    }

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
      const merged = cn("glass-button", glassButtonVariants({ size }), child.props.className);
      return (
  <div className={cn("glass-button-wrap inline-flex w-fit cursor-pointer rounded-full overflow-hidden", className)}>
          {React.cloneElement(child, {
            className: merged,
            children: (
              <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>
                {child.props.children}
              </span>
            )
          })}
          <div className="glass-button-shadow rounded-full" />
        </div>
      );
    }
    return (
      <div
        className={cn(
          "glass-button-wrap inline-flex w-fit cursor-pointer rounded-full overflow-hidden",
          className
        )}
      >
        <button
          className={cn("glass-button", glassButtonVariants({ size }))}
          ref={ref}
          {...props}
        >
          <span
            className={cn(
              glassButtonTextVariants({ size }),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
        <div className="glass-button-shadow rounded-full"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };