export function getStorageData(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setStorageData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
