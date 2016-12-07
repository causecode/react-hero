jest.unmock('../src/components/PagedList/Filters/QueryFilter');
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Wrapper} from '../src/components/Wrapper';
import * as ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {QueryFilter, IQueryFilter} from '../src/components/PagedList/Filters/QueryFilter';
import {IFilter} from '../src/interfaces';
import '../src/utils/appService';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe( 'Queryfilter', () => {
    let paramNameData: string = 'test';
    let fieldValues: {name: string}[] = [
        {name: `${paramNameData}From`},
        {name: `${paramNameData}To`}
    ];
    let labelData: string = 'testFilter';
    let placeholderData: string[] = [ 'First Name', 'Last Name', 'Email' ];

    it ('should render each tags correctly', ()  => {
        let instance: React.Component<IQueryFilter, void> =
                TestUtils.renderIntoDocument<React.Component<IQueryFilter, void>>(
            <Wrapper>
                <QueryFilter label={labelData} placeholder={placeholderData} fields={fieldValues}
                        paramName={paramNameData} />
            </Wrapper>
        );

        expect((TestUtils.findRenderedComponentWithType(instance, FormGroup)).props.children.length).toEqual(2);
        expect((TestUtils.findRenderedComponentWithType(instance, ControlLabel)).props.children)
                .toEqual(labelData.capitalize());
        let component: React.Component<IQueryFilter, void> = TestUtils.findRenderedComponentWithType
                <React.Component<IQueryFilter, void> , QueryFilter<IQueryFilter>>(instance, FormControl);
        expect(component.props.name).toEqual(`${paramNameData}From`);
        for (let i in placeholderData) {
            if (placeholderData.hasOwnProperty(i)) {
                expect(component.props.placeholder[i]).toEqual(placeholderData[i]);
            }
        }
    });

    it('should use paramName if label is not provided', () => {
        let instance: React.Component<IQueryFilter, void> =
                TestUtils.renderIntoDocument<React.Component<IQueryFilter, void>>(
            <Wrapper>
                <QueryFilter placeholder={placeholderData} fields={fieldValues} paramName={paramNameData} />
            </Wrapper>
        );

        let component: React.Component<IQueryFilter, void> = TestUtils.findRenderedComponentWithType
                <React.Component<IQueryFilter, void> , QueryFilter<IQueryFilter>>(instance, ControlLabel);
        expect(component.props.children).toEqual(paramNameData.capitalize());
    });
});
