import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pb-4", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-gray-900", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-2", className)}
    {...props}
  />
));

CardContent.displayName = "CardContent";

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card;