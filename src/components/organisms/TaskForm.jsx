import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import PrioritySelector from "@/components/molecules/PrioritySelector";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskForm = ({ task, onSuccess, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        categoryId: "",
        priority: "medium",
        dueDate: ""
      });
    }
    setErrors({});
  }, [task]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate + "T23:59:59").toISOString() : null
      };
      
      if (task) {
        await taskService.update(task.Id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await taskService.create(taskData);
        toast.success("Task created successfully!");
      }
      
      onSuccess();
    } catch (error) {
      console.error("Failed to save task:", error);
      toast.error(task ? "Failed to update task" : "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ApperIcon name="X" className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="What needs to be done?"
              error={errors.title}
              required
            />
            
            <FormField
              label="Description"
              type="textarea"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Add more details..."
              rows={3}
            />
            
            <FormField
              label="Category"
              type="select"
              value={formData.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              error={errors.categoryId}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.Id} value={category.Id.toString()}>
                  {category.name}
                </option>
              ))}
            </FormField>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 block">
                Priority <span className="text-red-500">*</span>
              </label>
              <PrioritySelector
                value={formData.priority}
                onChange={(priority) => handleInputChange("priority", priority)}
              />
            </div>
            
            <FormField
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            
            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    {task ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <ApperIcon name={task ? "Save" : "Plus"} className="h-4 w-4 mr-2" />
                    {task ? "Update Task" : "Create Task"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;