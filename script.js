let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let filter = "all";
let editingTask = null;

const els = {
  title: document.getElementById("taskInput"),
  deadline: document.getElementById("deadlineInput"),
  priority: document.getElementById("priority"),
  category: document.getElementById("category"),
  addBtn: document.getElementById("addBtn"),
  list: document.getElementById("taskList"),
  search: document.getElementById("search"),
  remaining: document.getElementById("remaining"),
  filters: document.querySelectorAll(".filter"),
  selectAll: document.getElementById("selectAll"),
  clearCompleted: document.getElementById("clearCompleted")
};

const modal = document.getElementById("editModal");
const editTitle = document.getElementById("editTitle");
const editStart = document.getElementById("editStart");
const editReminder = document.getElementById("editReminder");
const editPriority = document.getElementById("editPriority");
const editCategory = document.getElementById("editCategory");
const reminderToggle = document.getElementById("reminderToggle");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  els.list.innerHTML = "";
  const query = els.search.value.toLowerCase();

  const visible = tasks.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    if (filter === "overdue")
      return t.deadline && !t.completed && new Date(t.deadline) < new Date();
    return true;
  }).filter(t => t.title.toLowerCase().includes(query));

  visible.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");
    if (task.deadline && !task.completed && new Date(task.deadline) < new Date())
      li.classList.add("overdue");

    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        ${task.title}
        <br><small>${task.category} • ${task.priority}</small>
      </div>
      <div class="task-actions">
        <button class="edit">✎</button>
        <button class="delete">✖</button>
      </div>
    `;

    li.querySelector("input").onchange = () => {
      task.completed = !task.completed;
      save();
      render();
    };

    li.querySelector(".edit").onclick = () => openEdit(task);
    li.querySelector(".delete").onclick = () => {
      tasks = tasks.filter(t => t !== task);
      save();
      render();
    };

    els.list.appendChild(li);
  });

  els.remaining.textContent =
    tasks.filter(t => !t.completed).length + " tasks remaining";
}