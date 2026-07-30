const mongoose = require('mongoose');

async function checkStorage() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nyfn-gandaki";
  console.log("Connecting to:", uri);
  await mongoose.connect(uri);
  
  const storageSchema = new mongoose.Schema({}, { strict: false });
  const Storage = mongoose.models.Storage || mongoose.model('Storage', storageSchema);
  
  const ids = ['6a684424130f88f91125d548', '6a6b16bd45535315240b35a4'];
  for (const id of ids) {
    const record = await Storage.findById(id).lean();
    console.log(`ID: ${id}`, record);
  }
  
  await mongoose.disconnect();
}

checkStorage().catch(console.error);
