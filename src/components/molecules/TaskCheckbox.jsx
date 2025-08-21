import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const TaskCheckbox = ({ checked, onChange, className, disabled = false }) => {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200",
        checked 
          ? "bg-gradient-to-r from-green-500 to-green-600 border-green-500 text-white" 
          : "border-gray-300 hover:border-green-400 bg-white",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="Check" className="h-3 w-3" />
        </motion.div>
      )}
    </button>
  );
};

export default TaskCheckbox;