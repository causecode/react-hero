export interface ICommandLineArguments {
    modelPath?: string;
    resource?: string;
    onCancel?: string;
    development?: string;
}

let commandLine: ICommandLineArguments = ((argv: string[]) => {

    let InvalidCommandError = (optionName: string) => new Error(`--${optionName} option not specified`);    
    
    if (argv.indexOf('--modelPath') === -1) {
        throw InvalidCommandError('modelPath');
    }
    
    if (argv.indexOf('--resource') === -1) {
        throw InvalidCommandError('resource');
    }
    
    if (argv.indexOf('--onCancel') === -1) {
        throw InvalidCommandError('onCancel');
    }

    let flags = argv
            .slice(1, argv.length)
            .filter((value) => value.indexOf('--') > -1);

    let argumentMap = {};

    flags.forEach((flag: string) => {
        if (flag.indexOf('--') > -1) {
            argumentMap[flag.slice(2)] = argv[argv.indexOf(flag) + 1];
        }
    });

    return argumentMap;

})(process.argv);

export {commandLine};
