const { exec, spawn } = require('child_process');

const log = (string: string, color: number) => console.log(`\x1b[${color}m%s\x1b[0m`, string);

const spawnKeep = (command: string, args: string[], cwd: string, color: number): any => {
    log(`${command} ${args.join(' ')}`, color);
    const process = spawn(command, args, { cwd: cwd });
    process.stdout.on('data', (data: any) => log(`${data.toString()}`, color));
    process.stderr.on('data', (data: any) => log(`${data.toString()}`, color));
    return process;
};

const spawnPromise = (command: string, args: string[], cwd: string, color: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const process = spawnKeep(command, args, cwd, color);
        process.on('exit', (code: number) => code === 0 ? resolve() : reject());
        process.on('error', reject);
    });
}

const appColor = 36;
const seleniumColor = 35;
const buildColor = 32;

const app = spawnKeep('http-server', ['dist', '-s', '-p', '9000'], '.', appColor);
const selenium = spawnKeep('webdriver-manager', ['start', '--quiet'], '.', seleniumColor);
const cleanup = (error?: number): Promise<number> => {
    return spawnPromise('kill', [app.pid], '.', appColor)
        .then(() => spawnPromise('pkill', ['-P', selenium.pid], '.', seleniumColor))
        .then(() => error);
}

spawnPromise('rimraf', ['./dist'], 'e2e', buildColor)
    .then(() => spawnPromise('tslint', ['-p', '.'], 'e2e', buildColor))
    .then(() => spawnPromise('tsc', ['-p', './tsconfig.json'], 'e2e', buildColor))
    .then(() => spawnPromise('protractor', ['./config/protractor.conf'], '.', 0))
    .then(() => cleanup())
    .catch((error) => cleanup(error))
    .catch((error) => process.exit(error));
