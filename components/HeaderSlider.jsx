import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Smart Home Automation Made Simple & Affordable",
      offer: "Get flat 5% Off On Your First Installation!",
      buttonText1: "Request Quote",
      buttonLink1: "/quotation",
      buttonText2: "Learn More",
      buttonLink2: "/learn-more",
      imgSrc: assets.slide_img_1,
    },
    {
      id: 2,
      title: "Control Every Room with One Tap - Ultimate Comfort",
      offer: "Book Your Free Consultation",
      buttonText1: "Book Now",
      buttonLink1: "/contact-us",
      buttonText2: "View Products",
      buttonLink2: "/all-products",
      imgSrc: assets.slide_img_2,
    },
    {
      id: 3,
      title: "Experience The Future",
      offer: "Get 10% off on first Installation!",
      buttonText1: "Get Started",
      buttonLink1: "/get-started",
      buttonText2: "Explore Plans",
      buttonLink2: "/estimate-cost-calculator",
      imgSrc: assets.slide_img_3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-auto mx-2 sm:mx-4 md:my-10 md:mx-6 lg:mx-8">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold text-black">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6">
                <Link
                  href={slide.buttonLink1}
                  className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium inline-block text-center"
                >
                  {slide.buttonText1}
                </Link>
                <Link
                  href={slide.buttonLink2}
                  className="group flex items-center gap-2 px-6 py-2.5 font-medium ml-4 text-black"
                >
                  {slide.buttonText2}
                  <ArrowRight 
                    className="group-hover:translate-x-1 transition" 
                    size={20}
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="w-96 h-auto object-contain rounded-xl"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={384}
                height={384}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
