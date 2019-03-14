/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../../interfaces';
export interface ISliderNavProps {
    isPrimaryNav: boolean;
    primaryNavOpen?: boolean;
    secondaryNavOpen?: boolean;
    toggleNavHandler?: () => void;
    toggleSecondaryNavHandler?: () => void;
    onPrimaryNavClose?: () => void;
    onSecondaryNavClose?: () => void;
    navContent?: JSX.Element;
    navStyle?: CSS;
    setPrimaryNav?: (visibilityStatus: boolean) => void;
    setSecondaryNav?: (visibilityStatus: boolean) => void;
    primaryNavCount?: number;
    secondaryNavCount?: number;
}
export declare class SliderNavImpl extends React.Component<ISliderNavProps> {
    constructor(props: any);
    checkRender: () => boolean;
    render(): JSX.Element;
}
export declare const SliderNav: any;