import { MongoClient, type Document } from "mongodb";

export function connectToCluster<CollectionType extends Document>(collectionName: string) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(process.env.MONGODB_URI!);
        mongoClient.connect();

        const db = mongoClient.db('bible');
        const collection = db.collection<CollectionType>(collectionName);

        return collection
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        throw new Error(`Connection to MongoDB Atlas failed! ${error}`)
    }
}

export const collectionBook = connectToCluster<Book>("book")
export const collectionChapter = connectToCluster<Chapter>("chapter")
export const collectionVersion = connectToCluster<Version>("version")