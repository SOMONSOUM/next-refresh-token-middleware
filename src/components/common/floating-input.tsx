import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, startContent, endContent, ...props }, ref) => {
    return (
      <>
        <p className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-2 ">
          <span className=""> {startContent}</span>
        </p>
        <p className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-[350px] ">
          <span className=""> {endContent}</span>
        </p>
        <Input
          placeholder=" "
          className={cn(`peer ${startContent && "pl-9"}`, className)}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        " peer-focus:secondary peer-focus:dark:secondary absolute start-4 top-1 text-slate-600 z-10 origin-[0] -translate-y-4 scale-90 transform bg-background  text-sm  duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:px-1 px-2   peer-focus:-translate-y-4 peer-focus:scale-90  dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/2",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, ...props }, ref) => {
  return (
    <div className="relative w-96">
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
