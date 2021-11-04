import { AxiosResponse } from "axios";
import { ref, computed } from "vue";
import { getAllProducts } from "../api/products.api";
import IProduct from "../types/Product";

const useProduct = () => {
    const state = ref({
        products: [] as IProduct[],
        activeProduct: null,
    });
  
    //List Products getter
    const getProducts =  computed(() => state.value.products);
    
    //setProducts mutation
    const setProducts = (items: any) => {
        state.value.products = items;
    }
    
    //Load products action
    const loadProducts = async () => {
        const response = await getAllProducts();
        const items = response.data.data.products;
        setProducts(items);
    }

    return {
        getProducts,
        loadProducts,
    }
}

export default useProduct;