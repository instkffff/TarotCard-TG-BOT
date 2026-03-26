/* 求解今日恒星、行星处于星座位置

包含 日 月 金 木 水 火 土 */

import planetposition from 'astronomia/planetposition'
import data from 'astronomia/data'

import moonposition from 'astronomia/moonposition'

function getPreciseJDE(year, month, day, hour, min, sec) {
    // 这是一个简化版的日期转儒略日公式
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (year + 4716)) + 
               Math.floor(30.6001 * (month + 1)) + 
               day + B - 1524.5;
    
    // 加入时间的小数部分
    const timeFraction = (hour + min / 60 + sec / 3600) / 24;
    return JD + timeFraction;
}

function dateToJDE(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const min = date.getUTCMinutes();
    const sec = date.getUTCSeconds();

    // 这里调用你之前的 getPreciseJDE 逻辑
    return getPreciseJDE(year, month, day, hour, min, sec);
}

// 辅助函数：处理坐标转换逻辑
const toGeocentric = (pPos, ePos) => {
    // 1. 将行星日心坐标转为直角坐标 (Heliocentric XYZ)
    const px = pPos.range * Math.cos(pPos.lat) * Math.cos(pPos.lon);
    const py = pPos.range * Math.cos(pPos.lat) * Math.sin(pPos.lon);
    const pz = pPos.range * Math.sin(pPos.lat);

    // 2. 将地球日心坐标转为直角坐标 (Earth Heliocentric XYZ)
    const ex = ePos.range * Math.cos(ePos.lat) * Math.cos(ePos.lon);
    const ey = ePos.range * Math.cos(ePos.lat) * Math.sin(ePos.lon);
    const ez = ePos.range * Math.sin(ePos.lat);

    // 3. 向量相减得到地心直角坐标 (Geocentric XYZ)
    const gx = px - ex;
    const gy = py - ey;
    const gz = pz - ez;

    // 4. 转回球面坐标 (LBR)
    const range = Math.sqrt(gx * gx + gy * gy + gz * gz);
    const lon = Math.atan2(gy, gx);
    const lat = Math.asin(gz / range);

    return {
        _ra: lon < 0 ? lon + 2 * Math.PI : lon, // 确保经度在 0 ~ 2π
        _dec: lat,
        range: range,
        elongation: undefined
    };
};

// 导出函数而不是常量
function getStarLocations(date = new Date()) {
    const j_today = dateToJDE(date);

    const mars = new planetposition.Planet(data.mars)
    const jupiter = new planetposition.Planet(data.jupiter)
    const venus = new planetposition.Planet(data.venus)
    const mercury = new planetposition.Planet(data.mercury)
    const saturn = new planetposition.Planet(data.saturn)
    const earth = new planetposition.Planet(data.earth)

    // 地球黄道
    const moon_coord = moonposition.position(j_today)

    // 太阳黄道
    const earth_coord = earth.position(j_today)
    const mars_coord = mars.position(j_today)
    const jupiter_coord = jupiter.position(j_today)
    const venus_coord = venus.position(j_today)
    const mercury_coord = mercury.position(j_today)
    const saturn_coord = saturn.position(j_today)

    const sun_geo = {
        _ra: (earth_coord.lon + Math.PI) % (2 * Math.PI),
        _dec: -earth_coord.lat,
        range: earth_coord.range,
        elongation: undefined
    };

    const mars_geo = toGeocentric(mars_coord, earth_coord);
    const jupiter_geo = toGeocentric(jupiter_coord, earth_coord);
    const venus_geo = toGeocentric(venus_coord, earth_coord);
    const mercury_geo = toGeocentric(mercury_coord, earth_coord);
    const saturn_geo = toGeocentric(saturn_coord, earth_coord);

    const moon_geo = {
        _ra: moon_coord.lon,
        _dec: moon_coord.lat,
        range: moon_coord.range,
        elongation: undefined
    };

    return { sun_geo, mars_geo, jupiter_geo, venus_geo, mercury_geo, saturn_geo, moon_geo };
}

export { getStarLocations }