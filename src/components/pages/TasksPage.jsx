import React, { useState } from "react";
import { motion } from "framer-motion";
import TaskHeader from "@/components/organisms/TaskHeader";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import { cn } from "@/utils/cn";

const TasksPage = () => {
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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <CategorySidebar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-8 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <TaskHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddTask={handleAddTask}
              onMenuToggle={handleMobileMenuToggle}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              selectedPriority={selectedPriority}
              onPriorityFilterChange={setSelectedPriority}
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
          </motion.div>
        </main>
      </div>

      {/* Task form modal */}
      <TaskForm
        task={editingTask}
        onSuccess={handleTaskFormSuccess}
        onCancel={handleTaskFormCancel}
        isOpen={showTaskForm}
      />
    </div>
  );
};

export default TasksPage;