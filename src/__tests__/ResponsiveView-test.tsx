import {DeviceTypes} from '../components/ResponsiveView';
jest.unmock('../components/ResponsiveView');
import {ResponsiveView} from '../components/ResponsiveView';
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

describe('Test Device Types enum', () => {

    it('gets the device type data', () => {

        expect(DeviceTypes.DESKTOP.getName()).toBe('default');
        expect(DeviceTypes.TABLET.getName()).toBe('tablet');
        expect(DeviceTypes.TABLET_PORTRAIT.getName()).toBe('tabletportrait');
        expect(DeviceTypes.TABLET_LANDSCAPE.getName()).toBe('tabletlandscape');
        expect(DeviceTypes.MOBILE.getName()).toBe('mobile');
        expect(DeviceTypes.MOBILE_PORTRAIT.getName()).toBe('mobileportrait');
        expect(DeviceTypes.MOBILE_LANDSCAPE.getName()).toBe('mobilelandscape');

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

});

// TODO write test cases for getCurrentDevice, isMobile, isDeskTop, isTablet, ResponsiveViews.

/*describe('Test Responsive View', () => {
    class ResponsiveViewImpl extends  ResponsiveView<{}, {}> {

        constructor() {
            super();
        }

        renderDefault() {
            return (<div></div>);
        }
    }

    it('checks if the responsive component has been rendered into the DOM', () => {
        expect(TestUtils.renderIntoDocument(<ResponsiveViewImpl />))
                .toThrow(new Error('No matching device for the given identifier.'));
    });

});*/
