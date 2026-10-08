import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { TaskManager } from '../js/taskManager.js';

describe('TaskManager Unit Tests', () => {
  let manager;

  beforeEach(() => {
    manager = new TaskManager([
      { id: '1', title: 'Setup GitHub CI/CD Pipeline', category: 'DevOps', priority: 'high', completed: true },
      { id: '2', title: 'Write JavaScript Unit Tests', category: 'Testing', priority: 'medium', completed: false },
      { id: '3', title: 'Design Glassmorphism Dashboard', category: 'UI/UX', priority: 'low', completed: false }
    ]);
  });

  test('should initialize with provided tasks', () => {
    assert.strictEqual(manager.getAllTasks().length, 3);
  });

  test('should add a new task correctly', () => {
    const newTask = manager.addTask('Deploy to Vercel', 'Deployment', 'high');
    assert.ok(newTask.id);
    assert.strictEqual(newTask.title, 'Deploy to Vercel');
    assert.strictEqual(newTask.category, 'Deployment');
    assert.strictEqual(newTask.priority, 'high');
    assert.strictEqual(newTask.completed, false);
    assert.strictEqual(manager.getAllTasks().length, 4);
  });

  test('should throw error when adding task with empty title', () => {
    assert.throws(() => {
      manager.addTask('');
    }, {
      name: 'Error',
      message: 'Task title cannot be empty'
    });
  });

  test('should toggle task completion status', () => {
    const updated = manager.toggleTask('2');
    assert.strictEqual(updated.completed, true);
    
    const toggledBack = manager.toggleTask('2');
    assert.strictEqual(toggledBack.completed, false);
  });

  test('should throw error when toggling non-existent task', () => {
    assert.throws(() => {
      manager.toggleTask('non_existent_id');
    }, /not found/);
  });

  test('should delete a task by id', () => {
    const deleted = manager.deleteTask('1');
    assert.strictEqual(deleted.id, '1');
    assert.strictEqual(manager.getAllTasks().length, 2);
  });

  test('should filter tasks by active status', () => {
    const activeTasks = manager.filterTasks('active');
    assert.strictEqual(activeTasks.length, 2);
    assert.ok(activeTasks.every(t => !t.completed));
  });

  test('should filter tasks by completed status', () => {
    const completedTasks = manager.filterTasks('completed');
    assert.strictEqual(completedTasks.length, 1);
    assert.strictEqual(completedTasks[0].id, '1');
  });

  test('should search tasks by title or category keyword', () => {
    const searchResult = manager.filterTasks('all', 'DevOps');
    assert.strictEqual(searchResult.length, 1);
    assert.strictEqual(searchResult[0].title, 'Setup GitHub CI/CD Pipeline');
  });

  test('should compute productivity statistics accurately', () => {
    const stats = manager.getStats();
    assert.strictEqual(stats.total, 3);
    assert.strictEqual(stats.completed, 1);
    assert.strictEqual(stats.active, 2);
    assert.strictEqual(stats.completionPercentage, 33);
    assert.strictEqual(stats.byPriority.high, 1);
    assert.strictEqual(stats.byPriority.medium, 1);
    assert.strictEqual(stats.byPriority.low, 1);
  });

  test('should clear completed tasks', () => {
    const clearedCount = manager.clearCompleted();
    assert.strictEqual(clearedCount, 1);
    assert.strictEqual(manager.getAllTasks().length, 2);
    assert.strictEqual(manager.getStats().completed, 0);
  });
});
