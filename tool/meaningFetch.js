/* 浏览器脚本 

<div class="keywords" data-processed="true">
    <p data-processed="true">
      <span class="gold" data-processed="true">✦&nbsp;&nbsp;✦&nbsp;&nbsp;✦</span>
      <strong data-processed="true">Upright: </strong>perseverance, defensive, maintaining control
      <strong data-processed="true">Reversed: </strong>give up, destroyed confidence, overwhelmed
      <a href="/blogs/tarot-card-meanings-list/seven-of-wands-meaning-tarot-card-meanings" class="gold capsfont small">Full Tarot Meaning</a>
    </p>
  </div>


以上是keyword示例

把 class="keyword" 元素下面的文字都扒出来 
console.log 出来 方便我复制

输出格式是

[
    ["perseverance, defensive, maintaining control" , "give up, destroyed confidence, overwhelmed"],
    ...
]

前面upright 后面reversed
按页面顺序输出
输出string

*/

// 获取所有 class="keywords" 的元素
const keywordElements = document.querySelectorAll('.keywords');

// 存储结果的数组
const results = [];

// 遍历每个 keywords 元素
keywordElements.forEach(element => {
    // 获取 p 元素内的文本节点
    const pElement = element.querySelector('p');
    if (pElement) {
        // 获取所有 strong 元素
        const strongElements = pElement.querySelectorAll('strong');
        
        let upright = '';
        let reversed = '';
        
        // 查找 Upright 和 Reversed 后面的文本
        for (let i = 0; i < strongElements.length; i++) {
            const strong = strongElements[i];
            if (strong.textContent.includes('Upright:')) {
                // 获取 strong 元素后面的文本节点内容
                let nextNode = strong.nextSibling;
                while (nextNode && nextNode.nodeType !== Node.TEXT_NODE) {
                    nextNode = nextNode.nextSibling;
                }
                if (nextNode) {
                    upright = nextNode.textContent.trim();
                    // 去除可能的多余空白字符
                    upright = upright.replace(/\s+/g, ' ');
                }
            } else if (strong.textContent.includes('Reversed:')) {
                // 获取 strong 元素后面的文本节点内容
                let nextNode = strong.nextSibling;
                while (nextNode && nextNode.nodeType !== Node.TEXT_NODE) {
                    nextNode = nextNode.nextSibling;
                }
                if (nextNode) {
                    reversed = nextNode.textContent.trim();
                    // 去除可能的多余空白字符
                    reversed = reversed.replace(/\s+/g, ' ');
                }
            }
        }
        
        // 如果找到了 upright 或 reversed 的值，则添加到结果数组
        if (upright || reversed) {
            results.push([upright, reversed]);
        }
    }
});

// 输出结果
console.log(JSON.stringify(results, null, 2));