import { Schema, Sheet } from "../../types/types";
import { Sheet as SheetC } from "./Sheet";
declare class App {
    sheets: {
        [p: string]: Sheet;
    };
    constructor();
    createSheet(json: Schema): string;
    getSheetByID(idToRead: string): SheetC;
    logSheet(id: string): SheetC;
}
declare const S2: App;
export default S2;
