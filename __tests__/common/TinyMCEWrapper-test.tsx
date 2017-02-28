jest.unmock('../../src/components/common/TinyMCEWrapper');
jest.mock('../../node_modules/react-tinymce-input');

import * as React from 'react';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {Provider} from 'react-redux';
import {configureStore} from '../../src/store';
import {TinyMCEWrapper, ITinyMCEWrapperProps, TinyMCEWrapperImpl} from '../../src/components/common/TinyMCEWrapper';
const TinyMCE: any = require<any>('react-tinymce-input');

describe('Test cases for TinyMCEWrapper', (): void => {

    let saveData: jest.Mock<void> = jest.fn<void>();

    let tinyMCEWrapperImpl: ShallowWrapper<ITinyMCEWrapperProps, void> = shallow<ITinyMCEWrapperProps, void>(
            <TinyMCEWrapperImpl saveData={saveData} model="rhForms.test.content"/>
    );

    it('should render TinyMCE editor', (): void => {
        expect(tinyMCEWrapperImpl.find(TinyMCE).length).toBe(1);
    });

    it('should call handleChange function when editor content changes', (): void => {
        tinyMCEWrapperImpl.find(TinyMCE).simulate('change', 'Test TinyMCE content');
        expect(saveData).toBeCalledWith('rhForms.test.content', 'Test TinyMCE content');
    });

    describe('When TinyMCEWrapper is mounted', (): void => {
        let tinyMCE: ReactWrapper<ITinyMCEWrapperProps, void> = mount<ITinyMCEWrapperProps, void>(
                <Provider store={configureStore({forms: {rhForms: {test: {content: 'Test TinyMCE'}}}})}>
                    <TinyMCEWrapper model="rhForms.test.content" saveData={saveData}/>
                </Provider>
        );

        it('should contains TinyMCEWrapperImpl as child', (): void => {
            expect(tinyMCE.props()[`children`][`type`][`displayName`]).toContain('TinyMCEWrapperImpl');
        });
    });
});
