import { FunctionComponent } from "react";

export interface IRouters {
    path: string;
    layout?: FunctionComponent | null;
    element: FunctionComponent;
    children?: IRouters[] | null;
    Protected?: FunctionComponent;
}
