import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { cn } from "../../lib/utils";

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, styles[variant], styles[size], className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <div className={styles.spinner} />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
