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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'CrudReactJsWebPartStrings';
import CrudReactJs from './components/CrudReactJs';
var CrudReactJsWebPart = /** @class */ (function (_super) {
    __extends(CrudReactJsWebPart, _super);
    function CrudReactJsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrudReactJsWebPart.prototype.render = function () {
        var element = React.createElement(CrudReactJs, {
            listName: this.properties.listName,
            siteURL: this.context.pageContext.web.absoluteUrl,
            spHttpClient: this.context.spHttpClient
        });
        ReactDom.render(element, this.domElement);
    };
    CrudReactJsWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(CrudReactJsWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    CrudReactJsWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('listName', {
                                    label: strings.ListNameFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return CrudReactJsWebPart;
}(BaseClientSideWebPart));
export default CrudReactJsWebPart;
//# sourceMappingURL=CrudReactJsWebPart.js.map