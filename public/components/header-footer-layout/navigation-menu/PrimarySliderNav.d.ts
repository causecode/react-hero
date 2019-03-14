/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../../interfaces';
export interface IPrimarySliderNavProps {
    style?: CSS;
    onNavClose?: () => void;
}
export declare class PrimarySliderNav extends React.Component<IPrimarySliderNavProps, {}> {
    render(): JSX.Element;
}
