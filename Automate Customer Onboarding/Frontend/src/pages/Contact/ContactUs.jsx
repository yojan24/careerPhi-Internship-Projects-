import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const submit = async (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  // Show SweetAlert success message after form submission
  Swal.fire({
    title: "Thank You!",
    text: "Your message has been submitted successfully. We'll get back to you soon.",
    icon: "success",
    confirmButtonText: "Okay",
    confirmButtonColor: "#563A9C", // Customize the button color
  });

  // Reset form (optional)
  e.target.reset();
};

function ContactUs() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold mb-4 text-[#563A9C]">
          Contact Us
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
          We’d love to hear from you! Whether you have a question, need
          assistance, or want to get a personalized quote, feel free to reach
          out.
        </p>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-[#563A9C] mb-6">
            Get in Touch
          </h3>
          <form action="#" method="POST" onSubmit={submit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-lg p-3"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-700 mb-2">Message</label>
              <textarea
                className="border border-gray-300 rounded-lg p-3 w-full"
                rows="6"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#563A9C] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#6D48B1] transition duration-300"
              >
                Submit Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#563A9C]">Phone</h3>
            <p className="text-lg text-gray-700">+1 (800) 123-4567</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#563A9C]">Email</h3>
            <p className="text-lg text-gray-700">support@insurance.com</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#563A9C]">Office</h3>
            <p className="text-lg text-gray-700">
              123 Insurance Blvd, City, State, 12345
            </p>
          </div>
        </div>

        {/* Google Map (Optional) */}
        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_EMBED_URL"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>

        {/* Business Hours */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-[#563A9C] mb-4">
            Our Hours
          </h3>
          <p className="text-lg text-gray-700">Monday - Friday: 9 AM - 6 PM</p>
          <p className="text-lg text-gray-700">Saturday: 10 AM - 2 PM</p>
          <p className="text-lg text-gray-700">Sunday: Closed</p>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
