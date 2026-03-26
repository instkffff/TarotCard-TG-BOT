const titlePart = (d) => `
===
星运塔罗 · 启示录
(Golden Dawn Mystical System · Major Arcana Only)
===

所求事项: ${d}
---
“如其在上，如其在下。一切万物皆由唯一之理所生。”
---
`

const starPart = (d) => `
一、行星之轮 (Planetary Aspect)
[核心能量: 宇宙行动的本质频率]

抽卡结果: ${d.cardName}
对应行星: ${d.planetName}
行星释义: ${d.planetMeaning}
所在星座: ${d.zodiacName}
星座释义: ${d.zodiacMeaning}
`

const elementPart = (d) => `
二、元素之灵 (Elemental Essence)
[原动力: 环境的质地与根基]

抽卡结果: ${d.cardName}
元素共鸣: ${d.elementName}
元素释义: ${d.elementMeaning}
`

const ZodiacPart = (d) => `
三、星图宫位 (Zodiac Constellation)
[外部格局: 宿命的时空舞台]

抽卡结果: ${d.cardName}
对应星座: ${d.zodiacName}
星座释义: ${d.zodiacMeaning}

内部巡行能量: 
${d.starInZodiac}
`

const mainCardPart = (d) => `
四、主牌终极判词 (Major Arcana Verdict)
[灵魂的深层真相与启示]

抽卡结果1: ${d.cardName1}
卡牌释义1: ${d.cardMeaning1}
抽卡结果2: ${d.cardName2}
卡牌释义2: ${d.cardMeaning2}
抽卡结果3: ${d.cardName3}
卡牌释义3: ${d.cardMeaning3}
`

const tailPart = () => `
===
金色黎明 · AI深度解读引导(仅大阿卡纳版)
===

解读务必简短

1. [元素获取解析]
   “请根据抽到的元素牌，结合其它抽牌进行分析”

2. [卡巴拉路径解析]
   “解析这几张主牌在生命之树上的具体路径，以及希伯来字母对应，揭示我目前的灵魂动机与灵性功课。”

3. [行星星座解析]
   “结合抽到行星牌的星座位置，星座牌抽卡时包含的行星，进行解析。”

4. [整体吉凶解析]
  “请结合以上所有内容分5级。'大吉'、'吉'、'平'、'凶'、'大凶'，给出综合评价。”
`

export { titlePart , starPart , elementPart , ZodiacPart , mainCardPart , tailPart }