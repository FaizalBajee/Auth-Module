// export default function Connection() {
  const { MongoClient } = require("mongodb");

  const uri = "mongodb://localhost:27017";
  // Database name
  const dbName = "authModule";
  let db;
  // Connect to MongoDB
  MongoClient.connect(uri, { useUnifiedTopology: true })
    .then((client) => {
      console.log("✅ Connected to MongoDB");
      db = client.db(dbName);
    })
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
// }
