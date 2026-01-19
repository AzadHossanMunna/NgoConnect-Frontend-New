import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, HandHeart, Users } from "lucide-react";
import location from "../../../assets/location-merchant.png";
import bgImg from "../../../assets/be-a-merchant-bg.png";

const BeMerchant = () => {
  return (
    <section
      className="relative rounded-3xl py-20 px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY FOR BETTER READABILITY */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div>

      <div className="relative max-w-7xl mx-auto hero">
        <div className="hero-content flex-col-reverse lg:flex-row gap-20">
          
          {/* ---------------- LEFT SIDE ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-6xl font-extrabold text-green-900 leading-tight"
            >
              Become a Part of <span className="text-green-700">NGOCONNECT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700 text-lg leading-relaxed max-w-xl"
            >
              NGOCONNECT brings donors, volunteers, and people in need under one 
              unified platform. Track your contributions, support causes instantly, 
              and be a part of real community transformation.
            </motion.p>

            {/* BENEFITS */}
            <div className="space-y-4">
              {[
                {
                  icon: <HeartHandshake className="w-7 h-7" />,
                  text: "Real-time updates and a 100% transparent system.",
                },
                {
                  icon: <HandHeart className="w-7 h-7" />,
                  text: "Make powerful contributions that truly save lives.",
                },
                {
                  icon: <Users className="w-7 h-7" />,
                  text: "Join a growing global family of changemakers.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm border border-green-100 text-green-800"
                >
                  {item.icon}
                  <p className="font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 flex-wrap pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-green-700 text-white hover:bg-green-800 px-10 py-3 rounded-full shadow-lg"
              >
                Become a Volunteer
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-white text-green-700 border border-green-600 px-10 py-3 rounded-full shadow-lg hover:bg-green-100"
              >
                Become a Donor
              </motion.button>
            </div>
          </motion.div>

          {/* ---------------- RIGHT SIDE IMAGE ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
          >
            <motion.img
              src={location}
              alt="Location Illustration"
              className="max-w-sm rounded-3xl shadow-xl border-2 border-green-200"
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BeMerchant;
