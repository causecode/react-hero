import {BaseModel} from '../src/models/BaseModel';
jest.unmock('../src/components/PagedList/DataGrid');
import {DataGrid} from '../src/components/PagedList/DataGrid';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Link} from 'react-router';
import {Wrapper} from './../src/utils/Wrapper';
import * as ReactDOM from 'react-dom';
import {MissingInstanceListError} from '../src/errors/MissingInstanceListError';
import {fetchInstanceDataFromApi} from '../src/api/auth/index';

interface ITestData {
    id: string;
    author: string;
}

interface ITestModel extends IBaseModel {
    instanceData: ITestData;
}

function generalDataGridTests(grid: React.Component<{}, {}>, keys: string[], instanceList: ITestModel[],
        resource: string) {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(grid, 'data-grid').length).toBe(1);

    let headers: Element[] = TestUtils.scryRenderedDOMComponentsWithTag(grid, 'th');
    expect(headers.length).toEqual(keys.length + 1);
    for (let i: number = 1; i < headers.length ; i++) {
        expect(headers[i].textContent).toEqual(keys[i - 1]);
    }

    let rows: Element[] = TestUtils.scryRenderedDOMComponentsWithClass(grid, 'data-grid-row');
    expect(rows.length).toEqual(instanceList.length);

    type LinkType = React.Component<{}, {}> & {props: {to: string}}
    let links: LinkType[] = TestUtils
        .scryRenderedComponentsWithType<LinkType, React.ComponentClass<{}>>(grid, Link);
    expect(links[0].props.to).toEqual(`/${resource}/edit/${instanceList[0].instanceData.id}`);
    expect(links[1].props.to).toEqual(`/${resource}/show/${instanceList[0].instanceData.id}`);
    expect(links[2].props.to).toEqual(`/${resource}/edit/${instanceList[1].instanceData.id}`);
    expect(links[3].props.to).toEqual(`/${resource}/show/${instanceList[1].instanceData.id}`);

    for (let i: number = 0; i < rows.length; i++ ) {
        let fields = ReactDOM.findDOMNode(rows[i]).querySelectorAll('td');
        let instanceData : ITestData = instanceList[i].instanceData;
        expect(fields.length).toEqual(keys.length + 1);
        for (let j: number = 1; j < fields.length; j++ ) {
            expect(fields[j].textContent).toEqual(instanceData[keys[j - 1]]);
        }
    }
}

describe('Test Data Grid', () => {
    let instanceList: ITestModel[], keys: string[], resource: string;

    beforeEach(() => {
        instanceList = [new BaseModel({id: '1', author: 'abc'}), new BaseModel({id: '2', author: 'xyz'})];
        keys = Object.keys(instanceList[0].instanceData);
        resource = instanceList[0].resourceName;
    });

    it('renders a simple Data Grid', () => {
        let grid: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <Wrapper>
                <DataGrid
                    instanceList={instanceList}
                    properties={keys}
                    totalCount={keys.length}
                />
            </Wrapper>
        );

        generalDataGridTests(grid, keys, instanceList, resource);
    });

    it('renders a Data Grid without any props', () => {
        expect(() => TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <Wrapper>
                <DataGrid />
            </Wrapper>
        )).toThrow(new MissingInstanceListError());
    });

    it('renders a Data grid with only an instanceList', () => {
        let grid: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <Wrapper>
                <DataGrid
                    instanceList={instanceList}
                />
            </Wrapper>
        );

        generalDataGridTests(grid, keys, instanceList, resource);
    });

});
