import * as React from 'react';

export interface IBlogAction {
    instance: {
        id: number,
        author: string,
        email: string,
        age: number,
    };
}

export class BlogAction extends React.Component<IBlogAction, void> {

    render(): JSX.Element {
        return (
            <button>
                testActionForBlog
            </button>
        );
    }
}
