import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAssest = () => {
  const { aid } = useParams();
  const [assest, setAssest] = useState({
    aid: "",
    category: "",
    ownerf: "",
    ownerl: "",
    description: "",
    serialno: "",
    modelno: "",
  });
  const navigate = useNavigate();

  
  useEffect(()=> {
    axios.get('http://localhost:3000/auth/assests/'+ aid)
    .then(result => {
        setAssest({
            ...assest,
            aid: result.data.Result[0].aid,
            category: result.data.Result[0].category,
            ownerf: result.data.Result[0].ownerf,
            ownerl: result.data.Result[0].ownerl,
            description: result.data.Result[0].description,
            serialno: result.data.Result[0].serialno,
            modelno: result.data.Result[0].modelno,
        })
    }).catch(err => console.log(err))
}, [])

const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_assest/'+aid, assest)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/assests')
        } else {
            alert(result.data.Error)
        }
    }).catch(err => console.log(err))
}
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Assest</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputId" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputId"
              placeholder="Enter ID"
              value={assest.aid}
              onChange={(e) => setAssest({ ...assest, aid: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputCategory" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputCategory"
              placeholder="Enter Category"
              value={assest.category}
              onChange={(e) =>
                setAssest({ ...assest, category: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputOwnerf" className="form-label">
              Owner First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputOwnerf"
              placeholder="Enter Owner First Name"
              value={assest.ownerf}
              onChange={(e) =>
                setAssest({ ...assest, ownerf: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputOwnerl" className="form-label">
              Owner Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputOwnerl"
              placeholder="Enter Owner Last Name"
              value={assest.ownerl}
              onChange={(e) =>
                setAssest({ ...assest, ownerl: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDescription"
              placeholder="Enter Description"
              value={assest.description}
              onChange={(e) =>
                setAssest({ ...assest, description: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSerialNo" className="form-label">
              Serial Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSerialNo"
              placeholder="Enter Serial Number"
              value={assest.serialno}
              onChange={(e) =>
                setAssest({ ...assest, serialno: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputModalNo" className="form-label">
              Modal Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputModalNo"
              placeholder="Enter Modal Number"
              value={assest.modelno}
              onChange={(e) =>
                setAssest({ ...assest, modelno: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Assest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssest;
