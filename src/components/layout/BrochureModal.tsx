"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  website: z.string().optional(), // Honeypot
});

type FormValues = z.infer<typeof formSchema>;

export default function BrochureModal() {
  const { isBrochureModalOpen, closeBrochureModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Append source to differentiate leads in CRM
        body: JSON.stringify({ ...data, source: "Brochure Download" }), 
      });

      if (response.ok) {
        // Fire Conversion Events
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq('track', 'Lead', { content_name: 'Brochure Download' });
        }
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'engagement',
            event_label: 'Brochure Download',
          });
        }

        setIsSuccess(true);
        
        // Trigger the actual PDF download
        const link = document.createElement("a");
        // Cloudflare blocks local files > 25MB, routing this through your existing CDN
        link.href = "https://cdn.supremeuniversal.com/media/supreme-villagio-brochure.pdf";
        link.download = "Supreme-Villagio-Brochure.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          setIsSuccess(false);
          reset();
          closeBrochureModal();
        }, 5000);
      } else {
        throw new Error("Failed to submit details");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isBrochureModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 backdrop-blur-sm px-4"
        >
          <div className="absolute inset-0" onClick={closeBrochureModal} />
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative w-full max-w-lg bg-background border border-cream/20 shadow-2xl p-8 md:p-12 rounded-xl"
          >
            <button
              onClick={closeBrochureModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X size={24} className="text-foreground/70" />
            </button>

            <div className="mt-2 text-center">
              <h2 className="text-3xl font-heading mb-2 text-forest">Unlock E-Brochure</h2>
              <p className="text-forest/70 font-light mb-8 text-sm">
                Enter your details to instantly download the comprehensive floor plans, masterplan, and project details.
              </p>

              {isSuccess ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-heading text-green-500 mb-2">Download Started!</h3>
                  <p className="text-sm text-foreground/70">
                    Your Supreme Villagio Brochure is downloading. Our advisor will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-forest/70 mb-2">Full Name *</label>
                    <input
                      {...register("name")}
                      className="w-full bg-transparent border-b border-forest/20 pb-2 text-forest focus:outline-none focus:border-gold transition-colors rounded-none placeholder:text-forest/30"
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-forest/70 mb-2">Phone Number *</label>
                    <div className="flex">
                      <span className="text-forest/70 border-b border-forest/20 pb-2 pr-2">+91</span>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full bg-transparent border-b border-forest/20 pb-2 text-forest focus:outline-none focus:border-gold transition-colors rounded-none placeholder:text-forest/30"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-forest/70 mb-2">Email Address *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full bg-transparent border-b border-forest/20 pb-2 text-forest focus:outline-none focus:border-gold transition-colors rounded-none placeholder:text-forest/30"
                      placeholder="To receive a PDF copy"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-charcoal py-4 text-sm uppercase tracking-widest font-semibold hover:bg-gold/80 transition-colors disabled:opacity-50 mt-4 shadow-lg shadow-gold/20"
                  >
                    {isSubmitting ? "Generating PDF..." : "Download Now"}
                  </button>
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 mt-4 text-center">
                      {submitError}
                    </div>
                  )}
                  <p className="text-center text-[10px] text-forest/50 mt-4">
                    By downloading, you authorize Supreme Universal to contact you with project updates.
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
