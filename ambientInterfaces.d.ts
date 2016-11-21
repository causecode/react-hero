declare interface String {
    capitalize(): string;
    decapitalize(): string;
}

declare interface Object {
    getNestedData(nestedPath: string): any;
}

declare interface Function {
    name: string;
}

declare interface NodeRequire {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

declare var require: NodeRequire;

declare interface Window {
    devToolsExtension: any;
}
