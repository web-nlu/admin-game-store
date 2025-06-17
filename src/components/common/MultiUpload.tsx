'use client'
import React, {useEffect, useState} from "react";
import {CldImage, CldUploadWidget, CloudinaryUploadWidgetInfo} from "next-cloudinary";
import {Save, Upload} from "lucide-react";

type Props = {
  availableImages: ImageDetail[],
  handleSubmitAction: (images: ImageDetail[]) => Promise<void>,
  handleDeleteAction: (id: number) => Promise<boolean>,
}

export default function MultiUpload({availableImages, handleSubmitAction, handleDeleteAction}: Props) {
  let publicIds: string[] = [];
  const [images, setImages] = useState<ImageDetail[]>([]);
  const [startPos, setStartPos] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(availableImages)
    setImages(availableImages)
  }, [JSON.stringify(availableImages)])

  const onSubmit = async () => {
    setIsSubmitting(true);
    await handleSubmitAction(images)
    setIsSubmitting(false);
  }

  // Xóa ảnh
  const handleDeleteImage = async (index: number) => {
    setIsSubmitting(true);
    if(images[index].id){
      const result = await handleDeleteAction(images[index].id)
      if(!result) {
        setIsSubmitting(false);
        return
      }
    }
    setImages(prev => {
      return prev
        .filter((_, i) => i !== index)
        .map((img, idx) => ({
          ...img,
          position: idx + 1
        }))
    });
    setIsSubmitting(false);
  };

  // Drag and Drop để sắp xếp lại
  const handleDragStart = (e: React.DragEvent, startPos: number) => {
    setStartPos(startPos);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newPos: number) => {
    e.preventDefault();

    if (startPos === null || startPos === newPos) return;

    setImages(prev => {

      const newImages = [...prev];
      const draggedImage = newImages[startPos];

      // Xóa ảnh được kéo khỏi vị trí cũ
      newImages.splice(startPos, 1);
      // Chèn vào vị trí mới
      newImages.splice(newPos, 0, draggedImage);

      // Cập nhật lại position
      return newImages.map((img, index) => ({
        ...img,
        position: index + 1
      }));
    });

    setStartPos(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload và Quản lý Ảnh</h2>

      {/* Upload Section */}
      <div className="mb-8">
        <div className="flex items-center justify-center w-full">
          <CldUploadWidget
            uploadPreset="pujjdcar"
            options={{
              multiple: true,
              folder: "products",
              sources: ["local", "google_drive"]
            }}

            onSuccess={(result, {widget}) => {
              publicIds.push((result.info as CloudinaryUploadWidgetInfo).public_id)
            }}
            onQueuesEnd={(result, {widget}) => {
              setImages((prev) => {
                const newImages = publicIds.map((image, index) => ({
                  image,
                  position: prev.length + index + 1
                }));
                return [...prev, ...newImages];
              })

              publicIds = []
              widget.close();
            }}
          >
            {({open}) => {
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
        </div>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Ảnh đã upload ({images.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageData, index: number) => (
              <div
                key={imageData.image}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="relative group bg-white rounded-lg shadow-md overflow-hidden cursor-move hover:shadow-lg transition-shadow"
              >
                <div className="h-fit">
                  <CldImage
                    src={imageData.image}
                    alt={`Image ${imageData.position}`}
                    crop={"fill"}
                    width="200"
                    height="200"
                  />
                </div>

                {/* Overlay với thông tin */}
                <div
                  className="absolute inset-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Đang xử lý...</span>
                        </>
                      ) : (<button
                        onClick={() => handleDeleteImage(index)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>)
                    }
                  </div>
                </div>

                {/* Position badge */}
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  #{imageData.position}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Data JSON Preview */}
      {images.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Dữ liệu ImageData</h3>
          <div className="bg-gray-100 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-sm text-gray-800">
              {JSON.stringify(images, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        onClick={onSubmit}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-md hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Đang xử lý...</span>
          </>
        ) : (
          <>
            <Save className="w-5 h-5"/>
            <span>Cập nhật hình ảnh</span>
          </>
        )}
      </button>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Hướng dẫn sử dụng:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Upload nhiều ảnh cùng lúc bằng cách chọn multiple files</li>
          <li>• Kéo thả ảnh để sắp xếp lại thứ tự (position sẽ tự động cập nhật)</li>
          <li>• Hover vào ảnh và click X để xóa</li>
          <li>• Ảnh được lưu dưới dạng base64 string trong thuộc tính image</li>
        </ul>
      </div>
    </div>
  );
}