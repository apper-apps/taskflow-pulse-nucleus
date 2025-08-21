import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full px-4 py-3 text-sm bg-white border rounded-lg transition-all duration-200",
        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error 
          ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
          : "border-gray-200 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;