import * as React from 'react';
import {FormControl} from 'react-bootstrap';
const classNames: any = require<any>('classnames');

export const Title = (props): JSX.Element => {
    return (
        <div className="title">{props.children}</div>
    );
};

export const Description = (props): JSX.Element => {
    return (
        <div className="description">{props.children}</div>
    );
};

export const Content = (props): JSX.Element => {
    return (
        <div className="widget-content">{props.children}</div>
    );
};

export const ButtonList = (props): JSX.Element => {
    let classes : string[] = ['button-list '];
    if (props.highlightOnHover) {
        classes.push('highlight');
    }
    return (
        <ul className={classNames(classes)}>{props.children}</ul>
    );
};

export const ButtonListItem = (props): JSX.Element => {
    let classes = ['button-list-item '];
    if (props.highlightOnHover) {
        classes.push('highlight-on-hover');
    }
    return (
        <li className={classNames((classes))}>{props.children}</li>
    );
};

