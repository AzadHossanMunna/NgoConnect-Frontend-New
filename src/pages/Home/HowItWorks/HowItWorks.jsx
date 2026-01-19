import React from "react";
import { motion } from "framer-motion";
import { HandHeart, Users, HeartHandshake, HelpingHand } from "lucide-react";

const steps = [
  {
    icon: <HandHeart className="w-12 h-12 text-green-700" />,
    title: "1. You Donate",
    desc: "People contribute money, food, blood or essentials through our secure donation system.",
  },
  {
    icon: <HeartHandshake className="w-12 h-12 text-green-700" />,
    title: "2. NGOConnect Verifies",
    desc: "We check each case, verify the need, and make sure every donation goes to the right place.",
  },
  {
    icon: <Users className="w-12 h-12 text-green-700" />,
    title: "3. Volunteers Respond",
    desc: "Our trained volunteers go to the field, deliver help, and support communities directly.",
  },
  {
    icon: <HelpingHand className="w-12 h-12 text-green-700" />,
    title: "4. Help Delivered",
    desc: "The needy person receives support—food, medicine, blood, or emergency aid—with full transparency.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-green-50 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl lg:text-5xl font-extrabold text-green-900"
        >
          How NGOConnect Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-gray-700 max-w-2xl mx-auto mt-4 text-lg"
        >
          We make helping others simple, transparent, and effective.  
          From donations to field-level support — everything happens in 4 clear steps.
        </motion.p>

        {/* 4 STEP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-green-100 cursor-pointer hover:shadow-xl hover:border-green-300 transition-all"
            >
              <div className="flex justify-center mb-6">{item.icon}</div>

              <h3 className="text-xl font-bold text-green-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
