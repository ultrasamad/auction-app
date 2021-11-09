module.exports = {
    // model to be used for seeding data
    Model: require('../biddings/models/Bidding'),
    // service to be used for business logic
    Service: require('../biddings/services/bidding'),
    purgeMethod: 'purge',
    // method used for creating new records
    createMethod: 'create',
    // list of data to be seeded
    data: []
};