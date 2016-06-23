import {FieldProp} from "redux-form";
export interface IFilter {
	label?: string;
	paramName?: string;
	offset?: number;
	sort?: 'asc' | 'desc';
	fields?: FieldProp | FieldProp[];
}
