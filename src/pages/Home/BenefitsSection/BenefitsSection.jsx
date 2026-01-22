import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Users, ShieldCheck } from "lucide-react";
import donationImg from "/src/assets/banner/donation.jpg";
import volunteerImg from "/src/assets/banner/volunteer.png";
import neededImg from "/src/assets/banner/needed.jpg";

const benefits = [
  {
    title: "For Donors",
    icon: HeartHandshake,
    description:
      "Donors enjoy full transparency, live activity updates, and detailed reports showing how their contributions are used. Every donation is tracked, verified, and directly connected to real impact stories.",
    image: donationImg,
    highlights: [
      "Track every expense",
      "Get monthly impact reports",
      "Receive appreciation badges"
    ]
  },
  {
    title: "For Volunteers",
    icon: Users,
    description:
      "Volunteers gain verified experience, certificates, and community recognition. They can join missions like food distribution, blood camps, rescue work, teaching, and environmental activities.",
    image: volunteerImg,
    highlights: [
      "Earn volunteer certificates",
      "Real-world experience",
      "Join missions near you"
    ]
  },
  {
    title: "For People in Need",
    icon: ShieldCheck,
    description:
      "People receive quick and verified help from trusted donors and volunteers. Assistance includes blood donations, emergency food, medical support, shelter arrangements, and more.",
    image: neededImg,
    highlights: [
      "Fast emergency response",
      "Verified support system",
      "Help without paperwork"
    ]
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-green-800 text-center mb-4">
          Benefits For Everyone
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-700 mb-6">
          NGOConnect ensures that donors, volunteers, and people in need all receive 
          meaningful, transparent, and reliable support — creating a trusted ecosystem of help.
        </p>

        <div className="w-32 h-1 bg-green-600 mx-auto mb-12"></div>

        <div className="space-y-8">

          {benefits.map((b, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-green-200
                         flex items-start gap-6 hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Left Image */}
              <img
                src={b.image}
                alt={b.title}
                className="w-32 h-32 rounded-xl object-cover shadow-md"
              />

              {/* Right Content */}
              <div className="flex-1">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <b.icon className="text-green-700 w-7 h-7" />
                  <h3 className="text-2xl font-semibold text-green-800">
                    {b.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="opacity-80 text-sm md:text-base mb-3">
                  {b.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1 pl-4">
                  {b.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-green-700 list-disc">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;