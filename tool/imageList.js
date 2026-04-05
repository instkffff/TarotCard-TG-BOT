// 获取页面上所有图片的src属性值
function getAllImageSources() {
    // 获取所有img元素
    const imgElements = document.querySelectorAll('img');
    
    // 提取src属性，并过滤掉空值
    const imageSources = Array.from(imgElements)
        .map(img => img.src)
        .filter(src => src && src.trim() !== '');
    
    // 输出到控制台
    console.log('找到的图片链接数量:', imageSources.length);
    
    // 将所有图片链接作为一个字符串输出到控制台
    const imageLinksText = imageSources.join('\n');
    console.log('图片链接列表:\n' + imageLinksText);
    
    return imageSources;
}

// 执行函数
getAllImageSources();