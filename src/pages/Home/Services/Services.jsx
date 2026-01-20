import ServiceCard from "./ServiceCard";
import {
  FaHandHoldingHeart,
  FaUtensils,
  FaTint,
  FaBroom,
  FaUserShield,
  FaBookReader,
  FaHandsHelping,
  FaLeaf,
  FaPeopleCarry,
} from "react-icons/fa";

const servicesData = [
  {
    icon: FaUtensils,
    title: "Food Support",
    description: "Running campaigns to provide meals to families in need.",
    extraDetails:
      "We partner with local communities to organize food distribution events for families who need them most.",
  },
  {
    icon: FaTint,
    title: "Blood Donation Camps",
    description: "Organizing blood donation events to support local hospitals.",
    extraDetails:
      "NGOConnect organizes regular blood donation drives where volunteers can participate and donors can contribute to the cause.",
  },
  {
    icon: FaBroom,
    title: "Cleanliness Drives",
    description: "Organizing community cleaning campaigns to create healthier spaces.",
    extraDetails:
      "Our volunteers participate in city and community cleaning programs to promote public hygiene and environmental awareness.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Medical Campaigns",
    description: "Fundraising for basic medicines and emergency medical help.",
    extraDetails:
      "NGOConnect runs specific campaigns to provide financial support for medical emergencies and basic healthcare needs.",
  },
  {
    icon: FaUserShield,
    title: "Disaster Relief",
    description: "Coordinating support for communities during tough situations.",
    extraDetails:
      "We launch emergency campaigns to support disaster victims with essential supplies and funds.",
  },
  {
    icon: FaBookReader,
    title: "Education Fundraising",
    description: "Raising funds to support student education and supplies.",
    extraDetails:
      "We run dedicated campaigns to collect funds for educational kits, books, and school resources for underprivileged children.",
  },
  {
    icon: FaHandsHelping,
    title: "Volunteer Network",
    description: "Connecting volunteers with social causes that match their skills.",
    extraDetails:
      "We manage a volunteer network where individuals can sign up, manage tasks, and log their service hours.",
  },
  {
    icon: FaLeaf,
    title: "Environment Care",
    description: "Tree planting events and green awareness campaigns.",
    extraDetails:
      "NGOConnect conducts tree plantation drives and eco-awareness events promoting a greener future.",
  },
  {
    icon: FaPeopleCarry,
    title: "Community Events",
    description: "Events to bring people together for social good.",
    extraDetails:
      " We organize various community events to foster solidarity and support local development initiatives.",
  },
];


const Services = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto opacity-80">
          NGOConnect is a community-driven platform dedicated to helping people in
          meaningful ways — from providing food, blood, cleanliness support, and
          medical assistance to empowering volunteers and strengthening local
          communities. Together, we create hope, relief, and positive change.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
