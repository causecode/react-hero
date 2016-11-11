export module ModelPropTypes {
    
    export interface IModelPropType {
        (): {type: string, propTypes?: IModelPropType, enum?: Object};
    }

    export const dateType: string = 'DATE';
    export const arrayType: string = 'ARRAY';
    export const numberType: string = 'NUMBER';
    export const stringType: string = 'STRING';
    export const objectType: string = 'OBJECT';
    export const booleanType: string = 'BOOLEAN';
    export const enumType: string = 'ENUM';
    
    export let DATE: IModelPropType = () =>  { return {type: dateType }; };
    export let ARRAY = () =>  { return {type: arrayType }; };
    export let NUMBER = () =>  { return {type: numberType }; };
    export let STRING = () =>  { return {type: stringType }; };
    export let OBJECT = () =>  { return {type: objectType }; };
    export let BOOLEAN = () =>  { return {type: booleanType }; };
    export let ENUM = (enumInstance) => { 
        return {type: enumType, enum: enumInstance}; 
    };
}
