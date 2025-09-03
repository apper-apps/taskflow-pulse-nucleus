import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks].sort((a, b) => a.order - b.order);
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(400);
    const maxId = Math.max(...tasks.map(t => t.Id), 0);
    const maxOrder = Math.max(...tasks.map(t => t.order), 0);
    
const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: taskData.categoryId,
      priority: taskData.priority || "medium",
      urgency: taskData.urgency || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      order: maxOrder + 1
    };
    
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) return null;
    
const updatedTask = {
      ...tasks[index],
      ...updateData,
      Id: parseInt(id)
    };
    
    // Handle completion status
    if (updateData.completed !== undefined) {
      updatedTask.completedAt = updateData.completed ? new Date().toISOString() : null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  async reorder(taskId, newOrder) {
    await delay(200);
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(taskId));
    
    if (taskIndex === -1) return false;
    
    tasks[taskIndex].order = newOrder;
    
    // Reorder all tasks
    tasks.sort((a, b) => a.order - b.order);
    tasks.forEach((task, index) => {
      task.order = index + 1;
    });
    
    return true;
  },

  async getByCategory(categoryId) {
    await delay(250);
    return tasks
      .filter(t => t.categoryId === categoryId.toString())
      .sort((a, b) => a.order - b.order)
      .map(t => ({ ...t }));
  },

  async getByPriority(priority) {
    await delay(250);
    return tasks
      .filter(t => t.priority === priority)
      .sort((a, b) => a.order - b.order)
      .map(t => ({ ...t }));
  },

  async search(query) {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return tasks
      .filter(t => 
        t.title.toLowerCase().includes(lowercaseQuery) ||
        t.description.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => a.order - b.order)
      .map(t => ({ ...t }));
  },

  async getCompleted() {
    await delay(250);
    return tasks
      .filter(t => t.completed)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .map(t => ({ ...t }));
  },

  async getActive() {
    await delay(250);
    return tasks
      .filter(t => !t.completed)
      .sort((a, b) => a.order - b.order)
      .map(t => ({ ...t }));
  }
};