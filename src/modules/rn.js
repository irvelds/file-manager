import { resolve } from 'path';
import { rename } from 'fs/promises';
import { state, exitCommand, msg } from '../helpers.js';

export const renameFile = async (args) => {
    const argsArray = [];
    args.split(' ')
        .forEach((arg) => {
            if (!arg) return;
            return argsArray.push(arg.replace(/"/g, '').replace(/\\+/g, '/'));
        });
    if(!argsArray[1]){
        console.log(msg.INVALID_INPUT);
        return;
    }
    try {
        const currentName = resolve(state.currentDir, argsArray[0]);
        const newName = resolve(state.currentDir, argsArray[1]);
        await rename(currentName, newName);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('No such file or directory');
        }
        console.log(msg.OPERATION_FAILED);
    }
    finally {
        exitCommand();
    }
};