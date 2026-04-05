const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');
const path = require('path');

// 读取 my_links.txt 文件内容
const linksContent = fs.readFileSync('./my_links.txt', 'utf8');

// 按行分割并清理空白行和空白字符
const imageUrls = linksContent
    .split('\n')
    .map(line => line.trim())           // 去除首尾空白字符
    .filter(line => line.length > 0);   // 过滤空行

// 创建 tarot 目录（如果不存在）
if (!fs.existsSync('./tarot')) {
    fs.mkdirSync('./tarot');
}

// 下载单个图片的函数
function downloadImage(imageUrl, outputPath) {
    return new Promise((resolve, reject) => {
        const parsedUrl = url.parse(imageUrl);
        const client = parsedUrl.protocol === 'https:' ? https : http;

        const file = fs.createWriteStream(outputPath);

        const request = client.get(imageUrl, (response) => {
            if (response.statusCode !== 200) {
                console.error(`下载失败: ${response.statusCode} - ${imageUrl}`);
                reject(new Error(`下载失败: ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`图片已成功下载到: ${outputPath}`);
                resolve();
            });

            file.on('error', (err) => {
                fs.unlink(outputPath, () => {});
                console.error(`文件写入错误: ${err.message}`);
                reject(err);
            });
        });

        request.on('error', (err) => {
            console.error(`请求错误: ${err.message}`);
            reject(err);
        });

        request.setTimeout(30000, () => {
            request.abort();
            console.error('请求超时');
            reject(new Error('请求超时'));
        });
    });
}

// 从URL中提取文件名
function getFilenameFromUrl(imageUrl) {
    const parsedUrl = url.parse(imageUrl);
    let filename = path.basename(parsedUrl.pathname);
    
    // 如果文件名中包含查询参数，则去除它们
    if (filename.includes('?')) {
        filename = filename.split('?')[0];
    }
    
    // 如果没有扩展名，默认为.jpg
    if (!path.extname(filename)) {
        filename = `${filename}.jpg`;
    }
    
    return filename;
}

// 下载所有图片
async function downloadAllImages() {
    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const filename = getFilenameFromUrl(imageUrl);
        const outputPath = path.join('./tarot', filename);
        
        console.log(`正在下载 (${i + 1}/${imageUrls.length}): ${imageUrl}`);
        
        try {
            await downloadImage(imageUrl, outputPath);
        } catch (error) {
            console.error(`下载失败 ${imageUrl}:`, error.message);
        }
    }
    
    console.log('所有图片下载完成！');
}

// 执行下载
downloadAllImages().catch(console.error);