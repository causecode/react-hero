import * as React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';
import {DatePicker} from '../../Widgets';
import {IFilter} from "./IFilters";

export interface IDropDownFilter extends IFilter {
    possibleValues: Array<string>;
}

export interface IRangeFilter extends IFilter {
    type: 'integer' | 'date';
}

export interface IQueryFilter extends IFilter {
    fields: Array<string>;
}

export interface IPagedListFiltersProps extends React.Props<any> {
    clazz: any;
    content?: JSX.Element;
    dropdown?: IDropDownFilter | Array<IDropDownFilter>;
    range?: IRangeFilter | Array<IRangeFilter>;
    query?: IQueryFilter;
    children?: JSX.Element | JSX.Element[];
};

export default function PagedListFilters ({ dropdown, content, clazz, range, query, children }: IPagedListFiltersProps, {}) {
    let dropdownHTML, queryHTML, rangeHTML;
    /*
    if (dropdown) {
        dropdownHTML = getArrayFilterHTML(dropdown, getDropdownFilterHTML);
    }
    if (query) {
        queryHTML = getQueryHTML(query);
    }
    if (range) {
        rangeHTML = getArrayFilterHTML(range, getRangeFilterHTML);
    }

     * <Row>{queryHTML}</Row>
     <Row>{dropdownHTML}</Row>
     <Row>{rangeHTML}</Row> */

    return (
        <div className="flex">
            <Button> { content || <i className="fa fa-filter" /> } </Button>
            <Grid>
                {children}
            </Grid>
        </div>
    );

}
