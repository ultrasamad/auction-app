module.exports = (io) => {
    const createBidding = function (payload) {
        const socket = this;
        // socket.broadcast.emit('bidding:created', payload);
        io.emit('bidding:created', payload);
    }
    
    return {
        createBidding,
    }
}