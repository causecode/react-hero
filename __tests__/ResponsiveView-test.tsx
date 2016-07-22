import {DeviceTypes} from '../src/components/ResponsiveView';
jest.unmock('../src/components/ResponsiveView');
import {ResponsiveView} from '../src/components/ResponsiveView';
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import mock = jest.mock;

describe('Test Device Types enum', () => {
    let mockWindow: (propertyValue: number) => {}, oldGetComputedStyle: typeof window.getComputedStyle;
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

    it('gets the device type data', () => {

        expect(DeviceTypes.DESKTOP.getName()).toBe('default');
        expect(DeviceTypes.TABLET.getName()).toBe('tablet');
        expect(DeviceTypes.TABLET_PORTRAIT.getName()).toBe('tabletPortrait');
        expect(DeviceTypes.TABLET_LANDSCAPE.getName()).toBe('tabletLandscape');
        expect(DeviceTypes.MOBILE.getName()).toBe('mobile');
        expect(DeviceTypes.MOBILE_PORTRAIT.getName()).toBe('mobilePortrait');
        expect(DeviceTypes.MOBILE_LANDSCAPE.getName()).toBe('mobileLandscape');

        expect(DeviceTypes.DESKTOP.getId()).toBe(0);
        expect(DeviceTypes.TABLET.getId()).toBe(1);
        expect(DeviceTypes.TABLET_PORTRAIT.getId()).toBe(2);
        expect(DeviceTypes.TABLET_LANDSCAPE.getId()).toBe(3);
        expect(DeviceTypes.MOBILE.getId()).toBe(4);
        expect(DeviceTypes.MOBILE_PORTRAIT.getId()).toBe(5);
        expect(DeviceTypes.MOBILE_LANDSCAPE.getId()).toBe(6);

    });

    it('gets the device type from id or string', () => {

        expect(DeviceTypes.getDeviceTypeFromIdOrString(0)).toEqual(DeviceTypes.DESKTOP);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('Default')).toEqual(DeviceTypes.DESKTOP);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('deFault')).toEqual(DeviceTypes.DESKTOP);

        expect(DeviceTypes.getDeviceTypeFromIdOrString(1)).toEqual(DeviceTypes.TABLET);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('Tablet')).toEqual(DeviceTypes.TABLET);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('tabLet')).toEqual(DeviceTypes.TABLET);

        expect(DeviceTypes.getDeviceTypeFromIdOrString(2)).toEqual(DeviceTypes.TABLET_PORTRAIT);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('TabletPortrait')).toEqual(DeviceTypes.TABLET_PORTRAIT);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('tabletPOrtrait')).toEqual(DeviceTypes.TABLET_PORTRAIT);

        expect(DeviceTypes.getDeviceTypeFromIdOrString(3)).toEqual(DeviceTypes.TABLET_LANDSCAPE);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('TabletLandscape')).toEqual(DeviceTypes.TABLET_LANDSCAPE);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('tabletlAndscape')).toEqual(DeviceTypes.TABLET_LANDSCAPE);

        expect(DeviceTypes.getDeviceTypeFromIdOrString(4)).toEqual(DeviceTypes.MOBILE);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('Mobile')).toEqual(DeviceTypes.MOBILE);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('mobiLe')).toEqual(DeviceTypes.MOBILE);

        expect(DeviceTypes.getDeviceTypeFromIdOrString(5)).toEqual(DeviceTypes.MOBILE_PORTRAIT);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('MobilePortrait')).toEqual(DeviceTypes.MOBILE_PORTRAIT);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('mobilepOrtrait')).toEqual(DeviceTypes.MOBILE_PORTRAIT);

        expect(DeviceTypes.getDeviceTypeFromIdOrString(6)).toEqual(DeviceTypes.MOBILE_LANDSCAPE);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('MobileLandscape')).toEqual(DeviceTypes.MOBILE_LANDSCAPE);
        expect(DeviceTypes.getDeviceTypeFromIdOrString('mobilelAndscape')).toEqual(DeviceTypes.MOBILE_LANDSCAPE);

    });

    it('gets the current device', () => {
        mockWindow(0);
        expect(DeviceTypes.getCurrentDevice()).toBe(DeviceTypes.DESKTOP);

        mockWindow(1);
        expect(DeviceTypes.getCurrentDevice()).toBe(DeviceTypes.TABLET);

        mockWindow(2);
        expect(DeviceTypes.getCurrentDevice()).toBe(DeviceTypes.TABLET_PORTRAIT);

        mockWindow(3);
        expect(DeviceTypes.getCurrentDevice()).toBe(DeviceTypes.TABLET_LANDSCAPE);

        mockWindow(4);
        expect(DeviceTypes.getCurrentDevice()).toBe(DeviceTypes.MOBILE);

        mockWindow(5);
        expect(DeviceTypes.getCurrentDevice()).toBe(DeviceTypes.MOBILE_PORTRAIT);

        mockWindow(6);
        expect(DeviceTypes.getCurrentDevice()).toBe(DeviceTypes.MOBILE_LANDSCAPE);

        mockWindow(7);
        expect(() => DeviceTypes.getCurrentDevice()).toThrow(new Error('No matching device for the given identifier.'));
    });

    it('checks if currentDevice is a Mobile Device', () => {
        mockWindow(0);
        expect(DeviceTypes.isMobile()).toEqual(false);

        mockWindow(1);
        expect(DeviceTypes.isMobile()).toEqual(false);

        mockWindow(2);
        expect(DeviceTypes.isMobile()).toEqual(false);

        mockWindow(3);
        expect(DeviceTypes.isMobile()).toEqual(false);

        mockWindow(4);
        expect(DeviceTypes.isMobile()).toEqual(true);

        mockWindow(5);
        expect(DeviceTypes.isMobile()).toEqual(true);

        mockWindow(6);
        expect(DeviceTypes.isMobile()).toEqual(true);
    });

    it('checks if currentDevice is a Tablet Device', () => {
        mockWindow(0);
        expect(DeviceTypes.isTablet()).toEqual(false);

        mockWindow(1);
        expect(DeviceTypes.isTablet()).toEqual(true);

        mockWindow(2);
        expect(DeviceTypes.isTablet()).toEqual(true);

        mockWindow(3);
        expect(DeviceTypes.isTablet()).toEqual(true);

        mockWindow(4);
        expect(DeviceTypes.isTablet()).toEqual(false);

        mockWindow(5);
        expect(DeviceTypes.isTablet()).toEqual(false);

        mockWindow(6);
        expect(DeviceTypes.isTablet()).toEqual(false);
    });

    it('checks if currentDevice is a Desktop Device', () => {
        mockWindow(0);
        expect(DeviceTypes.isDesktop()).toEqual(true);

        mockWindow(1);
        expect(DeviceTypes.isDesktop()).toEqual(false);

        mockWindow(2);
        expect(DeviceTypes.isDesktop()).toEqual(false);

        mockWindow(3);
        expect(DeviceTypes.isDesktop()).toEqual(false);

        mockWindow(4);
        expect(DeviceTypes.isDesktop()).toEqual(false);

        mockWindow(5);
        expect(DeviceTypes.isDesktop()).toEqual(false);

        mockWindow(6);
        expect(DeviceTypes.isDesktop()).toEqual(false);
    });

});

// TODO write test cases for getCurrentDevice, isMobile, isDeskTop, isTablet, ResponsiveViews.

describe('Test Responsive View', () => {

    let mockWindow: (propertyValue: number) => {}, oldGetComputedStyle: typeof window.getComputedStyle;
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

    class ResponsiveViewImpl extends  ResponsiveView<{}, {}> {

        constructor() {
            super();
        }

        renderDefault() {
            return (<div>Default</div>);
        }

        renderMobile(): JSX.Element {
            return (<div>Mobile</div>);
        }

        renderMobilePortrait(): JSX.Element {
            return (<div>Mobile Portrait</div>);
        }

        renderMobileLandscape(): JSX.Element {
            return (<div>Mobile Landscape</div>);
        }

        renderTablet(): JSX.Element {
            return (<div>Tablet</div>);
        }

        renderTabletPortrait(): JSX.Element {
            return (<div>Tablet Portrait</div>);
        }

        renderTabletLandscape(): JSX.Element {
            return (<div>Tablet Landscape</div>);
        }
    }

    it('checks if the responsive component has been rendered into the DOM without mocking window', () => {
        expect(() => TestUtils.renderIntoDocument(<ResponsiveViewImpl />))
                .toThrow(new Error('No matching device for the given identifier.'));
    });

    describe('Test Responsive View with the mocked window', () => {

        it('renders in Desktop device', () => {
            mockWindow(0);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe('Default');
        });

        it('renders in Desktop device', () => {
            mockWindow(1);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe('Tablet');
        });

        it('renders in Desktop device', () => {
            mockWindow(2);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe('Tablet Portrait');
        });

        it('renders in Desktop device', () => {
            mockWindow(3);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe('Tablet Landscape');
        });

        it('renders in Desktop device', () => {
            mockWindow(4);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe('Mobile');
        });

        it('renders in Desktop device', () => {
            mockWindow(5);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe('Mobile Portrait');
        });

        it('renders in Desktop device', () => {
            mockWindow(6);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <ResponsiveViewImpl />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toBe('Mobile Landscape');
        });
    });

        describe('renders a Responsive View with the render Desktop, Mobile and Tablet functions defined', () => {
            class TestView extends ResponsiveView<{}, {}> {

                protected renderDefault(): JSX.Element {
                    return (<div>Default</div>);
                }

                protected renderMobile() : JSX.Element {
                    return (<div>Mobile</div>);
                }

                protected renderTablet(): JSX.Element {
                return (<div>Tablet</div>);
            }

            }

            it('renders on Desktop device', () => {
                mockWindow(0);
                let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
            });

            it('renders on Tablet device', () => {
                mockWindow(1);
                let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Tablet');
            });

            it('renders on Tablet Portrait device', () => {
                mockWindow(2);
                let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Tablet');
            });

            it('renders on Tablet Landscape device', () => {
                mockWindow(3);
                let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Tablet');
            });

            it('renders on Mobile device', () => {
                mockWindow(4);
                let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Mobile');
            });

            it('renders on Mobile Portrait device', () => {
                mockWindow(5);
                let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Mobile');
            });

            it('renders on Mobile Landscape device', () => {
                mockWindow(6);
                let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                    <TestView />
                );
                expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Mobile');
            });
        });

    describe('renders a Responsive View with only renderDefault function', () => {
        class DefaultView extends ResponsiveView<{}, {}> {

            protected renderDefault(): JSX.Element {
                return (<div>Default</div>);
            }

        }

        it('renders on Desktop device', () => {
            mockWindow(0);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
        });

        it('renders on Tablet device', () => {
            mockWindow(1);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
        });

        it('renders on Tablet Portrait device', () => {
            mockWindow(2);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
        });

        it('renders on Tablet Landscape device', () => {
            mockWindow(3);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
        });

        it('renders on Mobile device', () => {
            mockWindow(4);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
        });

        it('renders on Mobile Portrait device', () => {
            mockWindow(5);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
        });

        it('renders on Mobile Landscape device', () => {
            mockWindow(6);
            let view: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <DefaultView />
            );
            expect(TestUtils.scryRenderedDOMComponentsWithTag(view, 'div')[0].textContent).toEqual('Default');
        });

    });



});
