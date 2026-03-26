import { getStarLocations } from './starLocation.js';
import { zodiac_pool } from '../cardPick/cardPool.js';


/* 
zodiac_pool
"白羊座", "金牛座", "双子座", "巨蟹座", 
"狮子座", "处女座", "天秤座", "天蝎座", 
"射手座", "摩羯座", "水瓶座", "双鱼座" 
*/

/* 
star_pool 
"水星", "月亮", "金星", "木星", "火星", "太阳", "土星"
*/

/**
 * 计算星座位置
 * @param {number} radians - 黄经弧度值 (_ra)
 */
function calculateZodic(radians) {
    // 验证输入参数
    if (typeof radians !== 'number' || isNaN(radians)) {
        return {
            zodicID: '未知',
            degree: 0
        };
    }
    
    // 1. 弧度转角度
    let degrees = (radians * 180) / Math.PI;
    
    // 2. 规范化到 0-360 度
    degrees = degrees % 360;
    if (degrees < 0) degrees += 360;

    // 3. 计算宫位索引 (每30度一个宫)
    const index = Math.floor(degrees / 30);
    
    // 4. 计算在该星座内的剩余度数
    const degreeInSign = degrees % 30;

    return {
        zodicID: zodiac_pool[index],
        degree: parseFloat(degreeInSign.toFixed(2))
    };
}
/**
 * 获取当前星球位置信息
 */
function getStarPositions() {
    const { sun_geo, moon_geo, mercury_geo, venus_geo, mars_geo, jupiter_geo, saturn_geo } = getStarLocations();
    
    // 按照 star_pool 顺序: "水星", "月亮", "金星", "木星", "火星", "太阳", "土星"
    const planets = [
        { id: 1, coord: mercury_geo },
        { id: 2, coord: moon_geo },
        { id: 3, coord: venus_geo },
        { id: 10, coord: jupiter_geo },
        { id: 16, coord: mars_geo },
        { id: 19, coord: sun_geo },
        { id: 21, coord: saturn_geo }
    ];

    // 过滤掉坐标数据为空的星球
    const validPlanets = planets.filter(planet => planet.coord && typeof planet.coord._ra === 'number');
    
    const results = validPlanets.map(planet => {
        const info = calculateZodic(planet.coord._ra);
        return { id: planet.id, ...info };
    });
    
    // 将结果转换为以 zodicID 为索引的对象
    const groupedResults = {};
    results.forEach(result => {
        const { zodicID, id, degree } = result;
        if (!groupedResults[zodicID]) {
            groupedResults[zodicID] = { id: [], degree: [] };
        }
        groupedResults[zodicID].id.push(id);
        groupedResults[zodicID].degree.push(degree);
    });
    
    return groupedResults;
}

/* console.log(getStarPositions()); */

export { getStarPositions };