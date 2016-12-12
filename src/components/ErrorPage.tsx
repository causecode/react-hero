import * as React from 'react';

let errorTextStyle = {
    color: 'red',
    fontWeight: 700,
    lineHeight: '100px',
};

function ErrorPage({ message }: {message: string}): JSX.Element {
    return (
        <div style={errorTextStyle}>
            <i style={{verticalAlign: 'middle'}} className="fa fa-exclamation-circle fa-2x" />
            <span>{message}</span>
        </div>
    );
}

export {ErrorPage};
