import React from "react";
import { cn } from "@/lib/utils";
import { FloatingLabelInput } from "./floating-input";
import { InputProps } from "../ui/input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <FloatingLabelInput
          label="Password"
          type={"password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
