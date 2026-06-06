# TaskMaster - To-Do List Application

## Overview

TaskMaster is a modern, feature-rich to-do list application with complete local storage functionality. All tasks are automatically saved to your browser's local storage, so your data persists even after closing the browser.

## 🌟 Features

### ✅ Core Features
- **Add Tasks**: Quickly add tasks with a simple input field
- **Priority Levels**: Assign Low, Medium, or High priority to each task
- **Mark Complete**: Check off completed tasks
- **Edit Tasks**: Modify task text and priority
- **Delete Tasks**: Remove tasks you no longer need
- **Persistent Storage**: All tasks are saved to browser's local storage

### 🎯 Advanced Features
- **Filter Tasks**: View All, Active, or Completed tasks
- **Sort by Priority**: Automatically sort tasks by priority (High → Medium → Low)
- **Task Statistics**: Real-time count of total, completed, and pending tasks
- **Bulk Actions**: Clear all completed tasks at once
- **Export/Import**: Download tasks as JSON or import from JSON file
- **Task Metadata**: Each task shows creation date and time
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 💾 Local Storage
- Tasks are automatically saved to browser's local storage
- Data persists across browser sessions
- No account or login required
- Automatic sync with every change

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nandysubham95-sudo/basudev-agency.git
cd basudev-agency/todo
```

2. Open in browser:
```bash
# Simply open the index.html file in your browser
open index.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📖 How to Use

### Adding a Task
1. Type your task in the input field
2. Select priority (Low, Medium, High)
3. Click "+ Add Task" or press Enter
4. Task is immediately added and saved

### Managing Tasks
- **Complete Task**: Check the checkbox next to the task
- **Edit Task**: Click the ✏️ edit button
- **Delete Task**: Click the 🗑️ delete button
- **Uncomplete Task**: Uncheck the checkbox

### Filtering Tasks
- **All**: View all tasks
- **Active**: View only incomplete tasks
- **Completed**: View only completed tasks

### Sorting
- Click the **🔄 Sort** button to sort by priority
- High priority tasks appear first
- Completed tasks appear at the bottom
- Click again to disable sorting

### Clearing Completed Tasks
- Click **🗑️ Clear Completed** to remove all completed tasks at once
- A confirmation dialog appears before deletion

### Export/Import

**Export Tasks**:
1. Click **📥 Export Tasks** button
2. A JSON file with all tasks is downloaded
3. Filename includes today's date

**Import Tasks**:
1. Click **📤 Import Tasks** button
2. Select a previously exported JSON file
3. All tasks from the file are imported
4. Existing tasks are replaced

## 🎨 User Interface

### Color Scheme
- **Primary**: Purple gradient (#667eea → #764ba2)
- **High Priority**: Red (#ff6b6b)
- **Medium Priority**: Orange (#ffa502)
- **Low Priority**: Teal (#4ecdc4)
- **Success**: Green (#4ecdc4)

### Priority Indicators
- Left border color indicates priority level
- Priority badge shows in task details

### Task Statistics
- **Total Tasks**: Total number of tasks created
- **Completed**: Number of completed tasks
- **Pending**: Number of active tasks

## 💾 Local Storage Details

### Storage Key
```javascript
window.localStorage.taskMasterTasks
```

### Data Structure
```json
[
  {
    "id": 1670000000000,
    "text": "Buy groceries",
    "priority": "high",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Storage Limits
- Browser local storage typically supports 5-10MB per domain
- TaskMaster tasks are typically very small (< 100 bytes each)
- You can store thousands of tasks safely

## ⌨️ Keyboard Shortcuts

- **Enter**: Add task (when input is focused)
- **Ctrl/Cmd + S**: Focus on input field

## 📱 Responsive Design

### Desktop
- Multi-column layout for stats
- Full-width task cards
- Side-by-side filter and sort buttons

### Tablet
- Adjusted font sizes
- Responsive grid layout
- Touch-friendly buttons

### Mobile
- Single-column layout
- Full-width buttons
- Optimized spacing

## 🔒 Privacy & Data

- **No Server**: All data stays on your device
- **No Tracking**: No analytics or telemetry
- **No Login**: No personal information required
- **No Cloud Sync**: Data stored locally only
- **Export Control**: You control all data exports

## 📋 Task Properties

Each task contains:
- **ID**: Unique identifier (timestamp)
- **Text**: Task description
- **Priority**: Low, Medium, or High
- **Completed**: Boolean status
- **Created At**: ISO 8601 timestamp
- **Updated At**: ISO 8601 timestamp

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Animations, gradients, flexbox, grid
- **Vanilla JavaScript**: No frameworks or dependencies
- **Local Storage API**: Browser storage
- **File API**: Export/Import functionality

### Browser Support
- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge 15+
- Mobile browsers (iOS Safari, Android Chrome)

## 📊 Statistics Features

Real-time statistics show:
- Total tasks created
- Completed tasks count
- Pending tasks count
- Updates whenever a task is added/completed/deleted

## 🎯 Best Practices

### For Organization
1. Use priority levels effectively
2. Review completed tasks periodically
3. Export important tasks regularly
4. Clear completed tasks to reduce clutter

### For Backup
1. Export tasks monthly
2. Store exports in cloud storage (Google Drive, Dropbox, etc.)
3. Import if you clear browser data

## 🐛 Troubleshooting

### Tasks Not Saving
- Check if local storage is enabled in browser
- Check browser privacy settings
- Try clearing browser cache

### Import Not Working
- Ensure JSON file is valid
- Check file has .json extension
- Try with a smaller file first

### Performance Issues
- If you have 1000+ tasks, consider archiving old tasks
- Export and clear completed tasks regularly

## 🔄 Data Migration

### Backup Your Tasks
1. Click **📥 Export Tasks**
2. Save the JSON file in multiple locations
3. Keep backups for recovery

### Restore Your Tasks
1. Click **📤 Import Tasks**
2. Select your backup JSON file
3. Confirm import (existing tasks are replaced)

## 📝 Example Workflow

```
1. Create new task: "Buy groceries" (High priority)
2. Create task: "Call mom" (Low priority)
3. Create task: "Finish project" (High priority)
4. View Active tasks
5. Complete "Call mom"
6. Sort by priority
7. Export tasks for backup
8. Clear completed tasks
9. View statistics
```

## 🚀 Future Enhancement Ideas

- [ ] Recurring tasks
- [ ] Due dates and reminders
- [ ] Categories/Tags
- [ ] Cloud sync (Firebase)
- [ ] Drag and drop reordering
- [ ] Dark mode
- [ ] Pomodoro timer
- [ ] Collaborative sharing
- [ ] Mobile app version
- [ ] Voice input

## 📄 License

Made with ❤️ for task management

## 👨‍💻 Developer Notes

The application is built with:
- **TaskManager Class**: Handles all data operations and local storage
- **TaskUI Class**: Manages user interface and user interactions
- **Modular Design**: Easy to extend and maintain
- **No Dependencies**: Pure JavaScript, no frameworks

## 📞 Support

For issues, suggestions, or feedback, please feel free to reach out.

---

**TaskMaster** - Your personal productivity companion 📝✨