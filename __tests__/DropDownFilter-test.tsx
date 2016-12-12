jest.unmock('../src/components/PagedList/Filters/DropDownFilter');
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Wrapper} from '../src/components/Wrapper';
import * as ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {DropDownFilter, IDropDownFilter} from '../src/components/PagedList/Filters/DropDownFilter';
import {IFilter} from '../src/interfaces';
import '../src/utils/appService';
const unroll: any = require<any>('unroll');
require<any>('../src/init');

unroll.use(it);

describe('DropDownFilter', () => {
    let paramName: string = 'test';
    let labelData: string = 'testLabel';
    let fieldValues: {name: string}[] = [
        {name: `${paramName}From`},
        {name: `${paramName}To`}
    ];
    let dropDownData: string[] = [ 'Zoo', 'Jungle', 'Forest' ];

    it ('should render each tags correctly', ()  => {
        let instance: React.Component<IDropDownFilter, void> =
                TestUtils.renderIntoDocument<React.Component<IDropDownFilter, void>>(
            <Wrapper>
                <DropDownFilter label={labelData} paramName={paramName} possibleValues={dropDownData}
                        fields={fieldValues}/>
            </Wrapper>
        );

        expect((TestUtils.findRenderedComponentWithType(instance, FormGroup)).props.children.length).toEqual(2);
        expect((TestUtils.findRenderedComponentWithType(instance, ControlLabel)).props.children)
                .toEqual(labelData.capitalize());
        let component: React.Component<IDropDownFilter, void> = TestUtils.findRenderedComponentWithType
                <React.Component<IDropDownFilter, void> , DropDownFilter<IDropDownFilter>> (instance, FormControl);
        expect(component.props.name).toEqual(`${paramName}From`);
        for (let i in dropDownData) {
            if (dropDownData.hasOwnProperty(i)) {
                expect(component.props.children[1][i].props.value).toEqual(dropDownData[i]);
            }
        }
    });

    it('should use paramName if label is not provided', () => {
        let instance: React.Component<IDropDownFilter, void> = TestUtils.renderIntoDocument
                <React.Component<IDropDownFilter, void>>(
            <Wrapper>
                <DropDownFilter paramName={paramName} possibleValues={dropDownData} fields={fieldValues}/>
            </Wrapper>
        );
        expect(TestUtils.findRenderedComponentWithType(instance, ControlLabel).props.children).toEqual('Test');
    });
});
