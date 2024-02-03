import { goToDir } from './cd.js';
export const goToUpDir = async () => {
  await goToDir('..');
}