import * as React from 'react';
import * as Radium from 'radium';
import FontAwesome = require('react-fontawesome');
const RadiumFontAwesome: React.ComponentClass<any> = Radium(FontAwesome);

let errorTextStyle: React.CSSProperties = {
    color: 'red',
    fontWeight: 700,
    lineHeight: '100px',
};

function ErrorPage({message}: {message: string}): JSX.Element {
    return (
        <div style={errorTextStyle}>
            <RadiumFontAwesome style={{verticalAlign: 'middle'}} name="exclamation-circle" size="2x"/>
            <span>{message}</span>
        </div>
    );
}

export {ErrorPage};
