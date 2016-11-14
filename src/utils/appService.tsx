import * as React from 'react';
import {BaseModel, IPropTypes} from '../models/BaseModel';
import {ModelPropTypes} from '../models/ModelPropTypes';
import {fromJS} from 'immutable';
import {store} from '../store/store';
import {ControlLabel, Col, FormGroup} from 'react-bootstrap';
import {FormInput} from '../components/Widgets';
const {actions} = require<any>('react-redux-form');

declare module process {
    export module env {
        let NODE_ENV: string;
    }
}

export function getEnvironment(): string {
    return process.env.NODE_ENV;
}

export interface IAppServiceConfig {
    alertType?: string;
    alertTimeOut?: number;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

export function isEmpty(obj: Object): boolean {
    return (!obj || !Object.keys(obj).length);
}

export function getModelString(...args: any[]): string {
    return `RHForms.${args.join('.')}`;
}

export function initializeForm<T extends BaseModel>(instance: T) {
    if (isEmpty(instance) || isEmpty(instance.properties)) {
        return;
    }
    for (let prop in instance.properties) {
        if (instance.properties.hasOwnProperty(prop)) {
            store.dispatch(actions.change(
                getModelString(instance.resourceName, prop),
                instance.properties[prop]
            ));
        }
    }
}

export function getIn(object: Object, path: string) {
     let propertyValue = fromJS(object).getIn(path.split('.'));

    return propertyValue.toJS ? propertyValue.toJS() : propertyValue;
}

export function generateSubForm(propertyName: string, object: Object, propTypes: IPropTypes, model: string) {
    if (isEmpty(object)) {
        return;
    }

    let FormControls =  Object.keys(object).map((prop, index: number) => {
        if (object.hasOwnProperty(prop)) {
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
        <FormGroup>
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
        model: string = '',
        propTypes: IPropTypes = instance.propTypes
): JSX.Element {
    return (
        <div>
            {Object.keys(propTypes).map((prop: string, index: number) => {
                let keyPath = model ? model + '.' + prop : prop; 
                let propertyValue = getIn(instance.properties, keyPath);
                let type: string = instance.propTypes[prop].type;
                if (type === ModelPropTypes.objectInputType) {
                    return generateSubForm(
                            prop, 
                            propertyValue, 
                            getIn(instance.propTypes, keyPath).propTypes, 
                            getModelString(instance.resourceName, keyPath)
                    );
                }
            
                return (
                    <FormInput
                        type={instance.propTypes[prop].type}
                        enum={instance.propTypes[prop].enum}
                        key={`form-control-${instance.resourceName}-${index}`}
                        propertyName={prop} 
                        model={getModelString(instance.resourceName, keyPath)}
                    />
                );
            })}
        </div>
    );
}
