import { TaskManager } from './taskManager.js';

// Initial sample data
const defaultTasks = [
  { id: '1', title: 'Configure GitHub Actions Workflow (.github/workflows/ci.yml)', category: 'DevOps', priority: 'high', completed: true },
  { id: '2', title: 'Run automated npm test & npm run build on git push', category: 'CI/CD', priority: 'high', completed: true },
  { id: '3', title: 'Create HTML/CSS/JS frontend interface', category: 'Frontend', priority: 'medium', completed: false },
  { id: '4', title: 'Push main repository branch to GitHub', category: 'Git', priority: 'medium', completed: false }
];

const manager = new TaskManager(defaultTasks);
let currentFilter = 'all';
let currentSearch = '';

// DOM Elements
const taskListEl = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const categoryInput = document.getElementById('categoryInput');
const priorityInput = document.getElementById('priorityInput');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.tab-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Stat Elements
const statTotal = document.getElementById('statTotal');
const statCompleted = document.getElementById('statCompleted');
const statActive = document.getElementById('statActive');
const progressPercent = document.getElementById('progressPercent');
const progressBarFill = document.getElementById('progressBarFill');

function render() {
  // Update Stats
  const stats = manager.getStats();
  if (statTotal) statTotal.textContent = stats.total;
  if (statCompleted) statCompleted.textContent = stats.completed;
  if (statActive) statActive.textContent = stats.active;
  if (progressPercent) progressPercent.textContent = `${stats.completionPercentage}%`;
  if (progressBarFill) progressBarFill.style.width = `${stats.completionPercentage}%`;

  // Filter Tasks
  const filteredTasks = manager.filterTasks(currentFilter, currentSearch);

  if (!taskListEl) return;

  if (filteredTasks.length === 0) {
    taskListEl.innerHTML = `
      <div class="empty-state">
        <svg style="width:48px;height:48px;margin-bottom:0.5rem;opacity:0.5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <p>No tasks found</p>
      </div>
    `;
    return;
  }

  taskListEl.innerHTML = filteredTasks.map(task => `
    <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <div class="task-left">
        <div class="checkbox-custom" onclick="window.toggleTask('${task.id}')">
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="task-details">
          <span class="task-title">${escapeHtml(task.title)}</span>
          <div class="task-tags">
            <span class="badge badge-category">${escapeHtml(task.category)}</span>
            <span class="badge badge-priority-${task.priority}">${task.priority}</span>
          </div>
        </div>
      </div>
      <button class="btn-icon" onclick="window.deleteTask('${task.id}')" title="Delete Task">
        <svg style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Global actions for inline onclick handlers
window.toggleTask = (id) => {
  manager.toggleTask(id);
  render();
};

window.deleteTask = (id) => {
  manager.deleteTask(id);
  render();
};

// Event Listeners
if (taskForm) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    manager.addTask(title, categoryInput.value, priorityInput.value);
    taskInput.value = '';
    render();
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    render();
  });
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    render();
  });
});

if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener('click', () => {
    manager.clearCompleted();
    render();
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', render);
