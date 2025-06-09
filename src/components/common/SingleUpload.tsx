'use client'
import {Upload} from "lucide-react";
import React, {useEffect, useState} from "react";
import {CldImage, CldUploadWidget, CloudinaryUploadWidgetInfo} from "next-cloudinary";

type Props = {
  image?: string;
  handleInputChange(value: string): void;
}

export default function SingleUpload({ handleInputChange, image = "" }: Props) {
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    setPublicId(image)
  }, [image]);

  return (
    <div className="flex items-center space-x-4">
      <CldUploadWidget
        uploadPreset="pujjdcar"
        options={{multiple: false}}
        onSuccess={(result, { widget }) => {
          setPublicId((result.info as CloudinaryUploadWidgetInfo ).public_id || "");
          handleInputChange((result.info as CloudinaryUploadWidgetInfo ).public_id || "");
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <button
              onClick={() => open()}
              type="button"
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
            >
              <Upload className="w-4 h-4"/>
              <span>Upload</span>
            </button>
          );
        }}
      </CldUploadWidget>
      {publicId && (
        <div className="mt-2">
          <CldImage
            width="100"
            height="100"
            src={publicId}
            alt="Preview"
          />
        </div>
      )}
    </div>
  )
}