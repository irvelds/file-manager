import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import { state, exitCommand, msg } from '../helpers.js';

export const addFile = async (arg) => {
    const targetPath = resolve(state.currentDir, arg);
    try {
        await writeFile(targetPath, "", { flag: 'wx' });
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.log('File alredy exist');
        }
        console.log(msg.OPERATION_FAILED);
    }
    finally {
        exitCommand();
    }
};