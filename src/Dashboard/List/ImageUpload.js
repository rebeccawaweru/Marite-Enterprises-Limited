import React from "react";
import "./ImageUpload.css";

const ImageUpload = ({ selectedFiles, setSelectedFiles }) => {
  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <button
          type="button"
          className="close alert alert-success alert-dismissible"
          data-dismiss="alert"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          &times;
          <img src={photo} alt="" key={photo} className="propertyphotos" />
        </button>
      );
    });
  };

  return (
    <div className="app">
      <div>
        <input type="file" id="file" multiple onChange={handleImageChange} />
        <div className="label-holder">
          <label htmlFor="file" className="label"></label>
        </div>
        <div className="result">{renderPhotos(selectedFiles)}</div>
      </div>
    </div>
  );
};

export default ImageUpload;
 