import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Assest = () => {
  const [assests, setAssests] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/assests")
      .then((result) => {
        if (result.data.Status) {
          setAssests(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (aid) => {
    axios
      .delete('http://localhost:3000/auth/delete_assest/' + aid)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Assest List</h3>
      </div>
      <Link to="/dashboard/add_assest" className="btn btn-success">
        Add Assest
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Owner (First Name)</th>
              <th>Owner (Last Name)</th>
              <th>Description</th>
              <th>Serial No</th>
              <th>Model Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assests.map((assest) => (
              <tr key={assest.aid}>
                <td>{assest.category}</td>
                <td>{assest.ownerf}</td>
                <td>{assest.ownerl}</td>
                <td>{assest.description}</td>
                <td>{assest.serialno}</td>
                <td>{assest.modelno}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_assest/${assest.aid}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(assest.aid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assest;
