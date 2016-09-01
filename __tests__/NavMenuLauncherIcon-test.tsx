import * as TestUtils from 'react-addons-test-utils';
import {NavMenuLauncherIcon} from '../src/components/NavMenuLauncherIcon';
import {initializeTestCase, IInitializerData} from './../src/utils/initializeTestCase';
import * as React from 'react';
import {INavMenuLauncherIconProps} from '../src/components/NavMenuLauncherIcon';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test NavMenuLauncherIcon', () => {
    let onClick: jest.Mock<Function> = jest.fn<Function>();

    unroll('renders a simple NavMenuLauncherIcon', (done, testArgs) => {
        let { position } = testArgs;
        let icon: React.Component<INavMenuLauncherIconProps, void> =
            TestUtils.renderIntoDocument<React.Component<INavMenuLauncherIconProps, void>>(
                <NavMenuLauncherIcon position={position} onClick={onClick}/>
            );

        expect(icon).toBeTruthy();
        let innerIcon: Element = TestUtils.findRenderedDOMComponentWithClass(icon, `float-${position}`);
        expect(innerIcon).toBeTruthy();
        TestUtils.Simulate.click(innerIcon);
        expect(onClick).toBeCalled();
        done();
    }, [
        ['position'],
        ['left'],
        ['right'],
    ]);

    it('renders a NavMenuLauncherIcon without any props', () => {
        let icon: React.Component<INavMenuLauncherIconProps, void> =
        TestUtils.renderIntoDocument<React.Component<INavMenuLauncherIconProps, void>>(
            <NavMenuLauncherIcon />
        );

        expect(icon).toBeTruthy();
        let innerIcon: Element = TestUtils.findRenderedDOMComponentWithClass(icon, 'float-left');
        expect(innerIcon).toBeTruthy();
    });

});
