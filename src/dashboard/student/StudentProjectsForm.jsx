import { useState } from "react";
import axios from "axios";

export default function StudentProjectsForm({ onNext }) {
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([
    { name: "", description: "", developmentArea: "", gitHub: "", website: "" },
  ]);
  const [errors, setErrors] = useState({});

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...projects];
    updated[index][name] = value;
    setProjects(updated);
    setErrors({ ...errors, projects: null }); 
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { name: "", description: "", developmentArea: "", gitHub: "", website: "" },
    ]);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };


  const validate = () => {
    const newErrors = {};

 
    if (username === "") {
      newErrors.username = "Username is required.";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    } else if (username.indexOf(" ") !== -1) {
      newErrors.username = "Username should not contain spaces.";
    }

    const projectErrors = projects.map((p) => {
      const err = {};

      if (p.name === "") err.name = "Project name is required.";
      if (p.description === "") err.description = "Project description is required.";
      
      if (p.gitHub !== "" && !(p.gitHub.startsWith("http://") || p.gitHub.startsWith("https://"))) {
        err.gitHub = "GitHub URL must start with http:// or https://";
      }

      if (p.website !== "" && !(p.website.startsWith("http://") || p.website.startsWith("https://"))) {
        err.website = "Website URL must start with http:// or https://";
      }

      return err;
    });

    if (projectErrors.some((pe) => Object.keys(pe).length > 0)) {
      newErrors.projects = projectErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/pendingRequests", {
        username,
        projects: projects.filter(p => p.name !== ""),
        status: "pending",
      });

      alert("Projects submitted!");
      setUsername("");
      setProjects([{ name: "", description: "", developmentArea: "", gitHub: "", website: "" }]);
      if (onNext) onNext();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-purple-400 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Student Projects Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-lg font-semibold mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.username ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}
            required
          />
          {errors.username && <p className="text-red-600 mt-1">{errors.username}</p>}
        </div>

        
        {projects.map((project, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white space-y-4">
            <h3 className="text-lg font-semibold text-red-700">Project {index + 1}</h3>

            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <input
                type="text"
                name="name"
                value={project.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter project name"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.projects?.[index]?.name ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
                }`}
                required
              />
              {errors.projects?.[index]?.name && (
                <p className="text-red-600 mt-1">{errors.projects[index].name}</p>
              )}
            </div>

          
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                rows="3"
                placeholder="Brief description"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.projects?.[index]?.description ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
                }`}
                required
              />
              {errors.projects?.[index]?.description && (
                <p className="text-red-600 mt-1">{errors.projects[index].description}</p>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-1">Development Area</label>
              <input
                type="text"
                name="developmentArea"
                value={project.developmentArea}
                onChange={(e) => handleChange(index, e)}
                placeholder="Frontend / Backend / Fullstack"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Link</label>
              <input
                type="text"
                name="gitHub"
                value={project.gitHub}
                onChange={(e) => handleChange(index, e)}
                placeholder="https://github.com/username/project"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.projects?.[index]?.gitHub ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
                }`}
              />
              {errors.projects?.[index]?.gitHub && (
                <p className="text-red-600 mt-1">{errors.projects[index].gitHub}</p>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-1">Website Link</label>
              <input
                type="text"
                name="website"
                value={project.website}
                onChange={(e) => handleChange(index, e)}
                placeholder="https://project-website.com"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.projects?.[index]?.website ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
                }`}
              />
              {errors.projects?.[index]?.website && (
                <p className="text-red-600 mt-1">{errors.projects[index].website}</p>
              )}
            </div>

            
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove Project
              </button>
            )}
          </div>
        ))}

        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-700"
          >
            + Add Another Project
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
          >
            Submit Projects
          </button>
        </div>
      </form>
    </div>
  );
}



