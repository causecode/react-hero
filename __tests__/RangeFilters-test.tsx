jest.unmock('../src/components/PagedList/Filters/DateRangeFilter');
jest.unmock('../src/components/PagedList/Filters/RangeFilter');

import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {DateRangeFilter} from '../src/components/PagedList/Filters/DateRangeFilter';
import {RangeFilter} from '../src/components/PagedList/Filters/RangeFilter';
import {Wrapper} from '../src/components/Wrapper';
import {IFilter} from '../src/interfaces';
import '../src/utils/appService';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('DateRangeFilter test cases', () => {
    let paramName: string = 'test';
    let fieldValues: {name: string}[] = [
        {name: `${paramName}From`},
        {name: `${paramName}To`}
    ];
    let labelData: string = 'testFilter';

    unroll('should render each tags correctly in #title ', (done, testArgs)  => {
        let instance: React.Component<IFilter, void> = TestUtils.renderIntoDocument<React.Component<IFilter, void>>(
            <Wrapper>
                <testArgs.filter label={labelData} paramName={paramName} fields={fieldValues}/>
            </Wrapper>
        );
        expect((TestUtils.findRenderedComponentWithType(instance, ControlLabel))
                .props.children).toEqual(labelData.capitalize());
        expect((TestUtils.findRenderedComponentWithType(instance, FormGroup)).props.children.length).toEqual(5);
        let component: React.Component<IFilter, void>[]  = TestUtils.scryRenderedComponentsWithType
                <React.Component<IFilter, void>, testArgs.filter<IFilter>>(instance, FormControl);
        expect(component.length).toEqual(2);
        expect(component[0].props.name).toEqual(`${paramName}From`);
        expect(component[1].props.name).toEqual(`${paramName}To`);
        done();
    }, [
        ['title', 'filter'],
        ['DateRangeFilter', DateRangeFilter],
        ['RangeFilter', RangeFilter]
    ]);

    unroll('should use paramName if label is not provided in #title', (done, testArgs) => {
        let instance: React.Component<IFilter, void> = TestUtils.renderIntoDocument<React.Component<IFilter, void>>(
            <Wrapper>
                <testArgs.filter paramName={paramName} fields={fieldValues}/>
            </Wrapper>
        );
        let component: React.Component<IFilter, void> = TestUtils.findRenderedComponentWithType
                <React.Component<IFilter, void> , testArgs.filter<IFilter>>(instance, ControlLabel);
        expect(component.props.children).toEqual(paramName.capitalize());
        done();
    }, [
        ['title', 'filter'],
        ['DateRangeFilter', DateRangeFilter],
        ['RangeFilter', RangeFilter]
    ]);
});
