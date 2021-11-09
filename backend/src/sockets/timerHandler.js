module.exports = (io) => {
    const startTimer = function (payload) {
        //TODO: Start Timer for a target product
        const socket = this;
        console.log('Weow! Timer has started');
    }

    const stopTimer = function(payload) {
        const socket = this;
    }
    
    return {
        startTimer,
        stopTimer
    }
}