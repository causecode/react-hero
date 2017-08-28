import * as React from 'react';
import {Link} from 'react-router';
import {BaseModel} from '../../src/models/BaseModel';
import {ModelPropTypes} from '../../src/models/ModelPropTypes';

export interface IUser {
    id: number;
    name: {
        firstName: string,
        lastName: string
    };
}

export class UserModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        name: ModelPropTypes.OBJECT({
            firstName: ModelPropTypes.STRING(),
            lastName: ModelPropTypes.STRING(),
        }),
    };

    static defaultProps = {
        id: 0,
        name: {
            firstName: '',
            lastName: '',
        },
    };

    static resourceName: string = 'test';

    static columnNames: string[] = [
        'id',
        'name.firstName',
        'top.secret',
        'organization',
    ];

    getHTMLName(instance: IUser): JSX.Element {
        return (
            <Link to="/stephen">Stephen Amell</Link>
        );
    }

    getHTMLOrganization(instance: IUser): JSX.Element {
        return (
            <Link to="/queensConsolidated">Queens Consolidated</Link>
        );
    }

    constructor(properties: IUser) {
        super(properties);
    }
}

export const userInstance: IUser = {
    id: 1,
    name: {
        firstName: 'Stephen',
        lastName: 'Amell',
    },
};

export const userModelStephenInstance: UserModel = new UserModel(userInstance);

