import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHandHoldingHeart, FaGlobeAmericas, FaUsers, FaLeaf, FaBullseye, FaAward } from 'react-icons/fa';
// Add these lines after line 5 (after the existing imports):
import arifulImg from '/src/assets/brands/20251206_063526.jpg.jpeg';
import azadImg from '/src/assets/brands/WhatsApp Image 2026-01-21 at 17.20.21.jpeg';
import sadhonImg from '/src/assets/brands/WhatsApp Image 2026-01-21 at 18.32.22.jpeg';
import sujoyImg from '/src/assets/brands/WhatsApp Image 2025-01-28 at 23.30.13_7420dc17.jpg.jpeg';
import tanvirImg from '/src/assets/brands/IMG_20260121_155741.jpg.jpeg';
import sorfarazImg from '/src/assets/brands/IMG-20241018-WA0014.jpg.jpeg';

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const stats = [
        { icon: <FaUsers className="text-4xl text-blue-500" />, count: "50K+", label: "Lives Impacted" },
        { icon: <FaHandHoldingHeart className="text-4xl text-red-500" />, count: "12K+", label: "Donations Received" },
        { icon: <FaGlobeAmericas className="text-4xl text-green-500" />, count: "25+", label: "Cities Covered" },
        { icon: <FaLeaf className="text-4xl text-emerald-600" />, count: "100+", label: "Active Campaigns" },
    ];

 const teamMembers = [
  { name: "Mohammad Ariful Islam", role: "Founder & CEO", img: arifulImg },
  { name: "Md. Azad Hossan Munna", role: "Head of Operations", img: azadImg },
  { name: "Sadhon Kumar Dev", role: "Community Lead", img: sadhonImg },
  { name: "Sujoy Sarkar", role: "Volunteer Coordinator", img: sujoyImg },
  { name: "Tanvir Ahammad Riyad", role: "Fundraising Manager", img: tanvirImg },
  { name: "Sorfaraz Sazid", role: "Marketing & Outreach Lead", img: sorfarazImg },
];


    return (
        <div className="font-sans overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-pulse-slow" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
                ></div>
                <div className="relative z-20 text-center px-4 max-w-4xl" data-aos="fade-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Empowering Change
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                        Connecting compassionate hearts with communities in need. Together, we build a future where no one is left behind.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/campaign" className="btn btn-primary bg-green-600 border-none hover:bg-green-700 text-white px-8">
                            Explore Campaigns
                        </Link>
                        <Link to="/contact" className="btn btn-outline text-white hover:bg-white hover:text-black">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div data-aos="fade-right">
                        <img 
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                            alt="Mission" 
                            className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                    <div data-aos="fade-left">
                        <div className="flex items-center gap-3 mb-4">
                            <FaBullseye className="text-3xl text-green-600" />
                            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            To bridge the gap between resources and needs by leveraging technology. We aim to create a transparent, efficient, and compassionate ecosystem where every donation finds its rightful beneficiary and every volunteer hour creates tangible impact.
                        </p>
                        
                        <div className="flex items-center gap-3 mb-4">
                            <FaAward className="text-3xl text-blue-600" />
                            <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            A world where generosity is seamless, help is immediate, and community support is the backbone of society. We envision a platform that not only provides aid but creates sustainable solutions for long-term development.
                        </p>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-800 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                        {stats.map((stat, index) => (
                            <div key={index} data-aos="zoom-in" data-aos-delay={index * 100} className="p-4">
                                <div className="bg-white/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-bold mb-2">{stat.count}</h3>
                                <p className="text-1xl opacity-90">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-20 px-4 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
      <span className="text-green-600 font-bold tracking-wider uppercase">The Minds Behind</span>
      <h2 className="text-4xl font-bold text-gray-800 mt-2">Meet Our Team</h2>
    </div>

    {/* Team Grid */}
    <div className="grid md:grid-cols-3 gap-8"> {/* <-- changed from 4 to 3 */}
      {teamMembers.map((member, index) => (
        <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="group">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-green-600 font-medium">{member.role}</p>
              <div className="flex justify-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Social placeholders */}
                
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

            {/* Call to Action */}
            <section className="py-20 px-4">
                <div 
                    className="max-w-5xl mx-auto bg-gray-900 rounded-3xl p-12 text-center relative overflow-hidden"
                    data-aos="zoom-in-up"
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Whether you want to volunteer your time or donate to a cause, your contribution matters. Join our community today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="btn btn-primary btn-lg bg-green-600 border-none hover:bg-green-700 text-white">
                                Become a Volunteer
                            </Link>
                            <Link to="/SendDonation" className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black">
                                Donate Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
