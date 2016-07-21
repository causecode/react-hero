declare interface String {
    capitalize(): string;
}

declare interface Function {
    name: string;
}

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare interface Window {
    devToolsExtension: any;
}
