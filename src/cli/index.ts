const cliColors  = {
    bgBlack: '\x1b[40m',
    bgBlue: '\x1b[44m',
    bgCyan: '\x1b[46m',
    bgGreen: '\x1b[42m',
    bgMagenta: '\x1b[45m',
    bgRed: '\x1b[41m',
    bgWhite: '\x1b[47m',
    bgYellow: '\x1b[43m',

    blink: '\x1b[5m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',

    fgBlack: '\x1b[30m',
    fgBlue: '\x1b[34m',
    fgCyan: '\x1b[36m',
    fgGreen: '\x1b[32m',
    fgMagenta: '\x1b[35m',
    fgRed: '\x1b[31m',
    fgWhite: '\x1b[37m',
    fgYellow: '\x1b[33m',

    hidden: '\x1b[8m',
    reset: '\x1b[0m',
    reverse: '\x1b[7m',
    underscore: '\x1b[4m',
};

const cli = {
    colors: { ...cliColors },
    logColor: (color: string) => (...args: any) => console.log(color, ...args, cliColors.reset),
    success(...args: any) { return cli.logColor(cli.colors.fgGreen)(...args); },
    failed(...args: any) { return cli.logColor(cli.colors.fgRed)(...args); },
    neutral(...args: any) { return cli.logColor(cli.colors.fgBlue)(...args); },
};

export { cli };
