import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { cn } from "../utils";

function ButtonComponent(
  {
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(styles.button, styles[variant], styles[size], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <div className={styles.spinner} />}
    </button>
  );
}

const Button = forwardRef(ButtonComponent);

Button.displayName = "Button";

export default Button;
