import "./styles.css";
import { createTodo } from "./modules/Todo.js";
import {
    getProjects, 
    getActiveProject, 
    addProject, 
    addTodoToProject,
} from "./modules/todoApp.js";

console.log(getProjects());

const studyProject = addProject("Study", "Programming tasks");

const todo1 = createTodo(
    "Study modules",
    "Review ES modules and imports",
    "2026-06-05",
    "high"
);

addTodoToProject(studyProject.id, todo1);

console.log(getProjects());
console.log(getActiveProject());