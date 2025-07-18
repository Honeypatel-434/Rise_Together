import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target.featureInput.value,
    });
    e.target.featureInput.value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (gig) => {
      const response = await newRequest.post("/gigs", gig);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
    onError: (error) => {
      console.error("Error posting gig:", error.response?.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = getCurrentUser();

    const gigWithUser = {
      ...state,
      userId: currentUser._id,
    };

    console.log("Submitting gig:", gigWithUser);
    mutation.mutate(gigWithUser);
    navigate("/mygigs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Campaign</h1>
        <div className="sections">
          <div className="info">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Project name"
              onChange={handleChange}
            />

            <label>Category</label>
            <select name="cat" onChange={handleChange}>
              <option value="SmartDevices">SmartDevices</option>
              <option value="AppSoftware">AppSoftware</option>
              <option value="Robotics">Robotics</option>
              <option value="Blockchain">Blockchain</option>
              <option value="SecurityPrivacy">SecurityPrivacy</option>
              <option value="LogoDesign">LogoDesign</option>
              <option value="AITools">AITools</option>
              <option value="Other">Other</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label>Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <label>Description</label>
            <textarea
              name="desc"
              placeholder="Brief description to introduce your service"
              rows="16"
              onChange={handleChange}
            ></textarea>

            <button onClick={handleSubmit}>Create</button>
          </div>

          <div className="details">
            <label>Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label>Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              placeholder="Short description of your service"
              rows="10"
            ></textarea>

            <label>expected investment</label>
            <input
              type="number"
              name="deliveryTime"
              onChange={handleChange}
            />

            <label>no of years</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />

            <label htmlFor="featureInput">Add Investors</label>
            <form className="add" onSubmit={handleFeature}>
              <input
                type="text"
                id="featureInput"
                name="featureInput"
                placeholder="e.g. page design"
                required
              />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f} <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label>company valuation</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
