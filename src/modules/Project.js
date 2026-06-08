function createProject(title, description = "") {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    todos: [],
  };
}

export { createProject };
