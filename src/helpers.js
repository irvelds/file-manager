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

export const isExistPath = async (path) => {
    try {
        await stat(path);
        return true;
    } catch {
        return false;
    }
}