import { GetCard } from './GetCard.js'
import { GetStarLocation } from './GetStarLocation.js'
import { compress_starlocation, compress_card, mergeStarCard } from './dataCovert/compress.js'
import { stringToBase64, base64ToString } from '../database/covert/bash64.js'
import { stringToMD5 } from '../database/covert/md5.js'
import { queryByUserId } from '../database/query.js'
import { insertTaskRecord } from '../database/insert.js'

import { fullReport } from './fullReport.js'

function userDrawCard(data) { 
    const { userId, request } = data;
    
    const requestMD5 = stringToMD5(request);
    const userTasks = queryByUserId(userId);;
    // 查找是否有相同的 MD5
    const existingTask = userTasks.find(task => task.task_md5 === requestMD5);

    if (existingTask) {
        // 如果找到了重复的 MD5，返回对应的 task_result
        const AllCardPickBase64 = existingTask.task_result;
        const AllCardPick = base64ToString(AllCardPickBase64);
        const result = fullReport(AllCardPick, request)

        return result
    } else {
        // 如果没有找到重复的 MD5，执行抽卡逻辑
        const AllCardPickBase64 = cardPickprocess()
        const AllCardPick = base64ToString(AllCardPickBase64);
        const result = fullReport(AllCardPick, request)

        insertTaskRecord(userId, requestMD5, AllCardPickBase64)
        return result
    }
}

function cardPickprocess(){
    const cardP = GetCard()
    const starP = GetStarLocation()
    const cardC = compress_card(cardP)
    const starC = compress_starlocation(starP)
    const AllCardPick = mergeStarCard(cardC, starC)
    const AllCardPickBase64 = stringToBase64(AllCardPick)
    return AllCardPickBase64
}

export { userDrawCard }