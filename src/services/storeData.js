const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, data) {
  try {
    if (id == null || data == null) {
      throw new Error("id and data cannot be null or undefined");
    }
    const db = new Firestore();
    const predictCollection = db.collection("prediction");
    return predictCollection.doc(id).set(data);
  } catch (error) {
    throw error;
  }
}

module.exports = storeData;
