
import { base_Api } from "@/utils/network";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ProjectDetails = () => {
  const router = useRouter();
  const [project, setProject] = useState({});
  const [copySuccess, setCopySuccess] = useState('');
  const id = router.query.id;

  useEffect(() => {
    async function fetchProject() {
      if (id) {
        try {
          const res = await axios.get(`${base_Api}/api/scripts/generate/${id}`);
          setProject(res.data);
        } catch (err) {
          console.error("Error fetching project:", err);
        }
      }
    }
    fetchProject();
  }, [id]);

  // Function to handle copying the script to the clipboard
  const handleCopy = () => {
    const scriptTag = `<script src="${project?.script}"></script>`;
    navigator.clipboard.writeText(scriptTag)
      .then(() => {
        setCopySuccess('Script copied!');
        setTimeout(() => setCopySuccess(''), 3000); // Clear the success message after 3 seconds
      })
      .catch(() => setCopySuccess('Failed to copy!'));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-white mb-4">{project?.name}</h1>
      <p className="text-gray-300 mb-4">Inject this script into your website:</p>
      <div className="relative bg-gray-900 p-4 rounded-md text-gray-200 mb-4">
        <pre className="whitespace-pre-wrap">
          <code>{`<script src="${project?.script}"></script>`}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Copy
        </button>
      </div>
      {copySuccess && <p className="text-green-500">{copySuccess}</p>}
    </div>
  );
};

export default ProjectDetails;
