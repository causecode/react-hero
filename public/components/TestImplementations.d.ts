import * as React from 'react';
import { ResponsiveView } from "./ResponsiveView";
export declare class NewPage extends React.Component<any, any> {
    constructor();
    render(): JSX.Element;
}
export declare class HomeContent extends ResponsiveView<any, any> {
    protected renderDefault(): JSX.Element;
}
export declare class Page2Content extends ResponsiveView<any, any> {
    protected renderDefault(): JSX.Element;
}
export declare class ContentImpl extends ResponsiveView<any, any> {
    constructor();
    protected renderDefault(): JSX.Element;
    protected renderMobile(): JSX.Element;
    protected renderMobilePortrait(): JSX.Element;
    protected renderTabletLandscape(): JSX.Element;
}
