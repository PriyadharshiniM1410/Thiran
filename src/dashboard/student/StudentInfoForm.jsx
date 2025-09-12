import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentInfoForm(props) {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    graduationYear: "",
    currentStatus: "",
    description: "",
    photoUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  const [pendingId, setPendingId] = useState(null);


  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      axios.get(`http://localhost:5000/students?username=${username}`)
        .then(res => {
          if (res.data.length > 0) {
            setStudent(res.data[0]);
            setIsApproved(true);
          } else {
            axios.get(`http://localhost:5000/pendingRequests?username=${username}`)
              .then(res2 => {
                if (res2.data.length > 0) {
                  setStudent(res2.data[0]);
                  setPendingId(res2.data[0].id);
                  setIsApproved(false);
                }
              });
          }
        });
    }
  }, []);

  
  function handleChange(event) {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  
  function validate() {
    const newErrors = {};

    if (!student.firstName) newErrors.firstName = "First Name is required.";
    if (!student.lastName) newErrors.lastName = "Last Name is required.";

    //username validate
    if (!student.username) {
      newErrors.username = "Username is required.";
    } else if (student.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    } else if (student.username.indexOf(" ") !== -1) {
      newErrors.username = "Username should not contain spaces.";
    }

    //mail validate
    const atPos = student.email.indexOf("@");
    const dotPos = student.email.indexOf(".", atPos);
    if (!student.email) {
      newErrors.email = "Email is required.";
    } else if (atPos === -1 || dotPos === -1 || atPos === 0 || dotPos === student.email.length - 1) {
      newErrors.email = "Enter a valid email address.";
    }
    
    //phone no validate
    if (student.phoneNumber) {
      if (student.phoneNumber.length !== 10 || isNaN(student.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be 10 digits.";
      }
    }

    //graduationyear validate
    if (!student.graduationYear) {
      newErrors.graduationYear = "Graduation Year is required.";
    } else if (student.graduationYear.length !== 4 || isNaN(student.graduationYear)) {
      newErrors.graduationYear = "Enter a valid 4-digit year (e.g., 2025).";
    }

    //currentstatus validate
    if (!student.currentStatus) newErrors.currentStatus = "Please select your current status.";

    //description validate
    if (!student.description || !student.description.trim()) {
      newErrors.description = "Description is required.";
    }

    //photo validate
    if (!student.photoUrl) newErrors.photoUrl = "Photo URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

 
  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    if (isApproved) 
      {
      if (pendingId)
         {
        axios.put(`http://localhost:5000/pendingRequests/${pendingId}`, student)
          .then(() => alert("Your update sent for re-approval."));
      } 
      else 
        {
        axios.post("http://localhost:5000/pendingRequests", student)
          .then(() => alert("Your update submitted for mentor approval."));
      }
    } 
    else {
      if (pendingId) 
        {
        axios.put(`http://localhost:5000/pendingRequests/${pendingId}`, student)
          .then(() => alert("Your pending information updated."));
      } 
      else 
        {
        axios.post("http://localhost:5000/pendingRequests", student)
          .then(() => alert("Your information submitted for mentor approval."));
      }
    }

    if (props.onNext) props.onNext();
  }

  
  return (
    <div className="max-w-3xl mx-auto mt-10 p-2 bg-cyan-400 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mt-5 mb-8">
        Student Information Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <h3 className="text-lg font-semibold mb-1">First Name</h3>
          <input type="text" name="firstName" value={student.firstName} onChange={handleChange}
            placeholder="First Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.firstName ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.firstName && <p className="text-red-600 mt-1">{errors.firstName}</p>}
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-1">Last Name</h3>
          <input type="text" name="lastName" value={student.lastName} onChange={handleChange}
            placeholder="Last Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.lastName ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.lastName && <p className="text-red-600 mt-1">{errors.lastName}</p>}
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-1">Username</h3>
          <input type="text" name="username" value={student.username} onChange={handleChange}
            placeholder="Username"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.username ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.username && <p className="text-red-600 mt-1">{errors.username}</p>}
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-1">Email</h3>
          <input type="text" name="email" value={student.email} onChange={handleChange}
            placeholder="example@email.com"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
          <input type="text" name="phoneNumber" value={student.phoneNumber} onChange={handleChange}
            placeholder="9876543210"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phoneNumber ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.phoneNumber && <p className="text-red-600 mt-1">{errors.phoneNumber}</p>}
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-1">Graduation Year</h3>
          <input type="text" name="graduationYear" value={student.graduationYear} onChange={handleChange}
            placeholder="2025"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.graduationYear ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.graduationYear && <p className="text-red-600 mt-1">{errors.graduationYear}</p>}
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-1">Current Status</h3>
          <select name="currentStatus" value={student.currentStatus} onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.currentStatus ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`}>
            <option value="">Select Status</option>
            <option value="AvailableToWork">Available to Work</option>
            <option value="NotEmployed">Not Employed</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.currentStatus && <p className="text-red-600 mt-1">{errors.currentStatus}</p>}
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-1">Description</h3>
          <textarea name="description" value={student.description} onChange={handleChange}
            rows="4"
            placeholder="Write something about yourself..."
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.description && <p className="text-red-600 mt-1">{errors.description}</p>}
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-1">Photo URL</h3>
          <input type="text" name="photoUrl" value={student.photoUrl} onChange={handleChange}
            placeholder="Photo URL"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.photoUrl ? "border-red-500 focus:ring-red-400" : "focus:ring-purple-400"
            }`} />
          {errors.photoUrl && <p className="text-red-600 mt-1">{errors.photoUrl}</p>}
        </div>

        <div className="text-center">
          <button type="submit"
            className="bg-red-700 text-white font-semibold py-3 px-8 rounded-lg  hover:bg-red-800">
            {isApproved ? "Update (Re-Approval)" : "Submit Info"}
          </button>
        </div>

      </form>
    </div>
  );
}



