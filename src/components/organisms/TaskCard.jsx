import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import TaskCheckbox from "@/components/molecules/TaskCheckbox";
import Badge from "@/components/atoms/Badge";
import CategoryPill from "@/components/molecules/CategoryPill";
import { format, isToday, isPast, parseISO } from "date-fns";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}) => {
  const isOverdue = task.dueDate && !task.completed && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate));
  const isDueToday = task.dueDate && isToday(parseISO(task.dueDate));
  
  const formatDueDate = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    return format(date, "MMM dd");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className={cn(
        "task-card bg-white border-l-4 border border-gray-200 rounded-lg p-4 shadow-sm",
        task.completed && "opacity-75 bg-gray-50",
        isOverdue && "border-l-red-500 bg-red-50",
        isDueToday && !task.completed && "border-l-yellow-500 bg-yellow-50",
        !isOverdue && !isDueToday && category && `border-l-[${category.color}]`,
        className
      )}
      style={{ 
        borderLeftColor: isOverdue ? "#ef4444" : isDueToday ? "#f59e0b" : category?.color 
      }}
    >
      <div className="flex items-start gap-4">
        <TaskCheckbox
          checked={task.completed}
          onChange={(checked) => onToggleComplete(task.Id, checked)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-gray-900 mb-1",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600",
                  task.completed && "text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant={task.priority} size="sm">
                <div className={cn("w-2 h-2 rounded-full mr-1", 
                  task.priority === "high" ? "bg-red-500" :
                  task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                )} />
                {task.priority}
              </Badge>
              
              <button
                onClick={() => onEdit(task)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <ApperIcon name="Edit2" className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => onDelete(task.Id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {category && (
              <CategoryPill
                category={category}
                className="text-xs px-2 py-1"
              />
            )}
            
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-sm",
                isOverdue ? "text-red-600 font-medium" :
                isDueToday ? "text-yellow-600 font-medium" : "text-gray-500"
              )}>
                <ApperIcon name="Calendar" className="h-4 w-4" />
                <span>{formatDueDate(task.dueDate)}</span>
                {isOverdue && <ApperIcon name="AlertCircle" className="h-4 w-4 text-red-500" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;