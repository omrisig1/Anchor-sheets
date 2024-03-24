import {Schema, Sheet} from "../../types/types";
import log from "@ajar/marker";
import {getDB} from "../../db/db.connection";
import {Sheet as SheetC} from "./Sheet";
import {getFunctionParameters, isLookUp, lookup, lookup2} from "./sheets.util";
import validationException from "../../exceptions/validation.exception";
class App {
    sheets : { [p: string]: Sheet } ;

    constructor() {
        this.sheets = getDB();
    }

    createSheet(json: Schema) {
        const method = "App/createSheet"
        log.blue(`${method} - start`);
        const id = (Object.keys(this.sheets).length+1).toString();
        this.sheets[id] = {
            schema: json
        };
        log.blue(`${method} - end`);
        return id;
    }

    getSheetByID(idToRead: string) : SheetC {
        const method = "App/getSheetByID"
        log.blue(`${method} - start`);
        log.blue(`${method} calling logSheet.`);
        return this.logSheet(idToRead);
    }

    logSheet(id: string) {
        const method = "App/logSheet"
        log.blue(`${method} - start`);
       // const database = getDB();
        const db_sheet = this.sheets[id];
        const columns = db_sheet.columns?.map(column => {
            return {
                name : column.name,
                cells : column.cells.map(cell => {
                    let cell_value = cell.value;
                    if(isLookUp(cell_value)) {
                        while(isLookUp(cell_value)) {
                            const loopup_cell_coor = getFunctionParameters(cell_value);
                            const formattedColumnName = loopup_cell_coor[0].replace(/^'(.*)'$/, '$1');
                            if(formattedColumnName+loopup_cell_coor[1] == column.name+cell.number) {
                                throw new validationException(
                                    400,
                                    `Circular Reference found.`
                                );
                            } else if(isLookUp(cell_value)){
                                cell_value = lookup2(db_sheet.columns, loopup_cell_coor);
                                if(!cell_value) {
                                    throw "Error with lookup";
                                }
                            }
                        }
                        cell["view_value"] = cell_value;
                    }
                    return new Cell({
                        number : cell.number,
                        value : cell.view_value
                    })
                })
            }
        })
        let sheet_logger = new SheetC({
            schema : db_sheet.schema,
            columns : columns
        })
        log.blue(`${method} - end`);
        return sheet_logger
    }

}

const S2 = new App();
export default S2;

// App
// sheets : sheet[]
// createsheet -> add  empty object to sheet
//
// Sheet
// columns : column[]
//
// column
// name
// cells : cell[]
// setCell
//
// Cell
// number
// value