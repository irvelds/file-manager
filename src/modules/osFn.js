import { homedir, userInfo, arch, EOL } from 'os';
import { exitCommand } from '../helpers.js';
import cores from 'os';

export const getCPUInfo = () => {
  const cpusData = cores.cpus();
  const cpuTable = cpusData.map(({ model, speed }, index) => [
    index + 1,
    {
      model,
      speed: `${speed / 1000} GHz`,
    },
  ])
  console.log(`Number of Cpus: ${cpusData.length}`);
  console.table(Object.fromEntries(cpuTable));
  exitCommand();
};

export const getEOL = () => {
  console.log(JSON.stringify(EOL));
  exitCommand();
};

export const getHomeDir = () => {
  console.log(homedir());
  exitCommand();
};

export const getUserName = () => {
  console.log(userInfo().username);
  exitCommand();
};

export const getArch = () => {
  console.log(arch());
  exitCommand();
};