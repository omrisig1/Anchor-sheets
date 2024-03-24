import {Cell} from "../../types/types";
import log from "@ajar/marker";
import {getDB} from "../../db/db.connection";
import {getFunctionParameters, isLookUp, lookup} from "./sheets.util";
class Column {
    name : string | undefined;
    cells: Cell[] | undefined;

}

// column
// name
// cells : cell[]
// setCell
//