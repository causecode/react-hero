/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../interfaces';
export interface IHeaderFooterLayoutProps {
    style?: CSS;
}
export declare class HeaderFooterLayout extends React.Component<IHeaderFooterLayoutProps, void> {
    render(): JSX.Element;
}
export declare const layoutStyle: CSS;
