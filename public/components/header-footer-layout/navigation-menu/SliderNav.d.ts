/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../../interfaces';
export interface ISliderNavProps {
    isPrimaryNav: boolean;
    primaryNavOpen?: boolean;
    secondaryNavOpen?: boolean;
    toggleNav?: () => void;
    toggleSecondaryNav?: () => void;
    navContent?: JSX.Element;
    navStyle?: CSS;
    setPrimaryNav?: (visibilityStatus: boolean) => void;
    setSecondaryNav?: (visibilityStatus: boolean) => void;
    primaryNavCount?: number;
    secondaryNavCount?: number;
}
export declare class SliderNavImpl extends React.Component<ISliderNavProps, void> {
    constructor(props: any);
    checkRender: () => boolean;
    render(): JSX.Element;
}
export declare const SliderNav: any;
