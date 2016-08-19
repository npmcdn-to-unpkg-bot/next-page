let constants = {
    AdActions:{
        "":-1,
        "純文字":1,
        "開網頁":4,
        "播影音":6,
        "打卡":9,
        "看圖片":11,
        "更詳細":61
    },
    NearRanges: {
        "近":2,
        "中":4,
        "遠":6,
        "廣播":999
    },

    getKeyByValue(obj, value){
        for(let x in obj){
            if(obj[x] == value) return x; 
        }
        return '';
    }
}

export default constants;