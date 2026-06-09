const STORAGE_KEY = "todoAppData";

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return null;

  return JSON.parse(savedData);
}

export { saveData, loadData };
