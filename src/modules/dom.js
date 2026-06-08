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
    const projectButton = document.createElement("button");
    projectButton.textContent = project.title;
    projectButton.dataset.projectId = project.id;
    aside.append(projectButton);
  }
}

function renderTodos(project) {
  clearElement(todoList);

  for (const todo of project.todos) {
    const card = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate;

    const priority = document.createElement("p");
    priority.textContent = todo.priority;

    card.append(title, dueDate, priority);
    todoList.append(card);
  }
}

function renderApp(projects, activeProject) {
  title.textContent = activeProject.title;
  renderProjects(projects);
  renderTodos(activeProject);
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

export {
  renderProjects,
  renderTodos,
  renderApp,
  bindProjectSelection,
  bindProjectForm,
  bindTodoForm,
};
