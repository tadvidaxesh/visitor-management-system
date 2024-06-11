import React, { useEffect, useState } from "react";
import axios from "axios";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/visitors");
        setVisitors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center mb-3">
        <h2>Visitors List</h2>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Resume</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index}>
                <td>{visitor.firstName}</td>
                <td>{visitor.lastName}</td>
                <td>{visitor.dob}</td>
                <td>{visitor.gender}</td>
                <td>{visitor.email}</td>
                <td>{visitor.contactNo}</td>
                <td>{visitor.address}</td>
                <td><a href={`http://localhost:3000/Images/` + visitor.resume}>View Resume</a></td>
                <td><img src={`http://localhost:3000/Images/` + visitor.image} alt="Visitor Image" style={{ width: "50px" }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Visitors;
