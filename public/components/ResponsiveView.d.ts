import * as React from 'react';
import '../init';
export declare class DeviceTypes {
    id: number;
    name: string;
    static DESKTOP: DeviceTypes;
    static TABLET: DeviceTypes;
    static TABLET_PORTRAIT: DeviceTypes;
    static TABLET_LANDSCAPE: DeviceTypes;
    static MOBILE: DeviceTypes;
    static MOBILE_PORTRAIT: DeviceTypes;
    static MOBILE_LANDSCAPE: DeviceTypes;
    private static allDeviceTypes;
    constructor(id: number, name: string);
    getName(): string;
    getId(): number;
    static isMobile(): boolean;
    static isTablet(): boolean;
    static isDesktop(): boolean;
    static getCurrentDevice(): DeviceTypes;
    static getDeviceTypeFromIdOrString(identifier: number | string): DeviceTypes;
}
export interface IResponsiveView {
    renderDefault(): JSX.Element;
    renderMobile?(): JSX.Element;
    renderMobilePortrait?(): JSX.Element;
    renderMobileLandscape?(): JSX.Element;
    renderTablet?(): JSX.Element;
    renderTabletPortrait?(): JSX.Element;
    renderTabletLandscape?(): JSX.Element;
}
export declare abstract class ResponsiveView<P, S> extends React.Component<P, S> {
    render(): JSX.Element;
    protected abstract renderDefault(): JSX.Element;
    protected renderMobile(): JSX.Element;
    protected renderMobilePortrait(): JSX.Element;
    protected renderMobileLandscape(): JSX.Element;
    protected renderTablet(): JSX.Element;
    protected renderTabletPortrait(): JSX.Element;
    protected renderTabletLandscape(): JSX.Element;
}
