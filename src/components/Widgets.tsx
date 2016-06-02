import * as React from 'react';

export const Title = (props) => {
	return (
		<div className="title">{props.children}</div>
	)
};

export const Description = (props) => {
	return (
		<div className="description">{props.children}</div>
	)
};

export const Content = (props) => {
	return (
		<div className="widget-content">{props.children}</div>
	)
};

export const ButtonList = (props) => {
	let classes = "button-list ";
	classes += props.highlightOnHover ? "highlight" : "";
	return (
		<ul className={classes}>{props.children}</ul>
	)
};

export const ButtonListItem = (props) => {
	let classes = "button-list-item ";
	classes += props.highlightOnHover ? "highlight-on-hover" : "";
	return (
		<li className={classes}>{props.children}</li>
	)
};