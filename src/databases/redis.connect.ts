import { createClient } from "redis"

class Redis_client{
public client:any;

constructor(){
    this.client=createClient();
}
async connect(){
    await this.client.connect();
    console.log("Redis Connected Successfully.");
}
async setKey(key: any, value: any,option?:any) {
    await this.client.set(key, value, option);
}
async getKey(key: any) {
    return await this.client.get(key);
}

}
export const RedisClient=new Redis_client();
RedisClient.connect();