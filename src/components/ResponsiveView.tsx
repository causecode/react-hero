import * as React from 'react';

export class DeviceTypes {

	static DESKTOP: DeviceTypes = new DeviceTypes(0, 'Default');
	static TABLET: DeviceTypes = new DeviceTypes(1, 'Tablet');
	static TABLET_PORTRAIT: DeviceTypes = new DeviceTypes(2, 'TabletPortrait');
	static TABLET_LANDSCAPE: DeviceTypes = new DeviceTypes(3, 'TabletLandscape');
	static MOBILE: DeviceTypes = new DeviceTypes(4, 'Mobile');
	static MOBILE_PORTRAIT: DeviceTypes = new DeviceTypes(5, 'MobilePortrait');
	static MOBILE_LANDSCAPE: DeviceTypes = new DeviceTypes(6, 'MobileLandscape');

	private static allDeviceTypes = [
		DeviceTypes.MOBILE,
		DeviceTypes.MOBILE_PORTRAIT,
		DeviceTypes.MOBILE_LANDSCAPE,
		DeviceTypes.TABLET,
		DeviceTypes.TABLET_PORTRAIT,
		DeviceTypes.TABLET_LANDSCAPE,
		DeviceTypes.DESKTOP
	];

	constructor(public id, public name) {
		if (DeviceTypes.allDeviceTypes && DeviceTypes.allDeviceTypes.length) {
			throw new Error(`Error: Instantiation Failed: Trying to create a new instance of DeviceTypes. Please use
					one of the predefined Device types.`)
		}
		this.id = id;
		this.name = name;
	}

	getName() {
		return this.name;
	}

	getId() {
		return this.id;
	}

	static getCurrentDevice() {
		let indicator = document.createElement('div');
		indicator.className = 'state-indicator';
		document.body.appendChild(indicator);
		let deviceId = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);
		return DeviceTypes.getDeviceTypeFromIdOrString(deviceId);
	}

	static getDeviceTypeFromIdOrString( identifier: number | string) {
		for(let deviceType of DeviceTypes.allDeviceTypes) {
			if (deviceType.getId() === identifier || deviceType.getName() === identifier) {
				return deviceType;
			}
		}
		throw new Error('Error: No matching device for the given identifier.');
	}
}

export abstract class ResponsiveView<P,S> extends React.Component<P, S> {

	constructor() {
		super();
	}

	render() {
		let currentDeviceType = DeviceTypes.getCurrentDevice();
		let deviceSpecificRenderFunction = `render${currentDeviceType.getName()}`;
		return (
			<div>
				<h1>This is the responsive view</h1>
				<p>This is the content</p>
				{this[deviceSpecificRenderFunction]()}
			</div>
		)
	}

	protected renderDefault() {
		throw 'renderDefault need to be implemented';
	}

	protected renderMobile() {
		return this.renderDefault();
	}

	protected renderMobilePortrait() {
		return this.renderMobile();
	}

	protected renderMobileLandscape() {
		return this.renderMobile();
	}

	protected renderTablet() {
		return this.renderDefault();
	}

	protected renderTabletPortrait() {
		return this.renderTablet();
	}

	protected renderTabletLandscape() {
		return this.renderTablet();
	}
}

