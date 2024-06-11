import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAssest = () => {
  const [assest, setAssest] = useState({
    category: "",
    ownerf: "",
    ownerl: "",
    description: "",
    serialno: "",
    modelno: ""
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((response) => {
        if (response.data.Status) {
          setCategories(response.data.Result);
        } else {
          setError("An error occurred while fetching categories.");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred while fetching categories.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_assest", assest)
      .then((response) => {
        if (response.data.Status) {
          navigate("/dashboard/assests");
        } else {
          setError(response.data.Error ? response.data.Error : "An error occurred while adding the asset.");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred while adding the asset.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssest({ ...assest, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Asset</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={assest.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="ownerf" className="form-label">
              Owner First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="ownerf"
              name="ownerf"
              placeholder="Enter Owner First Name"
              value={assest.ownerf}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="ownerl" className="form-label">
              Owner Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="ownerl"
              name="ownerl"
              placeholder="Enter Owner Last Name"
              value={assest.ownerl}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="description"
              name="description"
              placeholder="Enter Description"
              value={assest.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="serialno" className="form-label">
              Serial Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="serialno"
              name="serialno"
              placeholder="Enter Serial Number"
              value={assest.serialno}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="modalno" className="form-label">
              Modal Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="modelno"
              name="modelno"
              placeholder="Enter Modal Number"
              value={assest.modelno}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssest;
