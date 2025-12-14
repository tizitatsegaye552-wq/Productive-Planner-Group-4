els.addBtn.onclick = () => {
  if (!els.title.value.trim()) return;

  tasks.unshift({
    title: els.title.value,
    completed: false,
    start: null,
    deadline: els.deadline.value || null,
    priority: els.priority.value,
    category: els.category.value,
    notified: false
  });

  els.title.value = "";
  els.deadline.value = "";
  save();
  render();
};

function openEdit(task) {
  editingTask = task;
  editTitle.value = task.title;
  editStart.value = task.start || "";
  editReminder.value = task.deadline || "";
  editPriority.value = task.priority;
  editCategory.value = task.category;
  reminderToggle.checked = !!task.deadline;
  modal.classList.remove("hidden");
}

document.getElementById("saveEdit").onclick = () => {
  editingTask.title = editTitle.value;
  editingTask.start = editStart.value || null;
  editingTask.deadline = reminderToggle.checked ? editReminder.value : null;
  editingTask.priority = editPriority.value;
  editingTask.category = editCategory.value;
  editingTask.notified = false;
  save();
  modal.classList.add("hidden");
  render();
};

document.getElementById("cancelEdit").onclick = () =>
  modal.classList.add("hidden");

els.selectAll.onclick = () => {
  const allDone = tasks.every(t => t.completed);
  tasks.forEach(t => (t.completed = !allDone));
  save();
  render();
};

els.clearCompleted.onclick = () => {
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
};

els.filters.forEach(btn =>
  btn.onclick = () => {
    els.filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  }
);

els.search.oninput = render;

Notification.requestPermission();
setInterval(() => {
  const now = new Date();
  tasks.forEach(t => {
    if (t.deadline && !t.notified && !t.completed) {
      const diff = new Date(t.deadline) - now;
      if (diff > 0 && diff <= 15 * 60000) {
        new Notification("Task Reminder", {
          body: `"${t.title}" is due soon`
        });
        t.notified = true;
        save();
      }
    }
  });
}, 60000);

render();
