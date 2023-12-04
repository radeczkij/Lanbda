import {Request, Response} from "express";
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://JSON:hX2k11GFrYSIMf30@cluster0.lxn9l.mongodb.net/?retryWrites=true&w=majority");
const database = async () => {
    await client.connect();
}
database();

const db = client.db("db");
const routeDb = db.collection("routes");

export class controller{
    static async post(req:Request, res:Response){
        const {route} = req.params;
        const data = req.body;
        const routeData = await routeDb.findOne({route});
        if(routeData){
            await routeDb.updateOne(routeData, {$set: {data}});
        }else{
            await routeDb.insertOne({
                route,
                data
            });
        }
        return res.status(200).send("Success");
    }
    static async get(req:Request, res:Response){
        const {route} = req.params;
        const routeData = await routeDb.findOne({route});
        if(routeData){
            return res.status(200).send(routeData.data);
        }else{
            return res.status(400).send("Error")
        }
    }
}