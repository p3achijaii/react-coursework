import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Select.module.css";
import { cn } from "../utils";

const Select = forwardRef(({ className, label, options, ...props }, ref) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={StyleSheet.selectWrapper}>
        <select ref={ref} className={cn(styles.select, className)} {...props}>
          {options.map((option) => {
            <option key={option.value} value={options.value}>
              {option.label}
            </option>;
          })}
        </select>
        <ChevronDown className={styles.icon} />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;
