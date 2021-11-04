import httpClient from "./httpClient";

const END_POINT = '/biddings';
const createBidding = (params: Object) => httpClient.post(END_POINT, params); 
const getBiddings = (productId: string) => httpClient.get(`${END_POINT}?productId=${productId}`);

export {
    createBidding,
    getBiddings,
}