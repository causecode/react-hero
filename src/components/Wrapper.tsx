import * as React from 'react';

/*
 * This Component is used to wrap Stateless Components in a div since React Test Utils cannot render a
 * Stateless Component directly while Testing.
 * https://github.com/facebook/react/issues/4692#issuecomment-163029873.
 */

export class Wrapper extends React.Component<{}, {}> {
    render(): JSX.Element {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}
