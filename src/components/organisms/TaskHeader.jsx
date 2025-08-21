import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onAddTask,
  onMenuToggle,
  statusFilter,
  onStatusFilterChange,
  selectedPriority,
  onPriorityFilterChange,
  className 
}) => {
  const statusOptions = [
    { value: "all", label: "All Tasks", count: null },
    { value: "active", label: "Active", count: null },
    { value: "completed", label: "Completed", count: null }
  ];

  const priorityOptions = [
    { value: "", label: "All Priority" },
    { value: "high", label: "High", color: "bg-red-100 text-red-700" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700" },
    { value: "low", label: "Low", color: "bg-green-100 text-green-700" }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with title and add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="Menu" className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold gradient-text font-display">
              My Tasks
            </h1>
            <p className="text-gray-600 mt-1">
              Stay organized and get things done
            </p>
          </div>
        </div>
        
        <Button onClick={onAddTask} variant="primary" size="lg">
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Search bar */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onClear={() => onSearchChange("")}
        placeholder="Search tasks by title or description..."
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Status filter */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onStatusFilterChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                statusFilter === option.value
                  ? "bg-primary-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onPriorityFilterChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedPriority === option.value
                  ? option.color || "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                selectedPriority === option.value ? "shadow-lg transform scale-105" : "hover:scale-105"
              )}
            >
              {option.value && (
                <div className={cn("w-2 h-2 rounded-full mr-2 inline-block",
                  option.value === "high" ? "bg-red-500" :
                  option.value === "medium" ? "bg-yellow-500" : 
                  option.value === "low" ? "bg-green-500" : ""
                )} />
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;