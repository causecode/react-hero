declare interface String {
    capitalize(): string;
    decapitalize(): string;
}

declare interface Function {
    name: string;
}

declare interface NodeRequire {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

declare interface Object {
    each: (callback: (key: string, value: any) => void) => void;
}

declare var require: NodeRequire;

declare interface Window {
    devToolsExtension: any;
}
