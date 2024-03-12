import { mainEl, themeEl } from './DOM-Vendor';
import { setStorageData } from './storage';
import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';

export function applyTheme(className, storageKey, iconPath) {
  mainEl.className = className;
  setStorageData('theme', storageKey);
  themeEl.src = iconPath;
}

export function toggleTheme() {
  if (mainEl.classList.contains('dark')) {
    applyTheme('main', 'light', moonIcon);
  } else {
    applyTheme('main dark', 'dark', sunIcon);
  }
}
