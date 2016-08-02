export interface IAppServiceConfig {
    alertType?: string;
    alertTimeOut?: number;
}
export declare class AppService {
    defaultConfig: IAppServiceConfig;
    constructor();
    setDefaults(overrideConfig: IAppServiceConfig): void;
}
