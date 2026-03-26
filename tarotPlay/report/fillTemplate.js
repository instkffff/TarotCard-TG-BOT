import { titlePart , starPart , elementPart , ZodiacPart , mainCardPart , tailPart } from './template.js'

import { starData , elementData , zodiacData , mainData } from './fillDataGenerator.js'

function fillstarTemplate(data) { 
    let d = starData(data)
    let template = starPart(d)
    return template
}

function fillElementTemplate(data) { 
    let d = elementData(data)
    let template = elementPart(d)
    return template
}

function fillZodiacTemplate(data) { 
    let d = zodiacData(data)
    let template = ZodiacPart(d)
    return template
}

function fillMainTemplate(data) { 
    let d = mainData(data)
    let template = mainCardPart(d)
    return template
}

function fillTitleTemplate(title) { 
    let d = title
    let template = titlePart(d) + tailPart()
    return template
}

/* const data = '102114191205|04[031921]06[02]07[10]18[0116]'

console.log(fillMainTemplate(data))

console.log(fillZodiacTemplate(data))

console.log(fillElementTemplate(data))

console.log(fillstarTemplate(data))

console.log(fillTitleTemplate('今日运势')) */

export { fillMainTemplate, fillElementTemplate, fillZodiacTemplate, fillTitleTemplate, fillstarTemplate }