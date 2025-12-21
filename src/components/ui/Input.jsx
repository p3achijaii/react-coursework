import React, { forwardRef } from "react";
import styles from "./Input.module.css";
import { cn } from "../utils";

const Input = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          className={cn(styles.input, error && styles.inputError, className)}
          {...props}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
