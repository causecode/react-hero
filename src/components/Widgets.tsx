import * as React from 'react';
import {FormControl} from 'react-bootstrap';
const classNames: any = require<any>('classnames');

export const Title = (props) => {
    return (
        <div className="title">{props.children}</div>
    );
};

export const Description = (props) => {
    return (
        <div className="description">{props.children}</div>
    );
};

export const Content = (props) => {
    return (
        <div className="widget-content">{props.children}</div>
    );
};

export const ButtonList = (props) => {
    let classes : string[] = ['button-list '];
    if (props.highlightOnHover) {
        classes.push('highlight');
    }
    return (
        <ul className={classNames(classes)}>{props.children}</ul>
    );
};

export const ButtonListItem = (props) => {
    let classes = ['button-list-item '];
    if (props.highlightOnHover) {
        classes.push('highlight-on-hover');
    }
    return (
        <li className={classNames((classes))}>{props.children}</li>
    );
};

