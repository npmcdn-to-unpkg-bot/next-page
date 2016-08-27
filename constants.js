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
    WeekDays: ['日','一','二','三','四','五','六'],

    getKeyByValue(obj, value){
        for(let x in obj){
            if(obj[x] == value) return x; 
        }
        return '';
    },

    getWeekDays(weekDayRule){
        if(!weekDayRule) return '';
        let m = this;
        return  (weekDayRule >>> 0).toString(2).split('').reverse()
        .map(function(rule, index){
            return rule == '1'?m.WeekDays[index]:'';
        }).filter(function(w){
            return w != '';
        }).join(',');
    },

    toWeekDayRule(weekDays){
        // let m = this;
        // return weekDays.map(function(w){
        //     return m.WeekDays.indexOf(w) + 1;
        // }).join(',');
        let binaryRule = this.WeekDays.map(function(w){
            return weekDays.some(function(d){
                return w == d;
            })?1:0;
        }).reverse().join('');

        if(binaryRule) return parseInt(binaryRule,2);
        else
            return 127;
    },

    toDecimalWeekDayRule(weekDayRule){
        if(!weekDayRule) return '';
        let m = this;
        return  (weekDayRule >>> 0).toString(2).split('').reverse()
        .map(function(rule, index){
            return rule == '1'?(index == 0?7:index).toString():'';
        }).filter(function(w){
            return w != '';
        }).join(',');        
    }
}

export default constants;