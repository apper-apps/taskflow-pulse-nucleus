import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryPill from "@/components/molecules/CategoryPill";
import Loading from "@/components/ui/Loading";
import ApperIcon from "@/components/ApperIcon";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";
import { cn } from "@/utils/cn";

const CategorySidebar = ({ 
  selectedCategory, 
  onCategorySelect, 
  className,
  isMobileOpen,
  onMobileClose
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ]);
      
      // Update task counts
      const categoriesWithCounts = categoriesData.map(category => ({
        ...category,
        taskCount: tasksData.filter(task => 
          task.categoryId === category.Id.toString() && !task.completed
        ).length
      }));
      
      setCategories(categoriesWithCounts);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between lg:justify-start">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ApperIcon name="FolderOpen" className="h-5 w-5 text-primary-600" />
            Categories
          </h2>
          <button
            onClick={onMobileClose}
            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <ApperIcon name="X" className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
              !selectedCategory 
                ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg" 
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <div className="flex items-center gap-3">
              <ApperIcon name="Inbox" className="h-5 w-5" />
              <span>All Tasks</span>
            </div>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              !selectedCategory 
                ? "bg-white bg-opacity-20" 
                : "bg-gray-200 text-gray-600"
            )}>
              {categories.reduce((sum, cat) => sum + cat.taskCount, 0)}
            </span>
          </button>
          
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              {categories.map(category => (
                <motion.div
                  key={category.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => onCategorySelect(category.Id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      selectedCategory === category.Id
                        ? "text-white shadow-lg transform scale-105"
                        : "text-gray-700 hover:bg-gray-100 hover:scale-102"
                    )}
                    style={selectedCategory === category.Id ? { 
                      background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)` 
                    } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <ApperIcon name={category.icon} className="h-5 w-5" />
                      <span>{category.name}</span>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      selectedCategory === category.Id
                        ? "bg-white bg-opacity-20"
                        : "bg-gray-200 text-gray-600"
                    )}>
                      {category.taskCount}
                    </span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );

  // Desktop sidebar
  const desktopSidebar = (
    <div className={cn(
      "hidden lg:flex w-80 bg-white border-r border-gray-200 flex-col",
      className
    )}>
      {sidebarContent}
    </div>
  );

  // Mobile sidebar
  const mobileSidebar = (
    <div className={cn(
      "lg:hidden fixed inset-0 z-50 transition-all duration-300",
      isMobileOpen ? "visible" : "invisible"
    )}>
      <div 
        className={cn(
          "absolute inset-0 bg-black transition-opacity duration-300",
          isMobileOpen ? "opacity-50" : "opacity-0"
        )}
        onClick={onMobileClose}
      />
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </div>
    </div>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default CategorySidebar;