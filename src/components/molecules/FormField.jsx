import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  helperText, 
  required = false,
  className,
  children,
  ...props 
}) => {
  const renderInput = () => {
    if (children) {
      return children;
    }
    
    if (type === "textarea") {
      return <Textarea error={!!error} {...props} />;
    }
    
    if (type === "select") {
      return <Select error={!!error} {...props} />;
    }
    
    return <Input type={type} error={!!error} {...props} />;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FormField;