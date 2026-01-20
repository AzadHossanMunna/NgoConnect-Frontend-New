import React from 'react';
import Banner from '../Banner/Banner'
import Services from '../Services/Services';
import ClientSlider from '../ClientSlider/ClientSlider';
import HowWeWork from '../HowWeWork/HowWeWork';
import BenefitsSection from '../BenefitsSection/BenefitsSection';
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorks from '../HowItWorks/HowItWorks';
import Testimonials from '../Testimonials/Testimonials';
import FAQSection from '../FAQSection/FAQSection';
import RecentDonations from '../RecentDonations/RecentDonations';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentDonations />
            <Services></Services>
            <ClientSlider></ClientSlider>
            <BenefitsSection></BenefitsSection>
            <BeMerchant></BeMerchant>
            <HowItWorks></HowItWorks>
            <HowWeWork></HowWeWork>
            <Testimonials></Testimonials>
            <FAQSection></FAQSection>

             
        </div>
    );
};

export default Home;