import React, { useState } from 'react';
import axios from 'axios';
import { base_Api } from "@/utils/network";


const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_Api}/api/projects`, formData);
     
      setFormData({
        name: '',
        description: '',
        domain: '',
      });
      alert('Project created successfully');
      // You can also handle success messages or redirection here
    } catch (error) {
      console.error('Error creating project:', error);
      // You can handle error messages here
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" w-[28rem] p-6 bg-gray-800 rounded-lg">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="domain">
          Domain
        </label>
        <input
          type="text"
          id="domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};



const Home = () => {
  

  return (
    <div className="flex w-full h-screen flex-col items-center">
      <h1 className="text-5xl font-medium mt-12 ">
        Best A/B testing AI Software{" "}
      </h1>
      <h2 className="text-3xl font-semibold mt-12 mb-4 "> Create Projects</h2>
      <ProjectForm />
    </div>
  );
};

export default Home;