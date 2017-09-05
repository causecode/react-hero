jest.unmock('../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import {ContentView} from '../../src/components/header-footer-layout';

const unroll: any = require('unroll');
unroll.use(it);

describe('When ContentView is rendered', (): void => {
    const componentTree: ShallowWrapper<void, void> = shallow<void, void> (
        <ContentView>
            <h1>I am the one who knocks - Heisenberg.</h1>
        </ContentView>
    );

    unroll('it should render #elementName #count times', (
        done: () => void,
        args: {elementName: string, element: EnzymePropSelector, count: number}
    ): void => {
        expect(componentTree.find(args.element).length).toBe(args.count);
        done();
    },  [
            ['elementName', 'element', 'count'],
            ['div', 'div', 1],
            ['h1', 'h1', 1],
        ]
    );
});