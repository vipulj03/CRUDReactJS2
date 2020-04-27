import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CrudReactJsWebPartStrings';
import CrudReactJs from './components/CrudReactJs';
import { ICrudReactJsProps } from './components/ICrudReactJsProps';

export interface ICrudReactJsWebPartProps {
  listName: string;
}

export default class CrudReactJsWebPart extends BaseClientSideWebPart <ICrudReactJsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICrudReactJsProps> = React.createElement(
      CrudReactJs,
      {
        listName: this.properties.listName,
        siteURL: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
