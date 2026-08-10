"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2 } from "lucide-react";
import { submitContactMessageAction } from "@/actions/contact.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ContactForm({ dict }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic schema to support localized error messages
  const formSchema = z.object({
    name: z.string().min(2, dict.contact.form.errors?.nameRequired || "Name must be at least 2 characters").max(100),
    email: z.string().email(dict.contact.form.errors?.emailInvalid || "Please enter a valid email address").max(150),
    phone: z.string().max(20).optional(),
    subject: z.string().min(5, dict.contact.form.errors?.subjectRequired || "Subject must be at least 5 characters").max(200),
    message: z.string().min(10, dict.contact.form.errors?.messageRequired || "Message must be at least 10 characters").max(2000),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const res = await submitContactMessageAction(data);
      if (res.success) {
        toast.success(dict.contact.form.success);
        reset();
      } else {
        toast.error(res.message || dict.contact.form.error);
      }
    } catch (error) {
      toast.error(dict.contact.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {dict.contact.form.name} <span className="text-primary-red">*</span>
          </label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {dict.contact.form.email} <span className="text-primary-red">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {dict.contact.form.phone}
        </label>
        <input
          {...register("phone")}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white"
          placeholder="+977 XXXXXXXXX"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {dict.contact.form.subject} <span className="text-primary-red">*</span>
        </label>
        <input
          {...register("subject")}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white"
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {dict.contact.form.message} <span className="text-primary-red">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y text-slate-900 dark:text-white min-h-[140px]"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-6 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 px-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{dict.contact.form.sending}</span>
          </>
        ) : (
          <>
            <span>{dict.contact.form.submit}</span>
            <Send className="w-5 h-5 ml-1" />
          </>
        )}
      </Button>
    </form>
  );
}
