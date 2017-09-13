const { exec, spawn } = require('child_process');

const spawnKeep = (command: string, args: string[], cwd: string): any => {
    console.log(`${command} ${args.join(' ')}`);
    const process = spawn(command, args, { cwd });
    process.stdout.on('data', (data: any) => console.log(data.toString()));
    process.stderr.on('data', (data: any) => console.log(data.toString()));
    return process;
};

const spawnPromise = (command: string, args: string[], cwd: string)
    : Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const process = spawnKeep(command, args, cwd);
        process.on('exit', (code: number) => code === 0 ? resolve() : reject(code));
        process.on('error', reject);
    });
};

spawnPromise('rimraf', ['./dist'], 'e2e')
    .then(() => spawnPromise('tslint', ['-p', '.'], 'e2e'))
    .then(() => spawnPromise('tsc', ['-p', './tsconfig.json'], 'e2e'))
    .then(() => spawnPromise('protractor', ['./config/protractor.conf'], '.'))
    .catch(error => process.exit(error));
