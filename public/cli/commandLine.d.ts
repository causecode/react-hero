export interface ICommandLineArguments {
    modelPath?: string;
    modelName?: string;
    onCancel?: string;
    development?: string;
}
declare let commandLine: ICommandLineArguments;
export { commandLine };
