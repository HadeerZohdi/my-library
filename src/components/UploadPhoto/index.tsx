import React, { useState, useEffect } from "react";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "./style.css";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
interface upload {
  handleChangeImg: (img: string) => void;
  image: string;
}

const UploadPhoto: React.FC<upload> = ({ handleChangeImg, image }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(image);

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    } else {
      const storageRef = ref(storage, `/images/${info.file.uid}`);
      //@ts-ignore
      const snapshot = await uploadBytes(storageRef, info.file.originFileObj);
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        handleChangeImg(url);
      });
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (image) setImageUrl(image);
  }, [image]);

  return (
    <>
      <Upload
        name="cover"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          loading ? (
            <LoadingOutlined />
          ) : (
            <img
              src={imageUrl}
              alt="cover"
              style={{
                width: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          )
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadPhoto;
