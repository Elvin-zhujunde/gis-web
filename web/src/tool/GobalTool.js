export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
export function isEmpty(value) {
    if (value === null || value === undefined) {
        return true
    }
    if (Array.isArray(value) || typeof value === "string") {
        return value.length === 0
    }
    if (typeof value === "object") {
        if ("length" in value && value.length === 0) {
            return true
        }
        return Object.keys(value).length === 0
    }
    return false
}
