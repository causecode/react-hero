"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var modelService_1 = require("../../../utils/modelService");
var react_bootstrap_1 = require("react-bootstrap");
var ReduxForm = require('redux-form');
var classNames = require('classnames');
var InnerFilterForm = (function (_super) {
    __extends(InnerFilterForm, _super);
    function InnerFilterForm() {
        var _this = _super.apply(this, arguments) || this;
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.sendFilters(_this.props.resource);
        };
        return _this;
    }
    InnerFilterForm.prototype.sendFilters = function (resource) {
        modelService_1.ModelService.getModel(resource).list();
    };
    InnerFilterForm.prototype.render = function () {
        var _a = this.props, filtersOpen = _a.filtersOpen, children = _a.children, fields = _a.fields;
        var childrenWithProps = React.Children.map(children, function (child) {
            var paramName = child.props.paramName;
            var filterName = child.type.name;
            if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
                var from = paramName + "From";
                var to = paramName + "To";
                if (fields[from] && fields[to]) {
                    return React.cloneElement(child, {
                        fields: [fields[from], fields[to]]
                    });
                }
                else {
                    return child;
                }
            }
            else {
                if (fields[paramName]) {
                    return React.cloneElement(child, {
                        fields: [fields[paramName]]
                    });
                }
                else {
                    return child;
                }
            }
        });
        var hideClass = filtersOpen ? '' : 'hide';
        return (React.createElement("form", { className: classNames('form-inline', 'filter-form', 'stick-left', hideClass), onSubmit: this.handleSubmit },
            childrenWithProps,
            React.createElement(react_bootstrap_1.Button, { className: "filter-button", bsStyle: "primary", type: "submit" }, "Submit")));
    };
    return InnerFilterForm;
}(React.Component));
exports.InnerFilterForm = InnerFilterForm;
InnerFilterForm.defaultProps = {
    filtersOpen: false,
    fields: []
};
function mapStateToProps(state) {
    return {
        filtersOpen: state.data.get('filtersOpen')
    };
}
function createFilterForm(resource) {
    return ReduxForm.reduxForm({
        form: resource + "Filters",
        destroyOnUnmount: false
    }, mapStateToProps)(InnerFilterForm);
}
exports.createFilterForm = createFilterForm;
//# sourceMappingURL=DynamicForm.js.map