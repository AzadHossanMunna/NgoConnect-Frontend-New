import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Aisha Rahman",
    role: "Donor",
    img: "https://i.pravatar.cc/150?img=1",
    review:
      "NGOConnect is the only platform where I feel confident my donation reaches real people on time.",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    role: "Volunteer",
    img: "https://i.pravatar.cc/150?img=2",
    review:
      "The system is very organized. They notify us quickly and we reach the needy people fast.",
  },
  {
    id: 3,
    name: "Maria Kabir",
    role: "Helped Person",
    img: "https://i.pravatar.cc/150?img=3",
    review:
      "My mother needed blood urgently. NGOConnect volunteers came within 30 minutes. I am grateful.",
  },
  {
    id: 4,
    name: "Rahim Uddin",
    role: "Volunteer",
    img: "https://i.pravatar.cc/150?img=4",
    review:
      "Helping people becomes simple and meaningful through NGOConnect.",
  },
  {
    id: 5,
    name: "Sara Islam",
    role: "Donor",
    img: "https://i.pravatar.cc/150?img=5",
    review:
      "I donate monthly. The transparency and updates are extraordinary.",
  },
  {
    id: 6,
    name: "Farhan Talukder",
    role: "Helped Person",
    img: "https://i.pravatar.cc/150?img=6",
    review:
      "We received food support during floods. Volunteers were very respectful.",
  },
  {
    id: 7,
    name: "Nadia Chowdhury",
    role: "Donor",
    img: "https://i.pravatar.cc/150?img=7",
    review:
      "Very trustworthy platform with real impact updates.",
  },
  {
    id: 8,
    name: "Karim Mahmud",
    role: "Volunteer",
    img: "https://i.pravatar.cc/150?img=8",
    review:
      "Joining NGOConnect changed my life. Helping others feels beautiful.",
  },
  {
    id: 9,
    name: "Shirin Akter",
    role: "Helped Person",
    img: "https://i.pravatar.cc/150?img=9",
    review:
      "I received emergency medicine. May Allah bless the donors.",
  },
  {
    id: 10,
    name: "Mehedi Hasan",
    role: "Donor",
    img: "https://i.pravatar.cc/150?img=10",
    review:
      "Very fast and reliable. NGOConnect is doing real work.",
  },
];

const Testimonials3Cards = () => {
  const [start, setStart] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto change every 10 seconds → next set of 3 reviews
  useEffect(() => {
    if (!autoRotate) return;

    const timer = setTimeout(() => {
      setStart((prev) => (prev + 3) % reviews.length);
    }, 10000);

    return () => clearTimeout(timer);
  }, [start, autoRotate]);

  // Auto close modal in 20 sec
  useEffect(() => {
    if (!modalData) return;

    const timer = setTimeout(() => {
      setModalData(null);
      setAutoRotate(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, [modalData]);

  const visibleReviews = [
    reviews[start],
    reviews[(start + 1) % reviews.length],
    reviews[(start + 2) % reviews.length],
  ];

  return (
    <section className="py-20 bg-green-50 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-extrabold text-green-900"
        >
          What People Say About NGOConnect
        </motion.h2>

        <p className="text-gray-600 mt-4">
          See real feedback from donors, volunteers, and the people we help.
        </p>

        {/* 3 CARDS IN A ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {visibleReviews.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setModalData(item);
                setAutoRotate(false);
              }}
              className="cursor-pointer bg-white p-6 rounded-3xl shadow-lg border border-green-200 hover:shadow-2xl"
            >
              <img
                src={item.img}
                className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow"
                alt={item.name}
              />

              <h3 className="text-xl font-bold text-green-900 mt-4">
                {item.name}
              </h3>
              <p className="text-sm text-green-700">{item.role}</p>

              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                “{item.review}”
              </p>
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {modalData && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-10 rounded-3xl max-w-lg w-full shadow-xl relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <button
                  className="absolute top-3 right-4 text-2xl text-red-500"
                  onClick={() => {
                    setModalData(null);
                    setAutoRotate(true);
                  }}
                >
                  ✕
                </button>

                <img
                  src={modalData.img}
                  className="w-28 h-28 mx-auto rounded-full border-4 border-green-100 mt-4"
                  alt=""
                />

                <h3 className="text-2xl font-bold text-green-900 mt-4">
                  {modalData.name}
                </h3>
                <p className="text-green-700 font-semibold">{modalData.role}</p>

                <p className="mt-6 text-gray-700 text-lg leading-relaxed text-center">
                  “{modalData.review}”
                </p>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Auto closes in 20 seconds
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials3Cards;
