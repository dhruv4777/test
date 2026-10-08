/**
 * TaskManager module - Pure logic state manager for tasks & productivity stats
 */

export class TaskManager {
  constructor(initialTasks = []) {
    this.tasks = initialTasks.map(t => ({
      id: t.id || this._generateId(),
      title: t.title || 'Untitled Task',
      category: t.category || 'General',
      priority: t.priority || 'medium', // low, medium, high
      completed: Boolean(t.completed),
      createdAt: t.createdAt || new Date().toISOString()
    }));
  }

  _generateId() {
    return 'task_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  addTask(title, category = 'General', priority = 'medium') {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title cannot be empty');
    }

    const newTask = {
      id: this._generateId(),
      title: title.trim(),
      category: category.trim() || 'General',
      priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.unshift(newTask);
    return newTask;
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new Error(`Task with id "${id}" not found`);
    }
    task.completed = !task.completed;
    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id "${id}" not found`);
    }
    const [deleted] = this.tasks.splice(index, 1);
    return deleted;
  }

  filterTasks(filterStatus = 'all', searchQuery = '') {
    let result = [...this.tasks];

    if (filterStatus === 'active') {
      result = result.filter(t => !t.completed);
    } else if (filterStatus === 'completed') {
      result = result.filter(t => t.completed);
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.category.toLowerCase().includes(q)
      );
    }

    return result;
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    const byPriority = {
      high: this.tasks.filter(t => t.priority === 'high').length,
      medium: this.tasks.filter(t => t.priority === 'medium').length,
      low: this.tasks.filter(t => t.priority === 'low').length
    };

    return {
      total,
      completed,
      active,
      completionPercentage,
      byPriority
    };
  }

  clearCompleted() {
    const countBefore = this.tasks.length;
    this.tasks = this.tasks.filter(t => !t.completed);
    return countBefore - this.tasks.length;
  }

  getAllTasks() {
    return [...this.tasks];
  }
}
