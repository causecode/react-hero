declare interface IFunction extends Function {
    name?: string;
}

declare interface String {
    capitalize(): string
}

declare type Stub = (...args: any[]) => void ;
