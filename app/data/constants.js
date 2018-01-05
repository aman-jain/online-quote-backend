const CONSTANTS = {
    S_200: 200,
    S_201: 201,
    F_500: 500,
    REQ_QUOTES_PROPS: [
        {
            property: 'ownerName',
            message: 'Owner Name is required',
        },
        {
            property: 'model',
            message: 'Model is required',
        },
        {
            property: 'seatCapacity',
            message: 'Seat Capacity is required',
        },
        {
            property: 'manufacturedDate',
            message: 'Manufactured Date is required',
        },
        {
            property: 'purchasePrice',
            message: 'Purchase Price is required',
        },
        {
            property: 'brokerEmail',
            message: 'Broker Email is required',
        },
    ],
};
module.exports = CONSTANTS;
