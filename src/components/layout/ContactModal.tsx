"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

import { useModal } from "@/contexts/ModalContext";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  typology: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Fire Conversion Events for Google Ecosystem and Meta
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq('track', 'Lead', { content_name: 'Contact Modal Lead' });
        }
        
        // GA4 tracking
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag('event', 'lead_generated', {
            event_category: 'engagement',
            event_label: 'Contact Modal Submission',
            value: 1
          });
        }

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          reset();
          closeContactModal();
        }, 3000);
      } else {
        throw new Error(responseData.error || "Failed to submit lead");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-end bg-charcoal/80 backdrop-blur-sm"
        >
          {/* Click away to close */}
          <div className="absolute inset-0" onClick={closeContactModal} />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative h-full w-full max-w-md bg-background border-l border-border shadow-2xl p-8 md:p-12 overflow-y-auto"
          >
            <button
              onClick={closeContactModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X size={24} className="text-foreground/70" />
            </button>

            <div className="mt-8">
              <h2 className="text-3xl font-heading mb-2">Book a Private Tour</h2>
              <p className="text-muted-foreground font-light mb-8 text-sm">
                Register your interest to experience the ultra-luxury villas at Supreme Villagio Somatane.
              </p>

              {isSuccess ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-heading text-green-500 mb-2">Request Received</h3>
                  <p className="text-sm text-foreground/70">
                    Our luxury lifestyle advisor will contact you shortly to schedule your tour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Full Name *</label>
                    <input
                      {...register("name")}
                      className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-gold transition-colors rounded-none placeholder:text-muted-foreground/30"
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Phone Number *</label>
                    <div className="flex">
                      <span className="text-muted-foreground border-b border-border/50 pb-2 pr-2">+91</span>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-gold transition-colors rounded-none placeholder:text-muted-foreground/30"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-gold transition-colors rounded-none placeholder:text-muted-foreground/30"
                      placeholder="Optional"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-4">Interested In</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["4 BHK Villas", "5 BHK Twin Bungalows", "Luxury Row Houses", "Other"].map((type) => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="radio"
                            value={type}
                            {...register("typology")}
                            className="accent-gold w-4 h-4"
                          />
                          <span className="text-sm font-light group-hover:text-gold transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-charcoal py-4 text-sm uppercase tracking-widest font-semibold hover:bg-gold-muted transition-colors disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? "Submitting..." : "Request Call Back"}
                  </button>
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 mt-4">
                      {submitError}
                    </div>
                  )}
                  <p className="text-center text-[10px] text-muted-foreground mt-4">
                    By submitting this form, you authorize Supreme Universal to contact you via Call/SMS/WhatsApp.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
