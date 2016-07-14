import * as TestUtils from 'react-addons-test-utils';
import {NavMenuLauncherIcon} from '../src/components/NavMenuLauncherIcon';
import {initializeTestCase, IInitializerData} from './initializeTestCase';
import * as React from 'react';
import {INavMenuLauncherIconProps} from '../src/components/NavMenuLauncherIcon';

describe('Test NavMenuLauncherIcon', () => {
    let onClick: jest.Mock<Function>;

    beforeEach(() => {
        onClick = jest.fn<Function>();
    });

    it('renders a simple NavMenuLauncherIcon', () => {
        let icon: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <NavMenuLauncherIcon position="left" onClick={onClick}/>
        );

        expect(icon).toBeTruthy();
        let innerIcon = TestUtils.findRenderedDOMComponentWithClass(icon, 'float-left');
        expect(innerIcon).toBeTruthy();
        TestUtils.Simulate.click(innerIcon);
        expect(onClick).toBeCalled();
    });

    it('renders a NavMenuLauncherIcon with position set to right', () => {
        let icon: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
        <NavMenuLauncherIcon position="right" onClick={onClick}/>
        );

        expect(icon).toBeTruthy();
        let innerIcon: Element = TestUtils.findRenderedDOMComponentWithClass(icon, 'float-right');
        expect(innerIcon).toBeTruthy();
        TestUtils.Simulate.click(innerIcon);
        expect(onClick).toBeCalled();

    });

    it('renders a NavMenuLauncherIcon without any props', () => {
        let icon: React.Component<INavMenuLauncherIconProps, {}> & {props: {onClick: Function}} = TestUtils
                .renderIntoDocument<React.Component<INavMenuLauncherIconProps, {}>>(
        <NavMenuLauncherIcon />
        );

        expect(icon).toBeTruthy();
        expect(icon).toBeTruthy();
        let innerIcon: Element = TestUtils.findRenderedDOMComponentWithClass(icon, 'float-left');
        expect(innerIcon).toBeTruthy();
        expect(icon.props.onClick.toString()).toEqual((() => {}).toString());
    });

});
