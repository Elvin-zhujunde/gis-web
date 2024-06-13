import * as turf from "@turf/turf"

// 生成随机点
const randomPoint = turf.randomPoint()

// 定义半径和边数
const radius = 10 // 可以根据需要调整半径
const sides = 6 // 可以根据需要调整边数
// 计算外接矩形的坐标点
const [x, y] = randomPoint.features[0].geometry.coordinates
const bbox = [x - radius, y - radius, x + radius, y + radius]

// 生成随机面
const randomPolygon = turf.polygon([
    [
        turf.destination(turf.point([x, y]), radius, 0, "meters").geometry.coordinates, // 起始点
        ...Array.from(
            { length: sides },
            (_, i) =>
                turf.destination(turf.point([x, y]), radius, i * (360 / sides) - 90, "meters").geometry.coordinates,
        ), // 其他顶点
        turf.destination(turf.point([x, y]), radius, 0, "meters").geometry.coordinates, // 闭合多边形
    ],
])

console.log(randomPolygon)
