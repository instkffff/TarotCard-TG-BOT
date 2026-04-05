const inline_menu = [
    {
        type: 'article',
        id: '1',
        title: '抽卡',
        description: '点击抽取塔罗牌',
        thumb_url: 'https://cdn-icons-png.flaticon.com/512/1043/1043440.png', // 对应左侧头像
        input_message_content: {
            message_text: `抽卡`
        },
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'⏳ 抽卡中请稍后...','callback_data':'none'}
                ]
            ]
        }

    },
    {
        type: 'article',
        id: '2',
        title: '洗牌',
        description: '点击重置牌池',
        thumb_url: 'https://cdn-icons-png.flaticon.com/512/1043/1043440.png',
        input_message_content: {
            message_text: `🔄 洗牌成功`
        }
    },
    {
        type: 'article',
        id: '3',
        title: '帮助',
        description: '获取帮助',
        thumb_url: 'https://cdn-icons-png.flaticon.com/512/1043/1043440.png',
        input_message_content: {
            message_text: 
`== 塔罗牌Bot使用方法 ==

- 抽卡
从78张塔罗牌中不重复抽取一张直到洗牌。 

- 洗牌
重置卡池，将之前抽牌放回卡组。`
        }
    }
];

export { inline_menu };