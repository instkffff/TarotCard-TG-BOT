// 用库完成 字符串转唯一md5
import { createHash } from 'crypto';

/**
 * 将字符串转换为MD5哈希值
 * @param {string} str - 需要转换的字符串
 * @returns {string} - 返回MD5哈希值（32位十六进制字符串）
 */
function stringToMD5(str) {
    return createHash('md5').update(str).digest('hex');
}

/* // 示例用法
console.log(stringToMD5('hello world')); // 5d41402abc4b2a76b9719d911017c592 */

export { stringToMD5 };