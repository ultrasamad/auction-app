import httpClient from "./httpClient";

const END_POINT = '/products';

const getAllProducts = () => httpClient.get(END_POINT);

const getProduct = (productId: string) => httpClient.get(`${END_POINT}/${productId}`);

const updateProduct = (productId: string, params: object) => httpClient.patch(`${END_POINT}/${productId}`, params); 

export {
    getAllProducts,
    getProduct,
    updateProduct,
}