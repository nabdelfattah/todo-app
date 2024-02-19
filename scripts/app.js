import { themeEl } from './DOM-Vendor';
import { getStorageData } from './storage';
import { toggleTheme, applyTheme } from './theme';

const theme = getStorageData('theme');
if (!theme || theme == 'light') {
  applyTheme('main', 'light', '../images/icon-moon.svg');
} else {
  applyTheme('main dark', 'dark', '../images/icon-sun.svg');
}

themeEl.addEventListener('click', toggleTheme);
