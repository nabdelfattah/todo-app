import { mainEl, themeEl } from './DOM-Vendor';
import { setStorageData } from './storage';

export function applyTheme(className, storageKey, iconPath) {
  mainEl.className = className;
  setStorageData('theme', storageKey);
  themeEl.src = iconPath;
}

export function toggleTheme() {
  if (mainEl.classList.contains('dark')) {
    applyTheme('main', 'light', '../images/icon-moon.svg');
  } else {
    applyTheme('main dark', 'dark', '../images/icon-sun.svg');
  }
}
