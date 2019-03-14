/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../interfaces';
export interface IFooterViewProps {
    style?: CSS;
    isSticky?: boolean;
}
export declare class FooterView extends React.Component<IFooterViewProps, {}> {
    render(): JSX.Element;
}
