import { UserModel } from "../schema/user.model.js";

export default class UserManager {
    async getAll(){
        try {
            return await UserModel.find();
        } catch (error) {
            console.error("Error getting customer", error);
            throw error;
        }
    };
}