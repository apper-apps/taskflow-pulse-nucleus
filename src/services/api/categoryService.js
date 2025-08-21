import categoriesData from "@/services/mockData/categories.json";

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