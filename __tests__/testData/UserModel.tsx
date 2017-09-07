import * as React from 'react';
import {Link} from 'react-router-dom';
import {BaseModel} from '../../src/models/BaseModel';
import {ModelPropTypes} from '../../src/models/ModelPropTypes';
import {CSS} from '../../src/interfaces';

export interface IUser {
    id: number;
    name: string;
    organization: string;
}

export class UserModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        name: ModelPropTypes.STRING(),
        organization: ModelPropTypes.STRING(),
    };

    static defaultProps = {
        id: 0,
        name: '',
        organization: '',
    };

    static resourceName: string = 'user';

    static columnNames: Object[] = [{
        label: 'Id',
        accessor: 'id',
    }, {
        label: 'First Name',
        accessor: 'name.firstName',
    }, {
        label: 'Organization',
        accessor: 'organization',
    }];

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

    getRowStyle(instance: IUser): CSS {
        return {color: '#ffffff'};
    }
}

export const userInstance: IUser = {
    id: 1,
    name: 'Stephen Amell',
    organization: 'Test',
};

export const userModelStephenInstance: UserModel = new UserModel(userInstance);

