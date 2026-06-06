// ===== LOCAL STORAGE MANAGEMENT =====
class TaskManager {
    constructor() {
        this.storageKey = 'taskMasterTasks';
        this.tasks = this.loadTasks();
    }

    // Load tasks from localStorage
    loadTasks() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    // Save tasks to localStorage
    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
            this.updateStats();
        } catch (error) {
            console.error('Error saving tasks:', error);
            showToast('Error saving tasks', 'error');
        }
    }

    // Add new task
    addTask(text, priority = 'medium') {
        if (!text.trim()) return null;

        const task = {
            id: Date.now(),
            text: text.trim(),
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        return task;
    }

    // Delete task
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date().toISOString();
            this.saveTasks();
        }
    }

    // Edit task
    editTask(id, newText, newPriority) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText.trim();
            task.priority = newPriority;
            task.updatedAt = new Date().toISOString();
            this.saveTasks();
        }
    }

    // Get tasks by filter
    getFilteredTasks(filter = 'all') {
        switch (filter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // Sort tasks by priority
    getSortedTasks(tasks) {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return [...tasks].sort((a, b) => {
            if (a.completed === b.completed) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return a.completed ? 1 : -1;
        });
    }

    // Clear completed tasks
    clearCompleted() {
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveTasks();
    }

    // Update stats
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    }

    // Export tasks as JSON
    exportTasks() {
        return JSON.stringify(this.tasks, null, 2);
    }

    // Import tasks from JSON
    importTasks(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                this.tasks = imported;
                this.saveTasks();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing tasks:', error);
            return false;
        }
    }
}

// ===== UI MANAGEMENT =====
class TaskUI {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.currentFilter = 'all';
        this.isSorted = false;
        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.render();
        this.taskManager.updateStats();
    }

    cacheElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.sortBtn = document.getElementById('sortBtn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFile = document.getElementById('importFile');
    }

    attachEventListeners() {
        // Add task
        this.addBtn.addEventListener('click', () => this.handleAddTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTask();
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e.target));
        });

        // Sort
        this.sortBtn.addEventListener('click', () => this.handleSort());

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());

        // Export/Import
        this.exportBtn.addEventListener('click', () => this.handleExport());
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (e) => this.handleImport(e));
    }

    handleAddTask() {
        const text = this.taskInput.value;
        const priority = this.prioritySelect.value;

        if (!text.trim()) {
            showToast('Please enter a task', 'warning');
            return;
        }

        const task = this.taskManager.addTask(text, priority);
        if (task) {
            this.taskInput.value = '';
            this.taskInput.focus();
            this.render();
            showToast('Task added successfully', 'success');
        }
    }

    handleFilter(btn) {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.isSorted = false;
        this.render();
    }

    handleSort() {
        this.isSorted = !this.isSorted;
        this.sortBtn.style.transform = this.isSorted ? 'rotate(180deg)' : 'rotate(0deg)';
        this.render();
        showToast(this.isSorted ? 'Sorted by priority' : 'Sorting disabled', 'success');
    }

    handleClearCompleted() {
        const completed = this.taskManager.tasks.filter(t => t.completed).length;
        if (completed === 0) {
            showToast('No completed tasks to clear', 'warning');
            return;
        }

        if (confirm(`Delete ${completed} completed task(s)?`)) {
            this.taskManager.clearCompleted();
            this.render();
            showToast('Completed tasks cleared', 'success');
        }
    }

    handleExport() {
        if (this.taskManager.tasks.length === 0) {
            showToast('No tasks to export', 'warning');
            return;
        }

        const data = this.taskManager.exportTasks();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Tasks exported successfully', 'success');
    }

    handleImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = event.target.result;
                if (this.taskManager.importTasks(jsonData)) {
                    this.render();
                    showToast('Tasks imported successfully', 'success');
                } else {
                    showToast('Invalid file format', 'error');
                }
            } catch (error) {
                showToast('Error importing tasks', 'error');
            }
        };
        reader.readAsText(file);
        this.importFile.value = '';
    }

    render() {
        let tasks = this.taskManager.getFilteredTasks(this.currentFilter);
        if (this.isSorted) {
            tasks = this.taskManager.getSortedTasks(tasks);
        }

        this.taskList.innerHTML = '';

        if (tasks.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="taskUI.handleToggleTask(${task.id})"
                >
                <div class="task-content">
                    <span class="task-text">${this.escapeHtml(task.text)}</span>
                    <div class="task-meta">
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                        <span class="task-date">${this.formatDate(task.createdAt)}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-btn" onclick="taskUI.handleEditTask(${task.id})" title="Edit">✏️</button>
                    <button class="task-btn delete-btn" onclick="taskUI.handleDeleteTask(${task.id})" title="Delete">🗑️</button>
                </div>
            `;
            this.taskList.appendChild(li);
        });
    }

    handleToggleTask(id) {
        this.taskManager.toggleTask(id);
        this.render();
        this.taskManager.updateStats();
    }

    handleEditTask(id) {
        const task = this.taskManager.tasks.find(t => t.id === id);
        if (!task) return;

        const newText = prompt('Edit task:', task.text);
        if (newText === null) return;

        if (!newText.trim()) {
            showToast('Task text cannot be empty', 'warning');
            return;
        }

        // Create a priority selector for editing
        const priorities = ['low', 'medium', 'high'];
        const priorityIndex = priorities.indexOf(task.priority);
        const newPriorityIndex = prompt(
            `Select priority (0=Low, 1=Medium, 2=High):`,
            priorityIndex
        );

        if (newPriorityIndex === null) return;

        const newPriority = priorities[parseInt(newPriorityIndex)] || task.priority;
        this.taskManager.editTask(id, newText, newPriority);
        this.render();
        showToast('Task updated', 'success');
    }

    handleDeleteTask(id) {
        if (confirm('Delete this task?')) {
            this.taskManager.deleteTask(id);
            this.render();
            this.taskManager.updateStats();
            showToast('Task deleted', 'success');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(isoString) {
        const date = new Date(isoString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== INITIALIZE APP =====
let taskManager;
let taskUI;

document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
    taskUI = new TaskUI(taskManager);
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        taskUI.taskInput.focus();
    }
});
