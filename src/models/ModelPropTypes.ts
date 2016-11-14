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

    export const dateType: string = 'DATE';
    export const arrayType: string = 'ARRAY';
    export const numberType: string = 'NUMBER';
    export const stringType: string = 'STRING';
    export const objectType: string = 'OBJECT';
    export const booleanType: string = 'BOOLEAN';
    export const enumType: string = 'ENUM';
    export let DATE: IModelPropType = () => {
        return {type: dateType};
    };
    export let ARRAY: IModelPropType = (propType: IPropData) => {
        return {type: arrayType, propType: propType};
    };
    export let NUMBER: IModelPropType = () =>  { return {type: numberType}; };
    export let STRING: IModelPropType = () =>  { return {type: stringType}; };
    export let OBJECT = (propTypes) =>  { return {type: objectType, propTypes}; };
    export let BOOLEAN: IModelPropType = () =>  { return {type: booleanType }; };
    export let ENUM: IModelPropType = (enumInstance) => { 
        return {type: enumType, enum: enumInstance}; 
    };
}
