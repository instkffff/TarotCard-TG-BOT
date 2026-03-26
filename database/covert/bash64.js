/* 字符串转base64 */

function stringToBase64(str) {
    // 对于浏览器环境
    if (typeof window !== 'undefined') {
        // 使用 TextEncoder 将字符串转换为 UTF-8 字节数组，然后进行 base64 编码
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const binaryString = String.fromCharCode(...data);
        return btoa(binaryString);
    }
    // 对于Node.js环境
    else if (typeof Buffer !== 'undefined') {
        return Buffer.from(str, 'utf8').toString('base64');
    }
    else {
        throw new Error('Environment not supported');
    }
}

/* Base64转字符串 */
function base64ToString(base64Str) {
    // 对于浏览器环境
    if (typeof window !== 'undefined') {
        const binaryString = atob(base64Str);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }
    // 对于Node.js环境
    else if (typeof Buffer !== 'undefined') {
        return Buffer.from(base64Str, 'base64').toString('utf8');
    }
    else {
        throw new Error('Environment not supported');
    }
}


/* const base64 = stringToBase64('102114191205|04[031921]06[02]07[10]18[0116]')

console.log(base64)

console.log(base64ToString(base64)) */

// 导出函数供外部使用
export { stringToBase64, base64ToString };