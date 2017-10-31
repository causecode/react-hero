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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var constants_1 = require("../../constants");
var KeywordMatcher = (function (_super) {
    __extends(KeywordMatcher, _super);
    function KeywordMatcher() {
        var _this = _super.call(this) || this;
        _this.extractKeyword = function () {
            var allMetaTags = document.getElementsByTagName('meta');
            var keywords = [];
            if (allMetaTags && Object.keys(allMetaTags).length !== 0) {
                Object.keys(allMetaTags).forEach(function (key) {
                    if (key.toLowerCase() === constants_1.KEYWORDS) {
                        var keywordTags = allMetaTags[key].content.split(',');
                        keywordTags = keywordTags.map(function (value) { return value.trim(); });
                        keywords.push.apply(keywords, keywordTags);
                    }
                });
            }
            return keywords;
        };
        _this.state = { keywords: [] };
        return _this;
    }
    KeywordMatcher.prototype.componentDidMount = function () {
        var allKeywords = this.extractKeyword();
        var keywords = this.state.keywords;
        if (allKeywords.length !== keywords.length && allKeywords.every(function (value, key) { return value !== keywords[key]; })) {
            this.setState({ keywords: allKeywords });
        }
    };
    KeywordMatcher.prototype.render = function () {
        var keywords = this.state.keywords;
        var match = this.props.match;
        if (typeof (match) === 'string' && keywords.indexOf(match) > -1
            || typeof (match) === 'object' && keywords.some(function (value) { return match.indexOf(value) > -1; })) {
            return (React.createElement("div", null, this.props.children));
        }
        return null;
    };
    KeywordMatcher = __decorate([
        Radium
    ], KeywordMatcher);
    return KeywordMatcher;
}(React.Component));
exports.KeywordMatcher = KeywordMatcher;
//# sourceMappingURL=KeywordMatcher.js.map