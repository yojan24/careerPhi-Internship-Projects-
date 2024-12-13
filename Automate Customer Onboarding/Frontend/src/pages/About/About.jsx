import React from "react";
import { useSelector } from "react-redux";

function AboutUs() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="h-[60vh] relative">
        {/* Background Image */}
        <img
          src="city.jpg" // A subtle, minimal background image
          className="w-full h-full object-cover brightness-50  transition-all ease-in-out duration-700 transform"
          alt="background"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent bg-opacity-60 z-10"></div>

        {/* Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-20 text-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold md:mb-4 leading-snug tracking-wider">
            Who We Are
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md mx-auto opacity-80 md:mb-6">
            Your Trusted Partner in Insurance Coverage
          </p>
          {/* Additional Text in Hero Section */}
          <p className="text-xs sm:text-sm md:text-base text-gray-300 opacity-90 mb-8">
            Our mission is to offer you the peace of mind that comes with
            reliable and affordable coverage. Whether you're protecting your
            car, home, or health, we’ve got you covered with personalized
            solutions.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 text-[#563A9C]">
            Our Mission
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            At Insurance, we are committed to providing reliable, affordable
            insurance coverage that adapts to your needs. Whether you're looking
            to protect your car, health, or home, our goal is to make insurance
            simple, transparent, and accessible for everyone.
          </p>

          <h2 className="text-4xl font-semibold mb-8 text-[#563A9C]">
            Our Vision
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            We envision a world where everyone has access to the right insurance
            to protect their future. By offering customizable coverage plans, we
            help our clients feel confident knowing that their insurance needs
            are taken care of.
          </p>

          <h2 className="text-4xl font-semibold mb-8 text-[#563A9C]">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-[#563A9C]">
                Personalized Service
              </h3>
              <p className="text-gray-700 mt-4">
                Tailored coverage options designed for your unique needs.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-[#563A9C]">
                Transparency
              </h3>
              <p className="text-gray-700 mt-4">
                Clear, understandable policies with no hidden fees.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-[#563A9C]">
                Customer-Centric Approach
              </h3>
              <p className="text-gray-700 mt-4">
                We put your peace of mind first.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-[#563A9C]">
                Expert Guidance
              </h3>
              <p className="text-gray-700 mt-4">
                With years of experience, we offer trusted advice to guide your
                decisions.
              </p>
            </div>
          </div>

          {/* Additional Image Section */}
          <div className="relative mb-12">
            <img
              src="about.jpg" // Image of the insurance team or service
              className="w-full h-96 object-cover object-center rounded-lg shadow-lg"
              alt="team"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
              <p className="text-white text-lg font-semibold">
                Our dedicated team is here to support you every step of the way.
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-semibold mb-8 text-[#563A9C]">
            Our Values
          </h2>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-4 text-lg text-gray-700">
              <li>Integrity: We always act in your best interest.</li>
              <li>
                Commitment: We're dedicated to providing the best service and
                support.
              </li>
              <li>
                Trust: Building long-term relationships through reliable
                coverage and honest advice.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-[#563A9C] mb-6">
            Ready to find the right coverage for you?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-700">
            Let us help you secure your future with reliable and affordable
            insurance options.
          </p>
          <a
            href="#"
            className="bg-[#563A9C] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#6D48B1] transition duration-300"
          >
            Explore Our Coverage Plans
          </a>
        </div>
      </section>
    </section>
  );
}

export default AboutUs;
