'use client'

import React, {useEffect, useState} from 'react';
import { Plus, X, Upload, Save, Gamepad2 } from 'lucide-react';
import toast from "react-hot-toast";
import {useCategoryStore} from "@/services/categories/categoriesService";
import _ from "lodash";
import {useGameStore} from "@/services/games/gamesService";
import AppendList from "@/components/accounts/AppendList";

export default function SetGameAccountForm() {
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
  const {categories, getCategories} = useCategoryStore()
  const {games, getGames} = useGameStore()

  useEffect(() => {
    if(_.isEmpty(categories)) {
      getCategories();
    }
  }, [])

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

    // Xử lý dữ liệu trước khi gửi
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      salePrice: parseFloat(formData.salePrice) || 0,
      level: parseInt(formData.level) || 0,
      features: formData.features.filter(f => f.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== '')
    };

    try {
      // Simulate API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })
      const {message} = await response.json();
      if(!response.ok) {
        toast.error(message);
        return
      }

      toast.success('Thêm tài khoản game thành công!');

      // Reset form
      setFormData({
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
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg rounded-t-3xl p-8 shadow-2xl">
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
        <div className="bg-white/95 backdrop-blur-lg rounded-b-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Tiêu đề tài khoản <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="VD: Tài khoản Liên Quân VIP"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Server <span className="text-red-500">*</span>
                </label>
                <select
                  name="server"
                  value={formData.server}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Chọn server</option>
                  <option value="Việt Nam">Việt Nam</option>
                  <option value="Thái Lan">Thái Lan</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Philippines">Philippines</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  defaultValue="0"
                  onChange={(e) => getGames(e.target.value.toString())}
                >
                  <option value="0">Danh mục</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  value={formData.gameId}
                  name="gameId"
                  onChange={handleInputChange}
                >
                  <option value="0">Game</option>
                  {games.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Giá gốc (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Giá khuyến mãi (VNĐ)
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Level <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Hình ảnh đại diện <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4"/>
                  <span>Upload</span>
                </button>
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Thông tin tài khoản <span className="text-red-500">*</span>
              </label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Thông tin chi tiết về tài khoản (username, rank, skin, v.v.)"
                required
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Mô tả chi tiết về tài khoản, ưu điểm, đặc điểm nổi bật..."
              />
            </div>

            {/* Features */}
            <AppendList list={formData.tags} setList={(list: string[]) => setList(list, 'tags')} title={"Tags"} />
            <AppendList list={formData.features} setList={(list: string[]) => setList(list, 'features')} title={"Tính năng nổi bật"} />

            {/* Warranty */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Chính sách bảo hành
              </label>
              <select
                name="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5"/>
                    <span>Tạo Tài Khoản Game</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}