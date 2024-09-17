import { base_Api } from "@/utils/network";
import { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(`${base_Api}/api/projects`);
      const data = await response.json();
      setProjects(data);
    }

    fetchProjects();
  }, []);

  return (
    <div className="flex w-full h-screen flex-col items-center">
      <h1 className="text-5xl font-medium mt-12 ">
        Best A/B testing AI Software{" "}
      </h1>
      <h2 className="text-3xl font-semibold mt-12 "> Your Projects</h2>
      <table className="w-[70vw] mt-12 mb-6 border-separate border-spacing-2 border-double border-4 border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-4 border-2 border-white">Sr no</th>
            <th className="p-4 border-2 border-white">Name</th>
            <th className="p-4 border-2 border-white">Description</th>

            <th className="p-4 border-2 border-white">Domain</th>
            <th className="p-4 border-2 border-white">Created At</th>
            <th className="p-4 border-2 border-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project,index) => (
            <tr key={project.id} className="bg-gray-800 text-white">
              <td className="p-4 border-2 border-white">{index+1}</td>
              <td className="p-4 border-2 border-white">{project.name}</td>
              <td className="p-4 border-2 border-white">
                {project.description}
              </td>
              <td className="p-4 border-2 border-white">{project.domain}</td>
              <td className="p-4 border-2 border-white">
                {new Date(project.created_at).toLocaleString()}
              </td>

              <td className="p-4 border-2 border-white">
                <Link href={`/projects/${project.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Project
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={`/create/`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Project
        </button>
      </Link>
    </div>
  );
};

export default Home;
