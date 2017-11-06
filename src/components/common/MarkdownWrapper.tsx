import * as React from 'react';
import * as Radium from 'radium';
import {connect, MapStateToProps, MapDispatchToPropsFunction} from 'react-redux';
import {CSS, IDispatchProps, IDispatch} from '../../interfaces';
import {getNestedData} from '../../utils/commonUtils';
const {actions} = require<any>('react-redux-form');
// TODO: uncomment this when react-markdown-editor adds React 16 support
// const MarkdownEditor = require<any>('react-markdown-editor').MarkdownEditor;
const MarkDownPreview = require<any>('react-markdown');

export interface IMarkdownStateProps {
    value?: string;
}

export interface IMarkdownProps extends IMarkdownStateProps, IDispatchProps {
    model?: string;
    style?: CSS;
}

// TODO: Merge wrapper components (MarkdownWrapper & RawContentWrapper).
// Only config and part of render method is different.
@Radium
export class MarkdownWrapperImpl extends React.Component<IMarkdownProps> {

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.props.saveData(this.props.model, e.target.value);
    }

    render(): JSX.Element {
         return(
            <div style={this.props.style || null}>
                {/* This style is needed to hide preview tab of editor. */}
                <Radium.Style
                        scopeSelector="div"
                        rules={{
                            '.md-editor-tabs-item:nth-child(2n)': {
                                display: 'none !important',
                            },
                        }}
                />
                <textarea
                        onChange={this.handleChange}
                        className="markDownEditor"
                >
                    {this.props.value}
                </textarea>
                {/*
                    TODO: Remove the above <textarea /> and uncomment this when react-markdown-editor
                    adds React 16 support. It currently breaks as it tries to access React propTypes
                    <MarkdownEditor
                            className="markDownEditor"
                            initialContent={this.props.value}
                            iconsSet="font-awesome"
                            onContentChange={this.handleChange}
                    />
                */}
                <div style={topMargin}>
                    <strong style={labelStyle}>Output</strong>
                    <div style={this.props.value ? previewStyle : {display: 'none'}}>
                        <MarkDownPreview source={this.props.value} />
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IMarkdownStateProps, IMarkdownProps> =
        (state : {forms}, ownProps : IMarkdownProps) : {value : string} => {
    let data : string = state.forms || {};

    return {
        value : getNestedData(data, ownProps.model),
    };
};

let mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IMarkdownProps> =
        (dispatch: IDispatch): IDispatchProps => {
    return {
        saveData(model : string, value: string): void {
            dispatch(actions.change(model, value));
        },
    };
};

export const MarkdownWrapper : React.ComponentClass<IMarkdownProps> =
        connect(mapStateToProps, mapDispatchToProps)(MarkdownWrapperImpl);

const topMargin: CSS = {
    margin: '20px 0px 0px 0px',
};
const labelStyle: CSS = {
    margin: '0px 0px 0px -80px',
};
const previewStyle: CSS = {
    overflow: 'scroll',
    padding: '20px',
    border: '2px solid black',
    margin: '30px 0px 0px',
    height: '200px',
};
