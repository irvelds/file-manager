import readlinePromises from 'readline/promises';
import { exitCommand, state, exitProgram, msg } from '../helpers.js';
import { lsFiles } from './ls.js';
import { readFile } from './cat.js';
import { goToDir } from './cd.js';
import { goToUpDir } from './up.js';
import { addFile } from './add.js';
import { renameFile } from './rn.js';
import { copyFile } from './cp.js';
import { removeFile } from './rm.js';
import { getCPUInfo, getHomeDir, getUserName, getArch, getEOL } from './osFn.js';
import { getHash } from './hash.js'
import { createBrotli } from './zlib.js'

export const readCommands = () => {
  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('SIGINT', () => {
    exitProgram(state.userName);
  });

  rl.on('line', async (line) => {
    const spaceIndex = line.indexOf(' ');
    let args =
      (spaceIndex !== -1)
        ? line.slice(spaceIndex).trim()
        : false;
    const command = line.slice(0, spaceIndex);
    if (['up', 'ls', '.exit'].includes(line)) {
      switch (line) {
        case 'up':
          await goToUpDir();
          break;
        case 'ls':
          await lsFiles();
          break;
        case '.exit':
          exitProgram(state.userName);
          break;
        default:
          console.log(msg.INVALID_INPUT);
          exitCommand();
      }
    }
    else if (command === 'os') {
      switch (args) {
        case '--EOL':
          getEOL();
          break;
        case '--cpus':
          getCPUInfo();
          break;
        case '--homedir':
          getHomeDir();
          break;
        case '--username':
          getUserName();
          break;
        case '--architecture':
          getArch();
          break;
        default:
          console.log(msg.INVALID_INPUT);
          exitCommand();
      }
    }
    else {
      switch (command) {
        case 'cd':
          await goToDir(args);
          break;
        case 'cat':
          await readFile(args);
          break;
        case 'add':
          await addFile(args);
          break;
        case 'rn':
          await renameFile(args);
          break;
        case 'cp':
          await copyFile(args);
          break;
        case 'mv':
          await copyFile(args, true);
          break;
        case 'rm':
          await removeFile(args);
          break;
        case 'hash':
          await getHash(args);
          break;
        case 'compress':
          await createBrotli(args, 'compress');
          break;
        case 'decompress':
          await createBrotli(args, 'decompress');
          break;
        default:
          console.log(msg.INVALID_INPUT);
          exitCommand();
      }
    }
  });

};

