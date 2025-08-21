// Mock categories data - inline to avoid missing file error
const categoriesData = [
  {
    Id: 1,
    name: "Work",
    color: "#3B82F6",
    description: "Professional tasks and projects"
  },
  {
    Id: 2,
    name: "Personal",
    color: "#10B981",
    description: "Personal activities and errands"
  },
  {
    Id: 3,
    name: "Health & Fitness",
    color: "#F59E0B",
    description: "Exercise, health, and wellness tasks"
  },
  {
    Id: 4,
    name: "Learning",
    color: "#8B5CF6",
    description: "Educational content and skill development"
  },
  {
    Id: 5,
    name: "Finance",
    color: "#EF4444",
    description: "Budget planning and financial tasks"
  },
  {
    Id: 6,
    name: "Home",
    color: "#6366F1",
    description: "Household chores and maintenance"
  },
  {
    Id: 7,
    name: "Social",
    color: "#EC4899",
    description: "Social activities and relationships"
  },
  {
    Id: 8,
    name: "Travel",
    color: "#06B6D4",
    description: "Trip planning and travel arrangements"
  }
];

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await delay(300);
    const maxId = Math.max(...categories.map(c => c.Id), 0);
    
    const newCategory = {
      Id: maxId + 1,
      name: categoryData.name,
      color: categoryData.color || "#5B21B6",
      icon: categoryData.icon || "Folder",
      taskCount: 0
    };
    
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    
    if (index === -1) return null;
    
    const updatedCategory = {
      ...categories[index],
      ...updateData,
      Id: parseInt(id)
    };
    
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    
    if (index === -1) return false;
    
    categories.splice(index, 1);
    return true;
  },

  async updateTaskCount(categoryId, count) {
    await delay(100);
    const index = categories.findIndex(c => c.Id === parseInt(categoryId));
    
    if (index === -1) return false;
    
    categories[index].taskCount = count;
    return true;
  }
};