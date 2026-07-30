import { UserRepository } from "./UserRepository.js";

export class MongoUserRepository{
    async findById(orderId){
        return db.collections.findById(userId);
    }

}