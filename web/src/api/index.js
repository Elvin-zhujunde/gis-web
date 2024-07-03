import { getRandomPoint, getRandomPolygon, getRandomLineString, getCenter } from "@/tool/useTurf"
import chinajson from "/public/json/china.json"

export const getGeojsonById = async (id, num) => {
    switch (id) {
        case "randomPoint":
            return await getRandomPoint(chinajson, num || 100)
        case "randomPolygon":
            return await getRandomPolygon(chinajson, num || 1)

        default:
            break
    }
}
