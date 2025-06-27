import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
      <p className="text-gray-600 mb-4">
        We are dedicated to providing the best property registration and management system.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To simplify the property registration process and make it accessible to everyone.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Transparency</li>
            <li>Reliability</li>
            <li>Customer Focus</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
