export interface ICommandLineArguments {
    modelPath?: string;
    resource?: string;
    onCancel?: string;
    development?: string;
}

let InvalidCommandError = (optionName: string) => new Error(`--${optionName} option not specified`);    
let commandLine: ICommandLineArguments = ((argv: string[]) => {
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

export {commandLine, InvalidCommandError};
