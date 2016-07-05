
export interface IAppServiceConfig {
    alertType?: string;
    alertTimeOut?: number;
}

/*export module AppService {

    defaultConfig: IAppServiceConfig;

    constructor() {
        this.defaultConfig = {
            alertType: 'info',
            alertTimeOut: 1000
        };
    }

    /!**
     * Used to override the default alertType and alertTimeout used in the showAlertMessage method.
     * @param overrideConfig object with alertType and alertTimeout for the message
     *!/
    setDefaults(overrideConfig: IAppServiceConfig): void {
        (<any>Object).assign(this.defaultConfig, overrideConfig);
    }

}*/

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
