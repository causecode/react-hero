export module ModelPropTypes {
    
    export interface IModelPropType {
        (
            prop?: Object | {[id: string]: IPropData} | IPropData 
        ): IPropData;
    }
    export interface IPropData {
        type : string;
        propTypes?: {[key: string]: IModelPropType};
        enum?: Object;
    }

    export const dateInputType: string = 'date';
    export const arrayInputType: string = 'list';
    export const numberInputType: string = 'number';
    export const stringInputType: string = 'text';
    export const objectInputType: string = 'object';
    export const booleanInputType: string = 'boolean';
    export const enumInputType: string = 'select';
    export let DATE: IModelPropType = () => {
        return {type: dateInputType};
    };
    export let ARRAY: IModelPropType = (propType: IPropData) => {
        return {type: arrayInputType, propType: propType};
    };
    export let NUMBER: IModelPropType = () =>  { return {type: numberInputType}; };
    export let STRING: IModelPropType = () =>  { return {type: stringInputType}; };
    export let OBJECT = (propTypes) =>  { return {type: objectInputType, propTypes}; };
    export let BOOLEAN: IModelPropType = () =>  { return {type: booleanInputType }; };
    export let ENUM: IModelPropType = (enumInstance) => { 
        return {type: enumInputType, enum: enumInstance}; 
    };
}
