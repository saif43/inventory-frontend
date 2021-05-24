import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

const ImageUploader = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImage(imageList);
    onImageSelect(imageList[0]);
  };

  const renderDropButton = (isDragging, onImageUpload, dragProps) => {
    if (!image) {
      return (
        <button
          style={isDragging ? { color: "red" } : null}
          onClick={onImageUpload}
          className="form-control mb-3"
          type="file"
          {...dragProps}
        >
          Click or Drop here
        </button>
      );
    }
  };

  return (
    <ImageUploading
      value={image}
      acceptType={["jpg", "jpeg", "png"]}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div>
          {renderDropButton(isDragging, onImageUpload, dragProps)}
          &nbsp;
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <div className="image-item__btn-wrapper">
                <button
                  className="btn btn-success"
                  onClick={() => onImageUpdate(index)}
                >
                  Update
                </button>
                <button
                  style={{ marginLeft: "3%" }}
                  className="btn btn-secondary"
                  onClick={() => {
                    onImageRemove(index);
                    setImage(null);
                  }}
                >
                  Remove
                </button>
              </div>
              <img
                src={image.data_url}
                className="img-fluid"
                alt="Responsive"
              />
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
