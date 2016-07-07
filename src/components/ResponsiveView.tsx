import * as React from 'react';

export class DeviceTypes {

    static DESKTOP: DeviceTypes = new DeviceTypes(0, 'default');
    static TABLET: DeviceTypes = new DeviceTypes(1, 'tablet');
    static TABLET_PORTRAIT: DeviceTypes = new DeviceTypes(2, 'tabletportrait');
    static TABLET_LANDSCAPE: DeviceTypes = new DeviceTypes(3, 'tabletlandscape');
    static MOBILE: DeviceTypes = new DeviceTypes(4, 'mobile');
    static MOBILE_PORTRAIT: DeviceTypes = new DeviceTypes(5, 'mobileportrait');
    static MOBILE_LANDSCAPE: DeviceTypes = new DeviceTypes(6, 'mobilelandscape');

    private static allDeviceTypes = [
        DeviceTypes.MOBILE,
        DeviceTypes.MOBILE_PORTRAIT,
        DeviceTypes.MOBILE_LANDSCAPE,
        DeviceTypes.TABLET,
        DeviceTypes.TABLET_PORTRAIT,
        DeviceTypes.TABLET_LANDSCAPE,
        DeviceTypes.DESKTOP
    ];

    constructor(public id: number, public name: string) {
        if (DeviceTypes.allDeviceTypes && DeviceTypes.allDeviceTypes.length) {
            throw new Error(`Error: Instantiation Failed: Trying to create a new instance of DeviceTypes. Please use
                    one of the predefined Device types.`);
        }
        this.id = id;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getId(): number {
        return this.id;
    }

    static isMobile(): boolean {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('mobile') > 0;
    }

    static isTablet(): boolean {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('tablet') > 0;
    }

    static isDesktop(): boolean {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('default') > 0;
    }

    static getCurrentDevice(): DeviceTypes {
        let indicator: HTMLElement = document.createElement('div');
        indicator.className = 'state-indicator';
        document.body.appendChild(indicator);
        let deviceId: number = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);
        document.body.removeChild(indicator);
        return DeviceTypes.getDeviceTypeFromIdOrString(deviceId);
    }

    static getDeviceTypeFromIdOrString( identifier: number | string) {

        if (typeof identifier === 'string') {
            identifier = (identifier as string).toLowerCase();
        }

        for (let deviceType of DeviceTypes.allDeviceTypes) {
            if (deviceType.getId() === identifier || deviceType.getName() === identifier) {
                return deviceType;
            }
        }
        throw new Error('No matching device for the given identifier.');
    }
}

export interface IResponsiveView {
    renderDefault() : JSX.Element;
    renderMobile?() : JSX.Element;
    renderMobilePortrait?() : JSX.Element;
    renderMobileLandscape?() : JSX.Element;
    renderTablet?() : JSX.Element;
    renderTabletPortrait?() : JSX.Element;
    renderTabletLandscape?() : JSX.Element;
}

// TODO call renderTablet if only renderTabletPortrait is defined and not renderTablet. Same goes for mobile.
export abstract class ResponsiveView<P, S> extends React.Component<P, S> {

    constructor() {
        super();
    }

    render() {
        let currentDeviceType: DeviceTypes = DeviceTypes.getCurrentDevice();
        let deviceSpecificRenderFunction: string = `render${currentDeviceType.getName().capitalize()}`;
        return (
            <div>
                {this[deviceSpecificRenderFunction]()}
            </div>
        );
    }

    protected abstract renderDefault(): JSX.Element;

    protected renderMobile(): JSX.Element {
        return this.renderDefault();
    }

    protected renderMobilePortrait(): JSX.Element {
        return this.renderMobile();
    }

    protected renderMobileLandscape(): JSX.Element {
        return this.renderMobile();
    }

    protected renderTablet(): JSX.Element {
        return this.renderDefault();
    }

    protected renderTabletPortrait(): JSX.Element {
        return this.renderTablet();
    }

    protected renderTabletLandscape(): JSX.Element {
        return this.renderTablet();
    }
}

