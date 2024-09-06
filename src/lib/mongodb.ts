import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let clientPromise: Promise<MongoClient>;

const uri = "mongodb+srv://uas:L5gDogEjbNyNIn6e@uas-main.mq8vy.mongodb.net/?retryWrites=true&w=majority&appName=UAS-Main";
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
};

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
