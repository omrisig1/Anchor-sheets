import log from "@ajar/marker";
export function isLookUp(input) {
    const method = "util/isLookUp";
    log.magenta(`${method} - start`);
    const pattern = /^lookup\('[A-Za-z]+',\d+\)$/;
    log.magenta(`${method} - end`);
    return pattern.test(input); // Test if the input matches the pattern
}
export function getFunctionParameters(input) {
    const method = "util/getFunctionParameters";
    log.magenta(`${method} - start`);
    try {
        const [functionName, ...params] = input.split("(");
        const parsedParams = params.join("(").slice(0, -1); // Remove trailing ")"
        log.magenta(`${method} - end`);
        return parsedParams.split(",").map((param)=>param.trim());
    } catch (err) {
        throw "Error getting function parameters.";
    }
}
export function lookup(sheet, cell_location) {
    var _sheet_columns;
    const method = "util/lookup";
    log.magenta(`${method} - start`);
    let result;
    const formattedColumnName = cell_location[0].replace(/^'(.*)'$/, "$1");
    const column = (_sheet_columns = sheet.columns) === null || _sheet_columns === void 0 ? void 0 : _sheet_columns.find((col)=>col.name === formattedColumnName);
    if (column) {
        const cell = column.cells.find((cell)=>cell.number == cell_location[1]);
        if (cell) {
            result = cell["value"];
        }
    }
    log.magenta(`${method} - end`);
    return result;
}
