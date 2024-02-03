import { state, exitCommand, msg } from '../helpers.js';
import { readdir } from 'fs/promises';

export const lsFiles = async () => {
  try {
    const files = await readdir(state.currentDir, { withFileTypes: true });
    const list = [];

    files.forEach(file => {
        list.push({
          name: file.name,
          type: file.isFile() ? 'file' : 'directory',
        });
    });

    list.sort((obj1, obj2) => obj1.name.localeCompare(obj2.name));
    list.sort((obj1, obj2) => obj1.type.localeCompare(obj2.type));

    console.table(list);

  } catch {
    console.log(msg.OPERATION_FAILED);
  }
  finally {
    exitCommand();
  }
};