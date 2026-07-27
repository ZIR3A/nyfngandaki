import connectToDatabase from "../lib/mongodb";

export class DatabaseService {
  static async connect() {
    return await connectToDatabase();
  }

  static async findById(model, id) {
    await this.connect();
    return await model.findById(id).lean();
  }

  static async create(model, data) {
    await this.connect();
    const doc = new model(data);
    return await doc.save();
  }
}
