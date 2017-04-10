import * as React from 'react';
import * as moment from 'moment';
import {BaseModel} from '../models/BaseModel';
import {ModelPropTypes} from '../models/ModelPropTypes';
import {store} from '../store';
import {ControlLabel, Col, FormGroup} from 'react-bootstrap';
import {FormInput} from '../components/Widgets';
import {IImmutable} from '../interfaces';
import {fromJS} from 'immutable';
import {AUTH_TOKEN_KEY, AUTH_TOKEN_KEY_TIMESTAMP} from '../constants';
const {actions} = require<any>('react-redux-form');

export interface IAppServiceConfig {
    alertType?: string;
    alertTimeOut?: number;
}

declare module process {
    export module env {
        let NODE_ENV: string;
    }
}

export function objectEquals<T>(obj1: Object | Array<T>, obj2: Object | Array<T>): boolean {
    // Adding try catch here to avoid 'Converting circular structure to JSON' error.
    try {
        if ((obj1 instanceof Object && obj2 instanceof Object) || (obj1 instanceof Array && obj2 instanceof Array)) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }
    } catch (e) {
        return obj1 === obj2;
    }

    return obj1 === obj2;
}

export function getEnvironment(): string {
    return process.env.NODE_ENV;
}

export function parseWidgetDate(date: number | string | Date): string {
    let timestamp: number = date as number;
    if (date instanceof Date) {
        timestamp = date.getTime();
    }else if (typeof date === 'string') {
        timestamp = parseInt(date, 10); 
    }
    return moment(timestamp).format('YYYY-MM-DD');
}

export function getInnerData(data: any, nestedPath: string) {
    let result: string = '';
    if (data) {
        nestedPath.split('.').forEach((item) => {
            if (data.constructor === Array) {
                data.forEach((innerItem, index) => {
                    result = `${result} ${innerItem[item].toString()}`;
                });
            } else {
                data = data[item];
            }
            if (data.constructor !== Array && data.constructor !== Object) {
                result = `${result} ${data}`;
            }
        });
    }
    return result;
};

export function isEmpty(obj: Object): boolean {
    return (!obj || !Object.keys(obj).length);
}

export function getModelString(...args: any[]): string {
    return `rhForms.${args.join('.')}`;
}

export function getOwnPropsParams(pathName: string): {resource: string,
     resourceID: string} {
    let type = pathName.split('/');
    let resource, resourceID = '';

    if (type.length > 1) {
        resource = type[1];

        if (type[3]) {
            resourceID = type[3];
        }
    }

    return {resource: resource, resourceID: resourceID};
}

/**
 * Returns the themed component. If the theme name or the theme directory is not found, 
 * the default component i.e. the component in the default directory is returned.
 * @function
 * @param {string} componentPath - The path of the component from your theme directpry.
 * @param {string} componentName - The component name to be rendered. This is needed because require returns an Object.
 * To access the component in the Object, component name is required.
 */
export function getThemedComponent(componentPath: string, componentName: string): React.ComponentClass<any> {
    let theme: string = store.getState().theme;

    if (typeof theme !== 'string') {
        return fetchComponent(componentPath, componentName);
    }

    try {
        return fetchComponent(componentPath, componentName, theme);
    } catch (error) {
        showWarn(`${error} Rendering default component`);
        return fetchComponent(componentPath, componentName);
    }
}

function fetchComponent(componentPath: string, componentName: string, theme?: string): React.ComponentClass<any> {
    /**
     * TODO use the path of the app root directory instead of ../../../../src.
     */
    // return require(`../../src/${theme || 'default'}/${componentPath}`)[`${componentName}`];
    return require(`../../../../src/${theme || 'default'}/${componentPath}`)[`${componentName}`];
}

export function showWarn(message: string): void {
    if (getEnvironment() === 'development') {
        console.warn(message);
    }
}

export function initializeFormWithInstance<T extends BaseModel>(instance: T, isCreate: boolean = false): void {
    if (isEmpty(instance) || isEmpty(instance.properties)) {
        return;
    }

    let formModelString: string = isCreate ? `${instance.resourceName}Create` : `${instance.resourceName}Edit`;  
    let model: string = getModelString(formModelString);

    store.dispatch(actions.change(model, instance));
}

export function isImmutable(obj: Object | IImmutable): obj is IImmutable {
    return (obj as IImmutable).toJS !== undefined;
}

export function getIn(object: Object | IImmutable, path: string, defaultValue: Object = ''): Object {
    let immutableObject = isImmutable(object) ? object : fromJS(object) ;
    let propertyValue: IImmutable = (immutableObject as IImmutable).getIn(path.split('.'), defaultValue) as IImmutable;
    return propertyValue && propertyValue.toJS ? propertyValue.toJS() : propertyValue;
}

export function generateSubForm(propertyName: string, propTypes: any, model: string): JSX.Element {

    let FormControls =  Object.keys(propTypes).map((prop, index: number) => {
        if (propTypes.hasOwnProperty(prop)) {
            let type: string = propTypes[prop].type;
            if (type === 'object') {
                type = ModelPropTypes.stringInputType;
            }
            return (
                <FormInput
                        type={propTypes[prop].type}
                        enum={propTypes[prop].enum}
                        key={`form-control-sub-${propertyName}-${index}`}
                        propertyName={prop} 
                        model={model + '.' + prop}
                />
            );
        }
    });

    return (
        <FormGroup key={`sub-form-${propertyName}`}>
            <Col
                    sm={7}
                    smOffset={2}
                    style={{border: '1px solid lightgrey', borderRadius: '10px', marginBottom: '20px'}}
            >
                <ControlLabel style={{textAlign: 'left'}}>{propertyName}</ControlLabel>
                {FormControls}
            </Col>
        </FormGroup>
    );
}

export function generateForm<T extends BaseModel>(
        instance: T,
        isCreatePage: boolean,
        model: string = '',
        propTypes: any = instance.propTypes
): JSX.Element {
    return (
        <div>
            {Object.keys(propTypes).map((prop: string, index: number) => {
                let keyPath: string = model ? model + '.' + prop : prop; 
                let propertyValue: any = getIn(instance.properties, keyPath);
                let type: string = instance.propTypes[prop].type;
                let formModelString: string = isCreatePage ? `${instance.resourceName}Create` : 
                        `${instance.resourceName}Edit`;
                let modelString: string = getModelString(formModelString, 'properties', keyPath);
                if (type === ModelPropTypes.objectInputType) {
                    return generateSubForm(
                            prop, 
                            (getIn(instance.propTypes, keyPath) as typeof BaseModel).propTypes,
                            modelString 
                    );
                }
                return (
                    <FormInput
                            type={instance.propTypes[prop].type}
                            enum={instance.propTypes[prop].enum}
                            key={`form-control-${instance.resourceName}-${index}`}
                            propertyName={prop}
                            propertyValue={propertyValue} 
                            model={modelString}
                    />
                );
            })}
        </div>
    );
}

export function getActionComponent(fileName: string): React.ComponentClass<any> {
    let fileNameSplittedToWords: string[] = fileName.split('-').map((item: string): string => {
        return item.capitalize();
    });

    return require(`../../../../src`)[fileNameSplittedToWords.join('')];
};

export function setTokenInLocalStorage(token: string): boolean {
    if (!token) {
        console.warn('No Token sent to setTokenInLocalStorage');
        return false;
    }

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_TOKEN_KEY_TIMESTAMP, new Date().toString());
    return true;
};

export function getTokenFromLocalStorage(): string {
    let token: string = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
        return '';
    }

    return token;
};

export function removeTokenFromLocalStorage(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY_TIMESTAMP);
}
