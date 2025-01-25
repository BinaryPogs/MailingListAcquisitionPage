import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { themeConfig } from "@/conf/themeConfig";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface WaitlistProps {
  placeholder: string;
  buttonText: string;
  loadingText: string;
  successMessage: string;
  errorMessage: string;
  existingEmailMessage: string;
  notificationDuration?: number;
  emailFontSize?: string;
}

export const Waitlist = ({
  placeholder,
  buttonText,
  loadingText,
  successMessage,
  errorMessage,
  existingEmailMessage,
  notificationDuration = 3000,
  emailFontSize = themeConfig.fontSizes.emailInput,
}: WaitlistProps) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        setStatus("error");
        setMessage(existingEmailMessage);
      } else if (!response.ok) {
        throw new Error("Failed to join waitlist");
      } else {
        setStatus("success");
        setMessage(successMessage);
        form.reset();
      }
    } catch {
      setStatus("error");
      setMessage(errorMessage);
    } finally {
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, notificationDuration);
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#5bc0be]/50"
                    style={{ fontSize: emailFontSize }}
                    disabled={status === "loading"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-3 bg-[#5bc0be] hover:bg-[#4ca8a6] text-white rounded-lg font-medium transition-colors disabled:opacity-50`}
          >
            {status === "loading" ? loadingText : buttonText}
          </motion.button>
        </form>
      </Form>

      <AnimatePresence mode="wait">
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg backdrop-blur-xl ${
              status === "success"
                ? "bg-[#5bc0be]/10 text-[#5bc0be] border border-[#5bc0be]/20"
                : "bg-red-500/10 text-red-200 border border-red-500/20"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
