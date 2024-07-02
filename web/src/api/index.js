import { getRandomPoint } from "@/tool/useTurf"
import chinajson from "/public/json/china.json"

export const getGeojsonById = async () => await getRandomPoint(chinajson, 100)
