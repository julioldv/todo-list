import { parseISO, format } from "date-fns";
const aside = document.querySelector("#project-list");
const title = document.querySelector("#active-project-title");
const todoList = document.querySelector("#todo-list");

const projectForm = document.querySelector("#project-form");
const projectTitleInput = document.querySelector("#project-title");

const todoForm = document.querySelector("#todo-form");
const todoTitleInput = document.querySelector("#todo-title");
const todoDescriptionInput = document.querySelector("#todo-description");
const todoDueDateInput = document.querySelector("#todo-due-date");
const todoPriorityInput = document.querySelector("#todo-priority");

function clearElement(element) {
  element.textContent = "";
}

function renderProjects(projects) {
  clearElement(aside);
  for (const project of projects) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-item");
    const projectButton = document.createElement("button");
    projectButton.textContent = project.title;
    projectButton.dataset.projectId = project.id;
    projectButton.classList.add("project-button");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.deleteProjectId = project.id;

    projectContainer.append(projectButton, deleteButton);
    aside.append(projectContainer);
  }
}

function renderTodos(project, expandedTodoId, editingTodoId) {
  clearElement(todoList);

  for (const todo of project.todos) {
    const isExpanded = todo.id === expandedTodoId;
    const isEditing = todo.id === editingTodoId;

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.todoId = todo.id;
    deleteButton.classList.add("btn", "btn-secondary");
    const completeButton = document.createElement("button");
    completeButton.textContent = todo.completed
      ? "Mark as uncompleted"
      : "Mark as completed";
    completeButton.dataset.completeTodoId = todo.id;
    completeButton.classList.add("btn", "btn-primary");

    const card = document.createElement("div");
    card.dataset.expandTodoId = todo.id;
    card.classList.add("todo-card");

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const dueDate = document.createElement("p");
    const formattedDate = format(parseISO(todo.dueDate), "MMM d, yyyy");

    dueDate.textContent = formattedDate;

    const priority = document.createElement("span");
    priority.textContent = todo.priority;
    priority.classList.add("priority-badge", `priority-${todo.priority}`);

    const completed = document.createElement("p");
    completed.textContent = todo.completed ? "Completed" : "Uncompleted";

    if (todo.completed) {
      card.classList.add("todo-completed");
    }

    card.append(title, dueDate, priority);
    if (isExpanded) {
      if (isExpanded && isEditing) {
        const form = document.createElement("form");
        form.dataset.editFormId = todo.id;

        const titleInput = document.createElement("input");
        titleInput.name = "title";
        titleInput.value = todo.title;
        titleInput.required = true;

        const descriptionInput = document.createElement("input");
        descriptionInput.name = "description";
        descriptionInput.value = todo.description;

        const dueDateInput = document.createElement("input");
        dueDateInput.name = "dueDate";
        dueDateInput.type = "date";
        dueDateInput.value = todo.dueDate;
        dueDateInput.required = true;

        const prioritySelect = document.createElement("select");
        prioritySelect.name = "priority";

        for (const priority of ["low", "medium", "high"]) {
          const option = document.createElement("option");
          option.value = priority;
          option.textContent = priority;
          option.selected = todo.priority === priority;
          prioritySelect.append(option);
        }

        const saveButton = document.createElement("button");
        saveButton.type = "submit";
        saveButton.textContent = "Save";

        form.append(
          titleInput,
          descriptionInput,
          dueDateInput,
          prioritySelect,
          saveButton,
        );
        card.append(form);
      } else if (isExpanded) {
        const description = document.createElement("p");
        description.textContent = todo.description;

        const completed = document.createElement("p");
        completed.textContent = todo.completed ? "Completed" : "Uncompleted";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.dataset.editTodoId = todo.id;
        editButton.classList.add("btn", "btn-danger");

        actions.append(editButton, completeButton, deleteButton);

        card.append(description, completed, actions);
      }
    }

    todoList.append(card);
  }
}

function renderApp(projects, activeProject, expandedTodoId, editingTodoId) {
  title.textContent = activeProject.title;
  renderProjects(projects);
  renderTodos(activeProject, expandedTodoId, editingTodoId);
}
function bindProjectSelection(handler) {
  aside.addEventListener("click", (event) => {
    const projectButton = event.target.closest("[data-project-id]");

    if (!projectButton) return;

    handler(projectButton.dataset.projectId);
  });
}

function bindProjectForm(handler) {
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = projectTitleInput.value.trim();

    if (!title) return;

    handler(title);

    projectForm.reset();
  });
}

function bindProjectDeletion(handler) {
  aside.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-project-id]");

    if (!deleteButton) return;

    handler(deleteButton.dataset.deleteProjectId);
  });
}

function bindTodoForm(handler) {
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = todoTitleInput.value.trim();
    const description = todoDescriptionInput.value.trim();
    const dueDate = todoDueDateInput.value;
    const priority = todoPriorityInput.value;

    if (!title || !description || !dueDate || !priority) return;

    handler(title, description, dueDate, priority);
    todoForm.reset();
  });
}

function bindTodoDeletion(handler) {
  todoList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-todo-id]");

    if (!deleteButton) return;

    handler(deleteButton.dataset.todoId);
  });
}

function bindTodoCompletion(handler) {
  todoList.addEventListener("click", (event) => {
    const toggleButton = event.target.closest("[data-complete-todo-id]");

    if (!toggleButton) return;

    handler(toggleButton.dataset.completeTodoId);
  });
}

function bindTodoExpansion(handler) {
  todoList.addEventListener("click", (event) => {
    if (event.target.closest("button, input, select, textarea, form")) return;

    const todoCard = event.target.closest("[data-expand-todo-id]");

    if (!todoCard) return;

    handler(todoCard.dataset.expandTodoId);
  });
}

function bindTodoEdit(handler) {
  todoList.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-todo-id]");

    if (!editButton) return;

    handler(editButton.dataset.editTodoId);
  });
}

function bindTodoEditForm(handler) {
  todoList.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-edit-form-id]");

    if (!form) return;

    event.preventDefault();

    const todoId = form.dataset.editFormId;

    const title = form.elements.title.value.trim();
    const description = form.elements.description.value.trim();
    const dueDate = form.elements.dueDate.value;
    const priority = form.elements.priority.value;

    if (!title || !dueDate || !priority) return;

    handler(todoId, title, description, dueDate, priority);
  });
}

export {
  renderProjects,
  renderTodos,
  renderApp,
  bindProjectSelection,
  bindProjectForm,
  bindTodoForm,
  bindProjectDeletion,
  bindTodoDeletion,
  bindTodoCompletion,
  bindTodoExpansion,
  bindTodoEdit,
  bindTodoEditForm,
};
