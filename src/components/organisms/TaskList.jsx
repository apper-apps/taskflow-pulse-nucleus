import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";

const TaskList = ({ 
  searchQuery, 
  selectedCategory, 
  selectedPriority, 
  statusFilter,
  onAddTask,
  onEditTask,
  refreshTrigger
}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  useEffect(() => {
    filterTasks();
  }, [searchQuery, selectedCategory, selectedPriority, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = async () => {
    if (loading) return;
    
    try {
      let filteredTasks = tasks;
      
      // Filter by search query
      if (searchQuery.trim()) {
        filteredTasks = await taskService.search(searchQuery);
      }
      
      // Filter by category
      if (selectedCategory) {
        filteredTasks = filteredTasks.filter(task => 
          task.categoryId === selectedCategory.toString()
        );
      }
      
      // Filter by priority
      if (selectedPriority) {
        filteredTasks = filteredTasks.filter(task => 
          task.priority === selectedPriority
        );
      }
      
      // Filter by status
      if (statusFilter === "completed") {
        filteredTasks = filteredTasks.filter(task => task.completed);
      } else if (statusFilter === "active") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
      }
      
      setTasks(filteredTasks);
    } catch (err) {
      console.error("Failed to filter tasks:", err);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.update(taskId, { completed });
      
      setTasks(prev => 
        prev.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      
      if (completed) {
        toast.success("🎉 Task completed! Great job!");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.delete(taskId);
        setTasks(prev => prev.filter(task => task.Id !== taskId));
        toast.success("Task deleted successfully");
      } catch (error) {
        console.error("Failed to delete task:", error);
        toast.error("Failed to delete task");
      }
    }
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id.toString() === categoryId.toString());
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadData}
      />
    );
  }

  if (tasks.length === 0) {
    const getEmptyStateProps = () => {
      if (searchQuery.trim()) {
        return {
          title: "No tasks found",
          description: `No tasks match "${searchQuery}". Try adjusting your search.`,
          icon: "Search"
        };
      }
      
      if (selectedCategory) {
        const category = getCategoryById(selectedCategory);
        return {
          title: `No ${category?.name || "category"} tasks`,
          description: `You don't have any tasks in this category yet.`,
          icon: category?.icon || "Folder"
        };
      }
      
      if (statusFilter === "completed") {
        return {
          title: "No completed tasks",
          description: "Complete some tasks to see them here.",
          icon: "CheckCircle"
        };
      }
      
      return {
        title: "No tasks yet",
        description: "Get started by creating your first task and stay organized!",
        icon: "CheckSquare",
        action: (
          <Button onClick={onAddTask} variant="primary">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Create Your First Task
          </Button>
        )
      };
    };

    return <Empty {...getEmptyStateProps()} />;
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <TaskCard
            key={task.Id}
            task={task}
            category={getCategoryById(task.categoryId)}
            onToggleComplete={handleToggleComplete}
            onEdit={onEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;