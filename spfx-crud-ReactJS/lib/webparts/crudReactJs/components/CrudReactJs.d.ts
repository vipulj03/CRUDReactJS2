import * as React from 'react';
import { ICrudReactJsProps } from './ICrudReactJsProps';
import { IReactCrudState } from './ICrudReactJsState';
export default class CrudReactJs extends React.Component<ICrudReactJsProps, IReactCrudState> {
    private listItemEntityTypeName;
    constructor(props: ICrudReactJsProps, state: IReactCrudState);
    componentWillReceiveProps(nextProps: ICrudReactJsProps): void;
    render(): React.ReactElement<ICrudReactJsProps>;
    private createItem;
    private readItem;
    private updateItem;
    private deleteItem;
    private getLatestItemId;
    private getListItemEntityTypeName;
    private isListConfigured;
}
//# sourceMappingURL=CrudReactJs.d.ts.map