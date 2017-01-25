export interface ICommandLineArguments {
    modelPath?: string;
    modelName?: string;
    onCancel?: string;
    development?: string;
}

let commandLine: ICommandLineArguments = ((argv: string[]) => {
    let flags: string[] = argv
            .slice(1, argv.length)
            .filter((value) => value.indexOf('--') > -1);

    let argumentMap: ICommandLineArguments = {};

    flags.forEach((flag: string) => {
        if (flag.indexOf('--') > -1) {
            argumentMap[flag.slice(2)] = argv[argv.indexOf(flag) + 1];
        }
    });

    return argumentMap;

})(process.argv);

export {commandLine};
