import { userDrawCard } from '../tarotPlay/main.js'

const api = {
    '/api/tarot': {
        POST: (data) => {
            const { userId, request } = data;

            // 验证参数
            if (!userId || !request) {
                throw new Error('缺少必要参数：用户ID和所求事项');
            }

            const result = userDrawCard(data);
            return result;  // 添加返回语句
        }
    }
};

export { api };