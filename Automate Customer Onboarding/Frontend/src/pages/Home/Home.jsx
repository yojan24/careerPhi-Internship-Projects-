import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Home() {
  const { userInfo } = useSelector((state) => state.auth);

  const scroll = () => {
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // Show 3 FAQs initially

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const showMore = () => {
    setVisibleCount(visibleCount === 3 ? faqs.length : 3);
  };
  const faqs = [
    {
      question: "What is car insurance, and why do I need it?",
      answer:
        "Car insurance protects you financially in case of accidents, theft, or damage to your vehicle. It's also legally required in most places to cover liabilities for injuries or property damage to others.",
    },
    {
      question: "What does car insurance typically cover?",
      answer:
        "Car insurance usually covers collision damage, liability for injuries or property damage, and sometimes comprehensive coverage for theft, fire, or natural disasters.",
    },
    {
      question: "What are the different types of car insurance coverage?",
      answer:
        "The main types include liability, collision, comprehensive, personal injury protection (PIP), uninsured/underinsured motorist, and gap insurance.",
    },
    {
      question: "What does health insurance typically cover?",
      answer:
        "Health insurance covers medical services like doctor visits, hospital stays, prescription medications, preventive care, and sometimes dental and vision care, depending on the plan.",
    },
    {
      question: "How does a car insurance deductible work?",
      answer:
        "A car insurance deductible is the amount you pay out of pocket for repairs or claims before your insurance covers the remaining costs.",
    },
    {
      question: "What is the benefit of health insurance?",
      answer:
        "Health insurance helps you manage medical expenses, ensuring you can access essential healthcare services without financial strain.",
    },
    {
      question: "Do I need health insurance if I’m young and healthy?",
      answer:
        "Yes, health insurance is important even if you're healthy. It protects you financially in case of unexpected emergencies like accidents or illnesses.",
    },
    {
      question: "What factors affect car insurance premiums?",
      answer:
        "Factors include your driving history, age, location, type of car, coverage limits, and whether you've filed previous claims.",
    },
    {
      question: "How can I reduce my car insurance premiums?",
      answer:
        "You can lower premiums by maintaining a clean driving record, bundling insurance policies, choosing a higher deductible, and taking advantage of discounts like safe driver programs.",
    },
    {
      question: "What are network providers in health insurance?",
      answer:
        "Network providers are healthcare professionals and facilities that have agreements with your health insurer to provide services at reduced rates.",
    },
  ];

  return (
    <section className="relative">
      <div className="md:h-[92vh] h-[90vh] relative">
        {/* Image */}
        <img
          src="home.jpg"
          className="w-full h-full object-cover object-top brightness-75"
          alt="background"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent bg-opacity-60 z-10"></div>

        {/* Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-20 text-center px-4 md:px-8">
          {/* Main Quote */}
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 leading-snug tracking-wider">
            Insurance for today, security for tomorrow.
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl mb-6 max-w-lg mx-auto opacity-80">
            Protect your assets and your health with coverage that adapts to
            your needs. We’re here to secure your future.
          </p>

          {/* Conditional CTA based on login */}
          <div className="flex justify-center gap-4">
            {!userInfo && (
              <Link
                to="/login" // this links to login or dashboard section
                className="bg-[#563A9C] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#6D48B1] transition duration-300 transform hover:scale-105"
              >
                Login to Explore
              </Link>
            )}

            <button
              onClick={scroll}
              className="bg-transparent border-2 border-[#563A9C] text-[#563A9C] py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#563A9C] hover:text-white transition duration-300 transform hover:scale-105"
            >
              Explore Coverage
            </button>
          </div>
        </div>
      </div>

      <section id="explore" className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 text-[#563A9C]">
            Explore Our Coverage Plans
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            Whether you're looking for comprehensive car insurance or robust
            health insurance, we have you covered. Our plans are flexible,
            affordable, and tailored to fit your needs.
          </p>

          {/* Car Insurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 px-4 max-w-6xl mx-auto">
            {/* Car Insurance Section */}
            <div className="flex flex-col items-center justify-center border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full md:w-[95%] lg:w-[90%]">
              <h3 className="text-2xl font-semibold mb-3 text-[#563A9C] text-center">
                Car Insurance
              </h3>
              <div className="w-full flex justify-center mb-4">
                <img
                  src="car.png"
                  className="h-[150px] w-[150px] object-contain"
                  alt="Health Insurance"
                />
              </div>
              <p className="text-base mb-4 text-center text-gray-700">
                Protect your car and your peace of mind with our car insurance
                plans. Choose from multiple coverage options.
              </p>
              <ul className="list-disc pl-4 mb-6 text-left text-gray-700 text-sm">
                <li>Accidents, theft, and vandalism coverage.</li>
                <li>Liability and personal injury protection.</li>
                <li>Flexible payment options and deductible plans.</li>
              </ul>
              <a
                href="car-Quotation"
                className="bg-[#563A9C] text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-[#6D48B1] transition duration-300"
              >
                Get a Free Car Insurance Quote
              </a>
            </div>

            {/* Health Insurance Section */}
            <div className="flex flex-col items-center justify-center border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full md:w-[95%] lg:w-[90%]">
              <h3 className="text-2xl font-semibold mb-3 text-[#563A9C] text-center">
                Health Insurance
              </h3>
              <div className="w-full flex justify-center mb-4">
                <img
                  src="health.png"
                  className="h-[150px] w-[150px] object-contain"
                  alt="Health Insurance"
                />
              </div>
              <p className="text-base text-center mx-4 mb-4 text-gray-700">
                Stay protected with health insurance coverage that adapts to
                your needs.
              </p>
              <ul className="list-disc pl-4 mb-6 text-left text-gray-700 text-sm">
                <li>
                  Coverage for doctor visits, hospital stays, and surgeries.
                </li>
                <li>Prescription medication coverage.</li>
                <li>Flexible deductible and co-pay options.</li>
              </ul>
              <a
                href="/health-Quotation"
                className="bg-[#563A9C] text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-[#6D48B1] transition duration-300"
              >
                Get a Free Health Insurance Quote
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
            <h4 className="text-3xl font-semibold text-center mb-6 text-[#563A9C]">
              Coverage Comparison
            </h4>
            <table className="min-w-full text-left text-sm md:text-lg">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4 text-[#563A9C]">Feature</th>
                  <th className="border-b py-2 px-4 text-[#563A9C]">
                    Car Insurance
                  </th>
                  <th className="border-b py-2 px-4 text-[#563A9C]">
                    Health Insurance
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b py-2 px-4">Accident Coverage</td>
                  <td className="border-b py-2 px-4">Yes</td>
                  <td className="border-b py-2 px-4">No</td>
                </tr>
                <tr>
                  <td className="border-b py-2 px-4">Prescription Coverage</td>
                  <td className="border-b py-2 px-4">No</td>
                  <td className="border-b py-2 px-4">Yes</td>
                </tr>
                <tr>
                  <td className="border-b py-2 px-4">Theft Protection</td>
                  <td className="border-b py-2 px-4">Yes</td>
                  <td className="border-b py-2 px-4">No</td>
                </tr>
                <tr>
                  <td className="border-b py-2 px-4">Dental Coverage</td>
                  <td className="border-b py-2 px-4">No</td>
                  <td className="border-b py-2 px-4">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-semibold mb-4 text-[#563A9C] py-2">
              Frequently Asked Questions
            </h3>
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                {faqs.slice(0, visibleCount).map((faq, index) => (
                  <li key={index} className="border-b border-gray-300 pb-2">
                    <div
                      className="flex justify-between items-center cursor-pointer text-lg transition-all duration-300 ease-in-out"
                      onClick={() => toggleFAQ(index)}
                    >
                      <strong className="transition-all duration-300 ease-in-out">
                        {faq.question}
                      </strong>
                      <button
                        className="text-gray-600 focus:outline-none transform transition-transform duration-300 ease-in-out"
                        style={{
                          transform:
                            openIndex === index
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center mt-4">
                <button
                  className="text-[#563A9C] font-medium hover:underline transition-all duration-300 ease-in-out"
                  onClick={showMore}
                >
                  {visibleCount === 3 ? "Show More" : "Show Less"}
                </button>
              </div>
            </div>
          </div>

          {/* Final CTA */}
        </div>
      </section>
    </section>
  );
}

export default Home;
