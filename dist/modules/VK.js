import { VK as _VK, resolveResource } from "vk-io";
export class VK extends _VK {
    resolveResource(resource) {
        return resolveResource({
            resource,
            api: this.api
        });
    }
}
