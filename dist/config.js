import fs from "fs";
import path from "path";
import chokidar from "chokidar";
const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "config.json"), "utf-8"));
export const reLoadConfig = ()=>{
    let updated_config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "config.json"), "utf-8"));
    return config;
};
export const watcher = chokidar.watch("config.json", {
    persistent: true
});
export default config;
