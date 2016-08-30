declare module process {
    export module env {
        let NODE_ENV: string;
    }
}

export function getEnvironment(): string {
    return process.env.NODE_ENV;
}

export interface IAppServiceConfig {
    alertType?: string;
    alertTimeOut?: number;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
