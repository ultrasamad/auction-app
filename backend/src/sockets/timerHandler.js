const { humanReadable, secondsDifference } = require("../utils/datetime");

module.exports = (io) => {
    const startTimer = function (payload) {
        const socket = this;
        console.log('Start timer');
        
        //TODO: Temporal
        const totalSeconds = secondsDifference(payload.endTime);
        let counter = totalSeconds;
        // console.log(counter);
        // while(counter < 0) {
        //     const load = {
        //         time: humanReadable(payload.endTime),
        //         productId: payload._id,
        //     }
        //     io.emit('timer:updated', load);
        //     counter++
        // }
        const timer = setInterval(() => {
            const load = {
                time: humanReadable(payload.endTime),
                productId: payload._id,
            }

            if(counter === 0 ) clearInterval(timer);
            io.emit('timer:updated', load);
            counter++;
        }, 1000);
    }

    const stopTimer = function(payload) {
        const socket = this;
        console.log('Stop timer');
    }
    
    return {
        startTimer,
        stopTimer
    }
}