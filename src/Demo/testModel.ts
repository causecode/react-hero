import {BaseModel} from './../models/BaseModel';
import {resolver} from '../resolver';
import {ModelService} from '../utils/modelService';
import {PropTypes} from 'react';
import { ModelPropTypes } from '../models/BaseModel';

function getProperties() {
    return {author: '', blogIMGSrc: '', dateCreated: 0, lastUpdated: 0};
}

export enum Status {
    PRESENT,
    FIRED
}

export class BlogModel extends BaseModel {
    static propTypes = {
        dateCreated: ModelPropTypes.DATE(),
        guestList: ModelPropTypes.ARRAY(),
        id: ModelPropTypes.NUMBER(),
        name:  ModelPropTypes.STRING(),
        enabled: ModelPropTypes.BOOLEAN(),
        status: ModelPropTypes.ENUM(Status) 
    };

    static resourceName: string = 'blog';
    constructor(properties: any) {
        super(Object.keys(properties).length ? properties : getProperties());
        if (Object.keys(properties).length) {
            super(properties);
        } else {
            super(this.properties);
        }
    }
}

export class UserModel extends BaseModel {

    static resourceName: string = 'user';
    constructor(properties: any) {
        super(properties);
        this.properties = properties;
    }
}
