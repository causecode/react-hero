import * as React from 'react';

export class DeviceTypes {

	static DESKTOP: DeviceTypes = new DeviceTypes(0, 'DESKTOP');
	static TABLET: DeviceTypes = new DeviceTypes(1, 'TABLET');
	static TABLET_PORTRAIT: DeviceTypes = new DeviceTypes(2, 'TABLET_PORTRAIT');
	static TABLET_LANDSCAPE: DeviceTypes = new DeviceTypes(3, 'TABLET_LANDSCAPE');
	static MOBILE: DeviceTypes = new DeviceTypes(4, 'MOBILE');
	static MOBILE_PORTRAIT: DeviceTypes = new DeviceTypes(5, 'MOBILE_PORTRAIT');
	static MOBILE_LANDSCAPE: DeviceTypes = new DeviceTypes(6, 'MOBILE_LANDSCAPE');

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
		this.renderMobile = this.renderMobile.bind(this);
		this.renderMobilePortrait = this.renderMobilePortrait.bind(this);
		this.renderMobileLandscape = this.renderMobileLandscape.bind(this);
		this.renderTablet = this.renderTablet.bind(this);
		this.renderTabletPortrait = this.renderTabletPortrait.bind(this);
		this.renderTabletLandscape = this.renderTabletLandscape.bind(this);
	}

	private getDeviceType() {
		let indicator = document.createElement('div');
		indicator.className = 'state-indicator';
		document.body.appendChild(indicator);
		let deviceId = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);
		return DeviceTypes.getDeviceTypeFromIdOrString(deviceId);
	}

	render() {
		let currentDeviceType = this.getDeviceType();
		let deviceSpecificRender;

		switch (currentDeviceType) {
			case DeviceTypes.MOBILE:
				deviceSpecificRender = this.renderMobile;
				break;
			case DeviceTypes.MOBILE_PORTRAIT:
				deviceSpecificRender = this.renderMobilePortrait;
				break;
			case DeviceTypes.MOBILE_LANDSCAPE:
				deviceSpecificRender = this.renderMobileLandscape;
				break;
			case DeviceTypes.TABLET:
				deviceSpecificRender = this.renderTablet;
				break;
			case DeviceTypes.TABLET_PORTRAIT:
				deviceSpecificRender = this.renderTabletPortrait;
				break;
			case DeviceTypes.TABLET_LANDSCAPE:
				deviceSpecificRender = this.renderTabletLandscape;
				break;
			default:
				deviceSpecificRender = this.renderDefault;
		}

		return (
			<div>
				<h1>This is the responsive view</h1>
				<p>This is the content</p>
				{deviceSpecificRender()}
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

export class ResponsiveViewImpl extends ResponsiveView<any, any> {
	constructor() {
		super()
	}

	renderDefault() {
		return (<h1>THis is a desktop</h1>)
	}

	renderMobile() {
		return (<h1>This is a mobile </h1>)
	}

	renderTablet() {
		return (<h1>This is a Tablet </h1>)
	}
}

