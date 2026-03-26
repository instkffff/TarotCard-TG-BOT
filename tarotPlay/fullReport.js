import { fillMainTemplate, fillElementTemplate, fillZodiacTemplate, fillTitleTemplate, fillstarTemplate } from './report/fillTemplate.js'

function fullReport( data , title ){
    return fillTitleTemplate(title) + fillstarTemplate(data) + fillElementTemplate(data) + fillZodiacTemplate(data) + fillMainTemplate(data)
}

/* const data = '102118191205|04[031921]06[02]07[10]18[0116]'
const title = '今日运势'

console.log( fullReport( data , title ) ) */

export { fullReport }