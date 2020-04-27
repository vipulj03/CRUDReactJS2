import { SPHttpClient } from '@microsoft/sp-http';

export interface ICrudReactJsProps {
  listName: string;
  siteURL: string;
  spHttpClient: SPHttpClient;
}
