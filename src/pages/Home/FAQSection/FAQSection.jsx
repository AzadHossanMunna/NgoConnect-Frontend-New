import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What is NGOCONNECT and how does it work?",
    answer:
      "NGOCONNECT is a smart platform that links donors, volunteers, and people in need. We ensure transparency, real-time tracking, and instant response during emergencies.",
  },
  {
    question: "How does NGOCONNECT ensure trusted donations?",
    answer:
      "We provide real-time updates, proof of impact, mission photos, transparency logs, and advanced tracking so donors always know where help goes.",
  },
  {
    question: "Can I volunteer for any mission near me?",
    answer:
      "Yes! Volunteers can choose local missions, receive instant notifications, earn certificates, and gain real experience in community development.",
  },
  {
    question: "What services does NGOCONNECT offer?",
    answer:
      "Food donation, blood support, more things,medicine delivery, environmental actions, natural disaster relief, shelter support, and more — 24/7.",
  },
  {
    question: "Is NGOCONNECT free for everyone?",
    answer:
      "Yes. It is 100% free for donors, volunteers, and people receiving help.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mx-auto bg-green-200 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
            <HelpCircle className="w-10 h-10 text-green-700" />
          </div>

          <h2 className="text-5xl font-extrabold text-green-900 mt-6">
            Frequently Asked Questions
          </h2>

          <p className="text-lg text-green-700 mt-3 max-w-2xl mx-auto leading-relaxed">
            Find answers to the most common questions about how NGOCONNECT empowers donors, volunteers, and communities in need.
          </p>

          <div className="w-36 h-1 bg-green-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* FAQ Content */}
        <div className="grid md:grid-cols-1 gap-6">
          {faqData.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="backdrop-blur-xl bg-white/70 border border-green-200 shadow-xl 
                         rounded-2xl p-6 hover:shadow-2xl transition-all"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-xl font-semibold text-green-900">
                  {item.question}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === i ? (
                    <ChevronUp className="text-green-700" />
                  ) : (
                    <ChevronDown className="text-green-700" />
                  )}
                </motion.div>
              </button>

              {/* Animated Answer */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>

                    {/* Decorative Line */}
                    <div className="w-full h-0.5 mt-4 bg-gradient-to-r from-green-300 to-green-500 rounded-full"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
