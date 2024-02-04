import { homedir } from 'os';
import { stat } from 'fs/promises';

const USERNAME_KEY = '--username=';

export const msg = {
    WELCOME_MSG: 'Welcome to the File Manager',
    CURRENT_DIR_MSG: 'You are currently in',
    OPERATION_FAILED: 'Operation failed',
    ENTER_COMMAND_MSG: 'Enter the command',
    INVALID_INPUT: 'Invalid input'
}

export const state = {
    currentDir: homedir(),
    userName: '',
}

export const getUseName = () => {
    state.userName =
        (process.argv.length > 2 && process.argv[2].includes(USERNAME_KEY))
            ? process.argv[2].replace(USERNAME_KEY, '')
            : 'unknown';
    console.log(`${msg.WELCOME_MSG}, ${state.userName}!`);
    exitCommand();
    enterCommand();
};

export function exitCommand() {
    console.log(`${msg.CURRENT_DIR_MSG} ${state.currentDir}`);
}

export function enterCommand() {
    console.log(`${msg.ENTER_COMMAND_MSG}`);
}

export const exitProgram = (userName) => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
}


export const getArgs = (args) => {
    const argsArray = [];
    let joinPath = '';
    args.split(' ')
        .forEach((arg) => {
            if (!arg) return;
            return argsArray.push(arg);
        });

    if (argsArray.length > 2) {
        joinPath = argsArray.join(' ').slice(argsArray[0].length + 1);
    }
    else joinPath = argsArray[1];
    return { argsArray, joinPath }
};


export const isExistPath = async (path) => {
    try {
        await stat(path);
        return true;
    } catch {
        return false;
    }
}