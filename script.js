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

