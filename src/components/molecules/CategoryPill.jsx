import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryPill = ({ 
  category, 
  active = false, 
  onClick, 
  showCount = false,
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "category-pill flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-150",
        active 
          ? "text-white shadow-lg transform scale-105" 
          : "text-gray-700 bg-gray-100 hover:bg-gray-200",
        className
      )}
      style={active ? { backgroundColor: category.color } : {}}
    >
      <ApperIcon name={category.icon} className="h-4 w-4" />
      <span>{category.name}</span>
      {showCount && (
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full",
          active ? "bg-white bg-opacity-20" : "bg-gray-200"
        )}>
          {category.taskCount}
        </span>
      )}
    </button>
  );
};

export default CategoryPill;