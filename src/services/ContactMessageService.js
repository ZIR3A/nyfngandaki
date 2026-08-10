import { DatabaseService } from "./DatabaseService";
import ContactMessage from "@/models/ContactMessage";

export class ContactMessageService {
  /**
   * Submit a new contact message
   * @param {Object} data - The message payload
   */
  static async submitMessage(data) {
    await DatabaseService.connect();
    
    // Add lightweight backend validation if needed
    const message = new ContactMessage({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      subject: data.subject,
      message: data.message,
      status: "Unread",
    });

    const savedMessage = await message.save();
    return JSON.parse(JSON.stringify(savedMessage));
  }

  /**
   * Fetch paginated contact messages for CRM
   */
  static async getMessages({ page = 1, limit = 10, status = "all", search = "" }) {
    await DatabaseService.connect();

    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await ContactMessage.countDocuments(query);

    return {
      messages: JSON.parse(JSON.stringify(messages)),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single message by ID
   */
  static async getMessageById(id) {
    await DatabaseService.connect();
    const message = await ContactMessage.findById(id).lean();
    if (!message) return null;
    return JSON.parse(JSON.stringify(message));
  }

  /**
   * Update message status
   */
  static async updateStatus(id, status) {
    await DatabaseService.connect();
    
    const validStatuses = ["Unread", "Read", "Archived"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!updatedMessage) {
      throw new Error("Message not found");
    }

    return JSON.parse(JSON.stringify(updatedMessage));
  }

  /**
   * Delete a message
   */
  static async deleteMessage(id) {
    await DatabaseService.connect();
    
    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) {
      throw new Error("Message not found");
    }
    
    return true;
  }
}
