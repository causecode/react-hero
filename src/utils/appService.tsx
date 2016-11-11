import * as React from 'react';
import {BaseModel} from '../models/BaseModel';
import {
    ListInput,
    BooleanInput,
    NumberInput,
    StringInput,
    DateInput,
    DropDownInput
} from '../components/Widgets';

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

export function generateCRUDTemplate<T extends BaseModel>(
        instance: T,
        changeHandler: (instance: BaseModel) => void 
): JSX.Element {
    return (
        <div>
            {Object.keys(instance.properties).map((prop: string, index: number) => {
                let FormControl: React.ComponentClass<any>;
                let propertyValue = instance.properties[prop];
                switch (instance.propTypes[prop].type) {
                    case 'ARRAY': 
                        FormControl = ListInput;
                        break;
                    case 'BOOLEAN':
                        FormControl = BooleanInput; 
                        break;
                    case 'NUMBER': 
                        FormControl = NumberInput; 
                        break;
                    case 'OBJECT': 
                        return generateCRUDTemplate(propertyValue, changeHandler);
                    case 'STRING':
                        FormControl = StringInput; 
                        break;
                    case 'DATE':
                        FormControl = DateInput;
                        break;
                    case 'ENUM': 
                        FormControl = DropDownInput;
                }

                if (FormControl) {
                    return (
                        <FormControl
                            enum={instance.propTypes[prop].enum}
                            onChange={changeHandler}
                            instance={instance}
                            key={`form-control-${instance.resourceName}-${index}`}
                            propertyValue={propertyValue}
                            propertyName={prop} 
                        />
                    );
                }
                
            })}
        </div>
    );
}
