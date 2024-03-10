import  { ProductsModel } from "../schema/products.model.js"

export default class ProductsManager {
    async getAll(){
        try {
            return await ProductsModel.find();
        } catch (error) {
            console.error("Error getting customer", error);
            throw error;
        }
    };
}