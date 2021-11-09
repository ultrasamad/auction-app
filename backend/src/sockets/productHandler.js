const { humanReadable } = require("../utils/datetime");

module.exports = (io) => {
    const activateBidding = function (payload) {
        const socket = this;
        // socket.broadcast.emit('bidding:activated', payload);
        io.emit('bidding:activated', payload);
        //TODO: Start timer
        //Calculate total duration from currentDaate and product endDate
        console.log(humanReadable(payload.endTime));
        socket.emit('timer:start', payload);
    }
    
    return {
        activateBidding,
    }
}