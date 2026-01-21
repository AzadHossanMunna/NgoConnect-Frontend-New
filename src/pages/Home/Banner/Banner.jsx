import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/donation.jpg';
import bannerImg2 from '../../../assets/banner/9827028.jpg';
import bannerImg3 from '../../../assets/banner/clean.png';
import bannerImg4 from '../../../assets/banner/needed.jpg';

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}      // ⏱️ 4 seconds
        transitionTime={1000} // smooth 1s fade
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        stopOnHover={false}   // keeps sliding even if hovered
        swipeable={true}
        emulateTouch={true}
      >
        {/* Slide 1 */}
        <div className="relative">
          <img src={bannerImg1} alt="Blood Donation Drive" className="object-cover h-[80vh] w-full" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Join NGOConnect</h1>
            <p className="text-lg md:text-2xl max-w-2xl text-center">
              Together we save lives — be part of our next Blood Donation Campaign.
            </p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img src={bannerImg2} alt="Food Donation Event" className="object-cover h-[80vh] w-full" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Feed a Smile</h1>
            <p className="text-lg md:text-2xl max-w-2xl text-center">
              NGOConnect organizes food donation events to help the hungry and needy.
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img src={bannerImg3} alt="Clean Environment" className="object-cover h-[80vh] w-full" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Clean & Green</h1>
            <p className="text-lg md:text-2xl max-w-2xl text-center">
              Join our environmental drives to keep our community clean and sustainable.
            </p>
          </div>
        </div>
        <div className="relative">
          <img src={bannerImg4} alt="Clean Environment" className="object-cover h-[80vh] w-full" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Clean & Green</h1>
            <p className="text-lg md:text-2xl max-w-2xl text-center">
              Join our environmental drives to keep our community clean and sustainable.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
