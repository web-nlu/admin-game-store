'use client'

import React, {useEffect, useState} from 'react';
import {Save, Gamepad2, Eye} from 'lucide-react';
import {useParams} from "next/navigation";
import {useCategoryStore} from "@/services/categories/categoriesService";
import {useGameStore} from "@/services/games/gamesService";
import _ from "lodash";
import AppendList from "@/components/common/AppendList";
import SingleUpload from "@/components/common/SingleUpload";
import {useAccountStore} from "@/services/accounts/accountsService";
import ChooseGameForm from "@/components/accounts/setAccounts/ChooseGameForm";
import MultiUpload from "@/components/common/MultiUpload";
import toast from "react-hot-toast";
import BasicInfoForm from "@/components/accounts/setAccounts/BasicInfoForm";
import PriceForm from "@/components/accounts/setAccounts/PriceForm";
import ModalAccountInfo from "@/components/accounts/ModalAccountInfo";
import UpdateStatusButton from "@/components/accounts/UpdateStatusButton";

export default function SetGameAccountForm() {
  const { id } = useParams<{id: string}>();
  const [images, setImages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    salePrice: '',
    image: '',
    info: '',
    server: '',
    description: '',
    features: [''],
    level: '',
    warranty: '',
    tags: [''],
    gameId: ''
  } as BodySetAccount);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {updateAccount, updateStatus} = useAccountStore()

  useEffect(() => {
    if (_.isEmpty(categories)) {
      getCategories()
    }
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/accounts/${id}`)
      .then(async (res) => {
        const { account } = await res.json();
        if(!res.ok) {
          window.location.href = "/san-pham";
          return;
        }
        setImages(account.imageGallery)
        setStatus(account.status || "pending");
        setFormData({
          title: account.title || "",
          price: account.price || "",
          salePrice: account.salePrice || "",
          image: account.image || "",
          info: account.info || "",
          server: account.server || "",
          description: account.description,
          features: account.features || [],
          level: account.level || "",
          warranty: account.warranty ?? "",
          tags: account.tags || [],
          gameId: account.gameId || ""
        })
        await getGames(account.categoryId)
      });
  },[])

  const {categories, getCategories} = useCategoryStore()
  const {getGames} = useGameStore()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const setList = (data: string[], key: 'tags' | 'features') => {
    setFormData((prev) => ({
      ...prev,
      [key]: data
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateAccount(parseInt(id), formData)
    setIsSubmitting(false);
  };

  const handleUpload = async (newImages: ImageDetail[]) => {
    try {
      const res = await fetch(`/api/accounts/images/${id}`, {
        method: 'PUT', // hoặc PATCH tùy backend bạn
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newImages)
      });

      const {images, message} = await res.json();
      if (!res.ok) throw new Error(message);
      setImages(images);
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  const handleDeleteImage= async (id: number) => {
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: 'DELETE'
      });
      const {message} = await res.json();

      if (!res.ok) throw new Error(message);
      toast.success("Xoá thành công")
      return true
    } catch (err) {
      toast.error((err as Error).message);
      return false
    }
  }

  const setStatusAccount= async (status: string) => {
    updateStatus(id, status).then((res) => res && setStatus(status));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg rounded-md p-8 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              Thêm Tài Khoản Game Mới
            </h1>
            <p className="text-gray-600 text-lg">
              Điền thông tin chi tiết để thêm tài khoản game vào cửa hàng
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-lg rounded-md p-8 shadow-2xl mt-6">
          <div className="flex flex-row gap-5 mb-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2"/>
              Chỉnh sửa thông tin
            </button>
            <UpdateStatusButton handleChange={setStatusAccount} status={status} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <BasicInfoForm title={formData.title} server={formData.server} handleInputChange={handleInputChange}/>

            <ChooseGameForm gameId={formData.gameId} handleChangeGame={(value: string) => setFormData((prev) => ({
              ...prev,
              gameId: value
            }))}/>

            {/* Price Information */}
            <PriceForm price={formData.price} salePrice={formData.salePrice} level={formData.level}
                       handleInputChange={handleInputChange}/>

            {/* Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Hình ảnh đại diện <span className="text-red-500">*</span>
              </label>
              <SingleUpload
                image={formData.image}
                handleInputChange={(value: string) =>
                  setFormData((prev) => ({...prev, image: value}))}
              />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Thông tin tài khoản
              </label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Thông tin chi tiết về tài khoản (username, rank, skin, v.v.)"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mô tả chi tiết
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Mô tả chi tiết về tài khoản, ưu điểm, đặc điểm nổi bật..."
              />
            </div>

            {/* Tags */}
            <AppendList list={formData.tags} setList={(list: string[]) => setList(list, 'tags')} title={"Tags"}/>
            <AppendList list={formData.features} setList={(list: string[]) => setList(list, 'features')}
                        title={"Tính năng nổi bật"}/>

            {/* Warranty */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Chính sách bảo hành
              </label>
              <select
                name="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Chọn chính sách bảo hành</option>
                <option value="7 ngày">7 ngày</option>
                <option value="15 ngày">15 ngày</option>
                <option value="30 ngày">30 ngày</option>
                <option value="Vĩnh viễn">Vĩnh viễn</option>
                <option value="Không bảo hành">Không bảo hành</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
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
                    <span>Cập nhật Tài Khoản Game</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-5 shadow-2xl">
          <MultiUpload handleSubmit={handleUpload} availableImages={images} handleDelete={handleDeleteImage}/>
        </div>
      </div>
      {isModalOpen && <ModalAccountInfo accountId={id} closeAction={() => setIsModalOpen(false)} />}
    </div>
  );
}