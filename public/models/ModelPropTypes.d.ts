export declare module ModelPropTypes {
    interface IModelPropType {
        (prop?: Object | {
            [id: string]: IPropData;
        } | IPropData): IPropData;
    }
    interface IPropData {
        type: string;
        propTypes?: {
            [key: string]: IModelPropType;
        };
        enum?: Object;
    }
    const dateInputType: string;
    const arrayInputType: string;
    const numberInputType: string;
    const stringInputType: string;
    const objectInputType: string;
    const booleanInputType: string;
    const enumInputType: string;
    let DATE: IModelPropType;
    let ARRAY: IModelPropType;
    let NUMBER: IModelPropType;
    let STRING: IModelPropType;
    let OBJECT: (propTypes: {
        [key: string]: any;
    }) => {
        type: string;
        propTypes: {
            [key: string]: any;
        };
    };
    let BOOLEAN: IModelPropType;
    let ENUM: IModelPropType;
}
