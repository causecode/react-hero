/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../../interfaces';
export interface ISecondarySliderNavProps {
    style?: CSS;
    onNavClose?: () => void;
}
export declare class SecondarySliderNav extends React.Component<ISecondarySliderNavProps, {}> {
    render(): JSX.Element;
}