import {DeviceTypes} from '../src/components/ResponsiveView';
jest.unmock('../src/components/ResponsiveView');
import {ResponsiveView} from '../src/components/ResponsiveView';
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {INSTANTIATION_ERROR} from '../src/constants';
const unroll: any = require<any>('unroll');

unroll.use(it);

const DesktopMockID = 0;
const TabletMockID = 1;
const TabletPortraitMockID = 2;
const TabletLandscapeMockID = 3;
const MobileMockID = 4;
const MobilePortraitMockID = 5;
const MobileLandscapeMockID = 6;
const InvalidMockID = 7;

const Desktop = 'default';
const Tablet = 'tablet';
const TabletPortrait = 'tabletPortrait';
const TabletLandscape = 'tabletLandscape';
const Mobile = 'mobile';
const MobilePortrait = 'mobilePortrait';
const MobileLandscape = 'mobileLandscape';

describe('Test Device Types enum', () => {
    let mockWindow: (propertyValue: number) => void, oldGetComputedStyle: typeof window.getComputedStyle;
    oldGetComputedStyle = window.getComputedStyle;

    beforeEach(() => {
        mockWindow = (propertyValue: number) => {
            window.getComputedStyle = (element: Element, pseudoElt?: string) => {
                return {
                    getPropertyValue: (propertyName: string) => { return propertyValue.toString(); }
                } as CSSStyleDeclaration;
            };
        };
    });

    afterEach(() => {
        window.getComputedStyle = oldGetComputedStyle;
    });

    unroll('tests the device type data for the device #expectedName', (done, testArgs) => {

        expect(testArgs.deviceType.getName()).toBe(testArgs.expectedName);
        expect(testArgs.deviceType.getId()).toBe(testArgs.expectedId);
        done();

    }, [
        ['deviceType', 'expectedName', 'expectedId'],
        [DeviceTypes.DESKTOP, Desktop, DesktopMockID],
        [DeviceTypes.TABLET, Tablet, TabletMockID],
        [DeviceTypes.TABLET_PORTRAIT, TabletPortrait, TabletPortraitMockID],
        [DeviceTypes.TABLET_LANDSCAPE, TabletLandscape, TabletLandscapeMockID],
        [DeviceTypes.MOBILE, Mobile, MobileMockID],
        [DeviceTypes.MOBILE_PORTRAIT, MobilePortrait, MobilePortraitMockID],
        [DeviceTypes.MOBILE_LANDSCAPE, MobileLandscape, MobileLandscapeMockID],
    ]);

    unroll('gets the device type from id or string for #deviceName', (done: Function, testArgs) => {

        expect(DeviceTypes.getDeviceTypeFromIdOrString(testArgs.deviceId)).toEqual(testArgs.deviceType);
        expect(DeviceTypes.getDeviceTypeFromIdOrString(testArgs.deviceName)).toEqual(testArgs.deviceType);
        expect(DeviceTypes.getDeviceTypeFromIdOrString(testArgs.deviceName.toUpperCase())).toEqual(testArgs.deviceType);
        done();

    }, [
        ['deviceId', 'deviceName', 'deviceType'],
        [DesktopMockID, Desktop, DeviceTypes.DESKTOP],
        [TabletMockID, Tablet, DeviceTypes.TABLET],
        [TabletPortraitMockID, TabletPortrait, DeviceTypes.TABLET_PORTRAIT],
        [TabletLandscapeMockID, TabletLandscape, DeviceTypes.TABLET_LANDSCAPE],
        [MobileMockID, Mobile, DeviceTypes.MOBILE],
        [MobilePortraitMockID, MobilePortrait, DeviceTypes.MOBILE_PORTRAIT],
        [MobileLandscapeMockID, MobileLandscape, DeviceTypes.MOBILE_LANDSCAPE]
    ]);

    unroll('gets the current device and checks whether it is equal to #device',
        (done, testArgs) => {

        mockWindow(testArgs.mockId);
        expect(DeviceTypes.getCurrentDevice()).toBe(testArgs.expectedDeviceType);
        done();

    }, [
        ['mockId', 'expectedDeviceType', 'device'],
        [DesktopMockID, DeviceTypes.DESKTOP, Desktop],
        [TabletMockID, DeviceTypes.TABLET, Tablet],
        [TabletPortraitMockID, DeviceTypes.TABLET_PORTRAIT, TabletPortrait],
        [TabletLandscapeMockID, DeviceTypes.TABLET_LANDSCAPE, TabletLandscape],
        [MobileMockID, DeviceTypes.MOBILE, Mobile],
        [MobilePortraitMockID, DeviceTypes.MOBILE_PORTRAIT, MobilePortrait],
        [MobileLandscapeMockID, DeviceTypes.MOBILE_LANDSCAPE, MobileLandscape],
    ]);

    it('checks if a device other than the ones specified is used', () => {

        mockWindow(InvalidMockID);
        expect(() => DeviceTypes.getCurrentDevice())
                .toThrow(new Error('No matching device for the given identifier.'));

    });

    it('tries to create a new Device Type', () => {
        expect(() => new DeviceTypes(10, 'newDevice')).toThrow(new Error(INSTANTIATION_ERROR));
    });

    unroll('checks device type in a #device device', (done, testArgs) => {

        mockWindow(testArgs.mockId);
        expect(DeviceTypes.isMobile()).toEqual(testArgs.isMobile);
        expect(DeviceTypes.isTablet()).toEqual(testArgs.isTablet);
        expect(DeviceTypes.isDesktop()).toEqual(testArgs.isDesktop);
        done();

    }, [
        ['mockId', 'device', 'isMobile', 'isTablet', 'isDesktop'],
        [DesktopMockID, Desktop, false, false, true],
        [TabletMockID, Tablet, false, true, false],
        [TabletPortraitMockID, TabletPortrait, false, true, false],
        [TabletLandscapeMockID, TabletLandscape, false, true, false],
        [MobileMockID, Mobile, true, false, false],
        [MobilePortraitMockID, MobilePortrait, true, false, false],
        [MobileLandscapeMockID, MobileLandscape, true, false, false],
    ]);

});

describe('Test Responsive View', () => {

    let mockWindow: (propertyValue: number) => {}, oldGetComputedStyle: typeof window.getComputedStyle;
    oldGetComputedStyle = window.getComputedStyle;

    beforeEach(() => {
        mockWindow = (propertyValue: number) => {
            window.getComputedStyle = (element: Element, pseudoElement?: string) => {
                return {
                    getPropertyValue: (propertyName: string) => { return propertyValue.toString(); }
                } as CSSStyleDeclaration;
            };
        };
    });

    afterEach(() => {
        window.getComputedStyle = oldGetComputedStyle;
    });

    class ResponsiveViewImpl extends  ResponsiveView<void, void> {

        renderDefault() {
            return (<div>{Desktop}</div>);
        }

        renderMobile(): JSX.Element {
            return (<div>{Mobile}</div>);
        }

        renderMobilePortrait(): JSX.Element {
            return (<div>{MobilePortrait}</div>);
        }

        renderMobileLandscape(): JSX.Element {
            return (<div>{MobileLandscape}</div>);
        }

        renderTablet(): JSX.Element {
            return (<div>{Tablet}</div>);
        }

        renderTabletPortrait(): JSX.Element {
            return (<div>{TabletPortrait}</div>);
        }

        renderTabletLandscape(): JSX.Element {
            return (<div>{TabletLandscape}</div>);
        }
    }

    it('checks if the responsive component has been rendered into the DOM without mocking window', () => {
        expect(() => TestUtils.renderIntoDocument(<ResponsiveViewImpl />))
                .toThrow(new Error('No matching device for the given identifier.'));
    });

    describe('Test Responsive View with the mocked window', () => {

        unroll('renders in #device device', (done, testArgs) => {
            mockWindow(testArgs.mockId);
            let view: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe(testArgs.device);
            done();
        }, [
            ['mockId', 'device'],
            [DesktopMockID, Desktop],
            [TabletMockID, Tablet],
            [TabletPortraitMockID, TabletPortrait],
            [TabletLandscapeMockID, TabletLandscape],
            [MobileMockID, Mobile],
            [MobilePortraitMockID, MobilePortrait],
            [MobileLandscapeMockID, MobileLandscape]
        ]);

        it('renders Responsive View directly', () => {
            mockWindow(DesktopMockID);

            let view: ResponsiveView<void, void> = TestUtils.renderIntoDocument<ResponsiveView<void, void>>(
                <ResponsiveView/>
            );

            expect(view).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div').length).toEqual(1);
        });

    });

        describe('renders a Responsive View with the render Desktop, Mobile and Tablet functions defined', () => {
            class TestView extends ResponsiveView<void, void> {

                protected renderDefault(): JSX.Element {
                    return (<div>{Desktop}</div>);
                }

                protected renderMobile() : JSX.Element {
                    return (<div>{Mobile}</div>);
                }

                protected renderTablet(): JSX.Element {
                return (<div>{Tablet}</div>);
            }

            }

            unroll('renders on #device device', (done, testArgs) => {
                mockWindow(testArgs.mockId);
                let view: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual(testArgs.device);
                done();
            }, [
                ['mockId', 'device'],
                [DesktopMockID, Desktop],
                [TabletMockID, Tablet],
                [TabletPortraitMockID, Tablet],
                [TabletLandscapeMockID, Tablet],
                [MobileMockID, Mobile],
                [MobilePortraitMockID, Mobile],
                [MobileLandscapeMockID, Mobile]
            ]);

        });

    describe('renders a Responsive View with only renderDefault function', () => {
        class DefaultView extends ResponsiveView<void, void> {

            protected renderDefault(): JSX.Element {
                return (<div>Default</div>);
            }

        }

        unroll('renders on #device device', (done, testArgs) => {
            mockWindow(testArgs.mockId);
            let view: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
            done();
        }, [
            ['mockId', 'device'],
            [DesktopMockID, Desktop],
            [TabletMockID, Tablet],
            [TabletPortraitMockID, TabletPortrait],
            [TabletLandscapeMockID, TabletLandscape],
            [MobileMockID, Mobile],
            [MobilePortraitMockID, MobilePortrait],
            [MobileLandscapeMockID, MobileLandscape]
        ]);

    });

});
