import { Handler } from "./modules/Handler.js";
// @ts-ignore
import config from "../config.json";
const { clusters } = config;
console.log("[VK2Discord] Запущен.");
clusters.forEach((cluster, index) => new Handler({
    ...cluster,
    index: index + 1
})
    .init());
