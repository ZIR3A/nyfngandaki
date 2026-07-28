import connectToDatabase from "./src/lib/mongodb.js";
import Storage from "./src/modules/storage/models/storage.model.js";

async function updateUrls() {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB.");
    
    const files = await Storage.find({ publicUrl: { $regex: 'lh3.googleusercontent.com/d/' } });
    let count = 0;
    for (const file of files) {
      const fileId = file.publicUrl.split('/d/')[1];
      if (fileId) {
        file.publicUrl = 'https://drive.google.com/uc?export=view&id=' + fileId;
        await file.save();
        count++;
      }
    }
    console.log(`Updated ${count} storage records to new URL format.`);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

updateUrls();
