import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const UrgencySelector = ({ value, onChange, className }) => {
  const urgencyLevels = [
    { value: "low", label: "Low", color: "text-pink-500", bgColor: "bg-pink-50 hover:bg-pink-100" },
    { value: "medium", label: "Medium", color: "text-pink-600", bgColor: "bg-pink-50 hover:bg-pink-100" },
    { value: "high", label: "High", color: "text-purple-600", bgColor: "bg-purple-50 hover:bg-purple-100" },
    { value: "critical", label: "Critical", color: "text-purple-700", bgColor: "bg-purple-50 hover:bg-purple-100" }
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      {urgencyLevels.map((urgency) => (
        <button
          key={urgency.value}
          type="button"
          onClick={() => onChange(urgency.value)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200",
            urgency.bgColor,
            value === urgency.value 
              ? "border-current ring-2 ring-purple-200" 
              : "border-gray-200 hover:border-current"
          )}
        >
          <div className={cn("w-2 h-2 rounded-full", 
            urgency.value === "critical" ? "bg-purple-700" :
            urgency.value === "high" ? "bg-purple-600" :
            urgency.value === "medium" ? "bg-pink-600" : "bg-pink-500"
          )} />
          <span className={cn("text-sm font-medium", urgency.color)}>
            {urgency.label}
          </span>
          {value === urgency.value && (
            <ApperIcon name="Check" className="h-4 w-4" />
          )}
        </button>
      ))}
    </div>
  );
};

export default UrgencySelector;