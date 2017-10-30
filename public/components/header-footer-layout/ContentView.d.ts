/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../interfaces';
export interface IContentViewProps {
    style?: CSS;
}
export declare class ContentView extends React.Component<IContentViewProps, {}> {
    render(): JSX.Element;
}
export declare const contentStyle: CSS;
