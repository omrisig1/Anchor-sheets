import { Cell, Column, Schema } from "../../types/types";
export declare class Sheet {
    columns?: Column[];
    schema?: Schema;
    constructor(props: any);
    setCell(column_name: string, cell_data: Cell): any;
}
