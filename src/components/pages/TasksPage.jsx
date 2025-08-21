import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import TaskHeader from "@/components/organisms/TaskHeader";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import TaskForm from "@/components/organisms/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const TasksPage = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormSuccess = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleTaskFormCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsMobileSidebarOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Header with user info and logout */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="User" className="h-4 w-4" />
            <span>{user.firstName} {user.lastName}</span>
          </div>
        )}
        <Button onClick={logout} variant="ghost" size="sm">
          <ApperIcon name="LogOut" className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          className="h-full p-6"
        />
      </div>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8 max-w-4xl">
            <TaskHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddTask={handleAddTask}
              onMenuToggle={handleMobileMenuToggle}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              selectedPriority={selectedPriority}
              onPriorityFilterChange={setSelectedPriority}
              className="mb-8"
            />

            <TaskList
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedPriority={selectedPriority}
              statusFilter={statusFilter}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSuccess={handleTaskFormSuccess}
          onCancel={handleTaskFormCancel}
        />
      )}
    </div>
  );
};

export default TasksPage;