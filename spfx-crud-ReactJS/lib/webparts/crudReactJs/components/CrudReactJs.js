var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './CrudReactJs.module.scss';
import { SPHttpClient } from '@microsoft/sp-http';
var CrudReactJs = /** @class */ (function (_super) {
    __extends(CrudReactJs, _super);
    function CrudReactJs(props, state) {
        var _this = _super.call(this, props) || this;
        _this.listItemEntityTypeName = undefined;
        _this.state = {
            status1: _this.isListConfigured(_this.props) ? 'Please configure list in Web Part properties' : 'Ready',
            items: []
        };
        return _this;
    }
    CrudReactJs.prototype.componentWillReceiveProps = function (nextProps) {
        this.listItemEntityTypeName = undefined;
        this.setState({
            status1: this.isListConfigured(nextProps) ? 'Please configure list in Web Part properties' : 'Ready',
            items: []
        });
    };
    CrudReactJs.prototype.render = function () {
        var _this = this;
        var items = this.state.items.map(function (item, i) {
            return (React.createElement("li", null,
                item.Title,
                " (",
                item.Id,
                ") "));
        });
        return (React.createElement("div", { className: styles.crudReactJs },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement("span", { className: styles.title }, "CRUD Operations"),
                        React.createElement("p", { className: styles.subTitle }, "using React JS."),
                        React.createElement("div", { className: "ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row },
                            React.createElement("div", { className: 'ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1' },
                                React.createElement("a", { href: "#", className: "" + styles.button, onClick: function () { return _this.createItem(); } },
                                    React.createElement("span", { className: styles.label }, "Create item")),
                                "\u00A0",
                                React.createElement("a", { href: "#", className: "" + styles.button, onClick: function () { return _this.readItem(); } },
                                    React.createElement("span", { className: styles.label }, "Read item")))),
                        React.createElement("div", { className: "ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row },
                            React.createElement("div", { className: 'ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1' },
                                React.createElement("a", { href: "#", className: styles.button + " ", onClick: function () { return _this.updateItem(); } },
                                    React.createElement("span", { className: styles.label }, "Update item")),
                                "\u00A0",
                                React.createElement("a", { href: "#", className: styles.button + " ", onClick: function () { return _this.deleteItem(); } },
                                    React.createElement("span", { className: styles.label }, "Delete item")))),
                        React.createElement("div", { className: "ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row },
                            React.createElement("div", { className: 'ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1' },
                                this.state.status1,
                                React.createElement("ul", null, items))))))));
    };
    CrudReactJs.prototype.createItem = function () {
        var _this = this;
        this.setState({
            status1: 'Creating item...',
            items: []
        });
        this.getListItemEntityTypeName()
            .then(function (listItemEntityTypeName) {
            var body = JSON.stringify({
                '__metadata': {
                    'type': listItemEntityTypeName
                },
                'Title': "Item " + new Date()
            });
            return _this.props.spHttpClient.post(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')/items", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': ''
                },
                body: body
            });
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (item) {
            _this.setState({
                status1: "Item '" + item.Title + "' (ID: " + item.Id + ") successfully created",
                items: []
            });
        }, function (error) {
            _this.setState({
                status1: 'Error while creating the item: ' + error,
                items: []
            });
        });
    };
    CrudReactJs.prototype.readItem = function () {
        var _this = this;
        this.setState({
            status1: 'Loading latest items...',
            items: []
        });
        this.getLatestItemId()
            .then(function (itemId) {
            if (itemId === -1) {
                throw new Error('No items found in the list');
            }
            _this.setState({
                status1: "Loading information about item ID: " + itemId + "...",
                items: []
            });
            return _this.props.spHttpClient.get(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')/items(" + itemId + ")?$select=Title,Id", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            });
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (item) {
            _this.setState({
                status1: "Item ID: " + item.Id + ", Title: " + item.Title,
                items: []
            });
        }, function (error) {
            _this.setState({
                status1: 'Loading latest item failed with error: ' + error,
                items: []
            });
        });
    };
    CrudReactJs.prototype.updateItem = function () {
        var _this = this;
        this.setState({
            status1: 'Loading latest items...',
            items: []
        });
        var latestItemId = undefined;
        var etag = undefined;
        var listItemEntityTypeName = undefined;
        this.getListItemEntityTypeName()
            .then(function (listItemType) {
            listItemEntityTypeName = listItemType;
            return _this.getLatestItemId();
        })
            .then(function (itemId) {
            if (itemId === -1) {
                throw new Error('No items found in the list');
            }
            latestItemId = itemId;
            _this.setState({
                status1: "Loading information about item ID: " + latestItemId + "...",
                items: []
            });
            return _this.props.spHttpClient.get(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')/items(" + latestItemId + ")?$select=Id", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            });
        })
            .then(function (response) {
            etag = response.headers.get('ETag');
            return response.json();
        })
            .then(function (item) {
            _this.setState({
                status1: "Updating item with ID: " + latestItemId + "...",
                items: []
            });
            var body = JSON.stringify({
                '__metadata': {
                    'type': listItemEntityTypeName
                },
                'Title': "Item " + new Date()
            });
            return _this.props.spHttpClient.post(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')/items(" + item.Id + ")", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': '',
                    'IF-MATCH': etag,
                    'X-HTTP-Method': 'MERGE'
                },
                body: body
            });
        })
            .then(function (response) {
            _this.setState({
                status1: "Item with ID: " + latestItemId + " successfully updated",
                items: []
            });
        }, function (error) {
            _this.setState({
                status1: "Error updating item: " + error,
                items: []
            });
        });
    };
    CrudReactJs.prototype.deleteItem = function () {
        var _this = this;
        if (!window.confirm('Are you sure you want to delete the latest item?')) {
            return;
        }
        this.setState({
            status1: 'Loading latest items...',
            items: []
        });
        var latestItemId = undefined;
        var etag = undefined;
        this.getLatestItemId()
            .then(function (itemId) {
            if (itemId === -1) {
                throw new Error('No items found in the list');
            }
            latestItemId = itemId;
            _this.setState({
                status1: "Loading information about item ID: " + latestItemId + "...",
                items: []
            });
            return _this.props.spHttpClient.get(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')/items(" + latestItemId + ")?$select=Id", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            });
        })
            .then(function (response) {
            etag = response.headers.get('ETag');
            return response.json();
        })
            .then(function (item) {
            _this.setState({
                status1: "Deleting item with ID: " + latestItemId + "...",
                items: []
            });
            return _this.props.spHttpClient.post(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')/items(" + item.Id + ")", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': '',
                    'IF-MATCH': etag,
                    'X-HTTP-Method': 'DELETE'
                }
            });
        })
            .then(function (response) {
            _this.setState({
                status1: "Item with ID: " + latestItemId + " successfully deleted",
                items: []
            });
        }, function (error) {
            _this.setState({
                status1: "Error deleting item: " + error,
                items: []
            });
        });
    };
    CrudReactJs.prototype.getLatestItemId = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.props.spHttpClient.get(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')/items?$orderby=Id desc&$top=1&$select=id", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            })
                .then(function (response) {
                return response.json();
            }, function (error) {
                reject(error);
            })
                .then(function (response) {
                if (response.value.length === 0) {
                    resolve(-1);
                }
                else {
                    resolve(response.value[0].Id);
                }
            });
        });
    };
    CrudReactJs.prototype.getListItemEntityTypeName = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.listItemEntityTypeName) {
                resolve(_this.listItemEntityTypeName);
                return;
            }
            _this.props.spHttpClient.get(_this.props.siteURL + "/_api/web/lists/getbytitle('" + _this.props.listName + "')?$select=ListItemEntityTypeFullName", SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            })
                .then(function (response) {
                return response.json();
            }, function (error) {
                reject(error);
            })
                .then(function (response) {
                _this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
                resolve(_this.listItemEntityTypeName);
            });
        });
    };
    CrudReactJs.prototype.isListConfigured = function (props) {
        return props.listName === undefined ||
            props.listName === null ||
            props.listName.length === 0;
    };
    return CrudReactJs;
}(React.Component));
export default CrudReactJs;
//# sourceMappingURL=CrudReactJs.js.map