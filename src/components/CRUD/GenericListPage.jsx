"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PagedList_1 = require("../../components-stateful/PagedList");
var GenericListPage = (function (_super) {
    __extends(GenericListPage, _super);
    function GenericListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericListPage.prototype.render = function () {
        return (<div className="generic-list-page">
                <PagedList_1.PagedList resource={this.props.resource} max={20}/>
            </div>);
    };
    return GenericListPage;
}(React.Component));
GenericListPage.defaultProps = {
    resource: '',
};
exports.GenericListPage = GenericListPage;
