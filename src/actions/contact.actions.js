"use server";

import { ContactMessageService } from "@/services/ContactMessageService";
import { revalidatePath } from "next/cache";

import { Resend } from 'resend';

export async function submitContactMessageAction(formData) {
  try {
    // Basic server-side validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return { success: false, message: "Required fields are missing." };
    }

    if (formData.message.length > 2000) {
      return { success: false, message: "Message is too long." };
    }

    // Here you could add basic rate limiting based on IP or basic spam checks

    const newMessage = await ContactMessageService.submitMessage(formData);

    // Notify admins via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'nyfngandaki@gmail.com',
        subject: `New Contact Form Submission: ${formData.subject}`,
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br />')}</p>
        `
      });
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // We don't fail the submission if email notification fails
    }
    
    return { success: true, data: newMessage, message: "Message sent successfully." };
  } catch (error) {
    console.error("Submit Contact Message Error:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
}

export async function getContactMessagesAction(params) {
  try {
    const data = await ContactMessageService.getMessages(params);
    return { success: true, data };
  } catch (error) {
    console.error("Get Contact Messages Error:", error);
    return { success: false, message: "Failed to fetch messages." };
  }
}

export async function updateMessageStatusAction(id, status) {
  try {
    const updated = await ContactMessageService.updateStatus(id, status);
    revalidatePath("/admin/contact-messages");
    return { success: true, data: updated, message: "Status updated successfully." };
  } catch (error) {
    console.error("Update Message Status Error:", error);
    return { success: false, message: "Failed to update status." };
  }
}

export async function deleteContactMessageAction(id) {
  try {
    await ContactMessageService.deleteMessage(id);
    revalidatePath("/admin/contact-messages");
    return { success: true, message: "Message deleted successfully." };
  } catch (error) {
    console.error("Delete Message Error:", error);
    return { success: false, message: "Failed to delete message." };
  }
}
