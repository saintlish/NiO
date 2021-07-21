import { db } from "./DB.js";
export const LINK_PREFIX = "https://vk.com/";
export const WEBHOOK_REGEXP = /^https:\/\/(?:\w+\.)?discord(?:app)?\.com\/api\/webhooks\/([^]+)\/([^/]+)$/;
// eslint-disable-next-line require-await
export async function getResourceId(VK, resource) {
    if (!db.data[resource]) {
        db.data[resource] = {};
    }
    const cache = db.data[resource];
    if (cache?.id) {
        return cache.id;
    }
    return VK.resolveResource(resource)
        .then(({ id, type }) => type === "user" ?
        id
        :
            type === "group" ?
                -id
                :
                    null)
        .then((id) => {
        db.data[resource].id = id;
        db.write();
        return id;
    })
        .catch((error) => {
        console.error("[!] Произошла ошибка при получении ID-ресурса.");
        console.error(error);
        return null;
    });
}
export function getPostLink({ owner_id, id }) {
    return `${LINK_PREFIX}wall${owner_id}_${id}`;
}
export function getPostAuthor(post, profiles, groups) {
    const author = post.from_id > 0 ?
        profiles.filter(({ id }) => id === post.from_id)
        :
            groups.filter(({ id }) => id === Math.abs(post.from_id));
    return author.map((profile) => {
        const { name, photo_50, first_name, last_name } = profile;
        if (name) {
            return profile;
        }
        else {
            return {
                name: `${first_name} ${last_name}`,
                photo_50
            };
        }
    })[0];
}
// eslint-disable-next-line require-await
export async function getById(api, id) {
    return id ?
        id > 0 ?
            api.users.get({
                user_ids: String(id),
                fields: ["photo_50"]
            })
                .then(([{ first_name, last_name, photo_50 }]) => ({
                name: `${first_name} ${last_name}`,
                photo_50
            }))
            :
                api.groups.getById({
                    group_id: String(Math.abs(id))
                })
                    .then(([group]) => group)
        :
            null;
}
