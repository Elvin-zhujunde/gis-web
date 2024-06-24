import * as turf from "@turf/turf"

export const getRandomPoint = (geojson, poiNum) => turf.randomPoint(poiNum, { bbox: turf.bbox(geojson) })
export const getCenter = geojson => turf.center(geojson)
