jest.mock('react-markdown-editor');
jest.unmock('../../src/components/common/MarkdownWrapper');

import * as React from 'react';
import {Provider} from 'react-redux';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {configureStore, store} from '../../src/store';
import {
    MarkdownWrapper, 
    IMarkdownProps, 
    MarkdownWrapperImpl,
} from '../../src/components/common/MarkdownWrapper';
import {
    RawContentWrapper, 
    IRawContentProps, 
    RawContentWrapperImpl,
} from '../../src/components/common/RawContentWrapper';

const MarkdownEditor = require<any>('react-markdown-editor').MarkdownEditor;

let Unroll: any = require('unroll');
Unroll.use(it);

describe('Markdown and RawContent Wrapper test cases', (): void => {
   
    let saveData: jest.Mock<void> = jest.fn<void>();
    let text: string = `Test Data`;

    let markDown: ShallowWrapper<IMarkdownProps, void> = shallow<IMarkdownProps, void>(
            <MarkdownWrapperImpl
                    model={text}
                    value={text}
                    saveData={saveData}
            />
    );

    let rawContent: ShallowWrapper<IRawContentProps, void> = shallow<IRawContentProps, void>(
        <RawContentWrapperImpl
            model={text}
            value={text}
            saveData={saveData}
        />
    );

    it('should render textarea', () => {
        expect(rawContent.find('textarea').length).toBe(1);
    });

    it('When changes made in testarea should call handleChange', () => {
        rawContent.find('textarea').simulate('change', {target: {value: text}});
        expect(saveData).toBeCalledWith(text, text);
    });


    it('should render MarkdownEditor', () => {
        expect(markDown.find(MarkdownEditor).length).toBe(1);
    });

    describe('When the component is connected to redux store', (): void => {
        let markdown: ReactWrapper<IMarkdownProps, void> = mount<IMarkdownProps, void>(
            <Provider store={configureStore({
                forms: {test: {data: text}},
            })}>
                <MarkdownWrapper model={text} />
            </Provider>
        );

        let rawContent: ReactWrapper<IRawContentProps, void> = mount<IRawContentProps, void>(
            <Provider store={configureStore({
                forms: {test: {data: text}},
            })}>
                <RawContentWrapper model={text}/>
            </Provider>
        );

        Unroll('it should render #componentName', (done: () => void, args): void => {
            expect(args.component.find(args.innerComponent).length).toBe(1);
            done();
        }, [
            ['componentName', 'component', 'innerComponent'],
            ['RawContent', rawContent, RawContentWrapperImpl],
            ['Markdown', markdown, MarkdownWrapperImpl],
        ]);
    });
});
