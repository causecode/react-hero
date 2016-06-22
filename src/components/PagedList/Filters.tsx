import * as React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';

export interface IFilter {
    name: string;
}

export interface IDropDownFilter extends IFilter {
    possibleValues: Array<string>;
}

export interface IRangeFilter extends IFilter {
    //from: number;
    //to: number;
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
    //dateRange: IDateRange | Array<IDateRange>;
    query?: IQueryFilter;
};

let getArrayFilterHTML = (filter, filterHTML) => {
    console.log("filter",filter);
    console.log("filterHTML",filterHTML);
    return (filter instanceof Array) ? filter.map(filterInstance => {
        return (
            <div key={filter.indexOf(filterInstance)}>{filterHTML(filterInstance)}</div>
        )}) : filterHTML(filter);
};

let getDropdownFilterHTML = (dropDownFilter) => {
     return(
         <section>
            <strong>{ dropDownFilter.name } </strong>
            <select>
                { dropDownFilter.possibleValues.map(value => {
                    return (
                        <option key={dropDownFilter.possibleValues.indexOf(value)} value={value}>{value}</option>
                    )
                }) }
            </select>
         </section>
    );
};


export default class PagedListFilters extends React.Component(IPagedListFiltersProps, {}) {
    // dropdown, range, dateRange, query
    let dropdownHTML = getArrayFilterHTML(dropdown, getDropdownFilterHTML);
    //let dropdownHTML = getArrayFilterHTML(range, getRangeFilterHTML);

    return (
        <div className="flex">
            <Button onClick={ showFilter }> { content || <i className="fa fa-filter" /> } </Button>
            <Grid>
                <Row>{dropdownHTML}</Row>
            </Grid>
        </div>
    )
}