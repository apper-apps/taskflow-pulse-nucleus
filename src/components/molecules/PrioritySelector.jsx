import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const PrioritySelector = ({ value, onChange, className }) => {
const priorities = [
    { value: "low", label: "Low", color: "text-green-600", bgColor: "bg-green-50 hover:bg-green-100" },
    { value: "medium", label: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-50 hover:bg-yellow-100" },
    { value: "high", label: "High", color: "text-red-600", bgColor: "bg-red-50 hover:bg-red-100" }
  ];

  const urgencyLevels = [
    { value: "low", label: "Low", color: "text-pink-500", bgColor: "bg-pink-50 hover:bg-pink-100" },
    { value: "medium", label: "Medium", color: "text-pink-600", bgColor: "bg-pink-50 hover:bg-pink-100" },
    { value: "high", label: "High", color: "text-purple-600", bgColor: "bg-purple-50 hover:bg-purple-100" },
    { value: "critical", label: "Critical", color: "text-purple-700", bgColor: "bg-purple-50 hover:bg-purple-100" }
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      {priorities.map((priority) => (
        <button
          key={priority.value}
          type="button"
          onClick={() => onChange(priority.value)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            priority.bgColor,
            value === priority.value
              ? `${priority.color} ring-2 ring-offset-1 ring-current`
              : `${priority.color} opacity-70 hover:opacity-100`
          )}
        >
<div className={cn("w-2 h-2 rounded-full", 
            priority.value === "high" ? "bg-red-500" :
            priority.value === "medium" ? "bg-yellow-500" : "bg-green-500"
          )} />
          {priority.label}
        </button>
      ))}
    </div>
  );
};

export default PrioritySelector;