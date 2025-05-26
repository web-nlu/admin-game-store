'use client'

import {Save, X} from "lucide-react";
import {useState} from "react";
import {useCategoryStore} from "@/services/categories/categoriesService";

type Props = {
  category: Category | null;
  afterSubmitAction?: () => void;
  closeAction: () => void;
}

export default function ModalDetail({category, afterSubmitAction, closeAction}: Props) {
  const [errors, setErrors] = useState({ name: '', icon: '' });
  const [formData, setFormData] = useState({ name: category?.name, icon: category?.icon } as Omit<Category, 'id'>);
  const {createCategory, updateCategory} = useCategoryStore()

  const handleSubmit = () => {
    // Reset errors
    setErrors({ name: '', icon: '' });

    // Validate form
    let hasErrors = false;
    if (!formData.name?.trim()) {
      setErrors(prev => ({ ...prev, name: 'Tên danh mục không được để trống' }));
      hasErrors = true;
    }
    if (!formData.icon?.trim()) {
      setErrors(prev => ({ ...prev, icon: 'Icon không được để trống' }));
      hasErrors = true;
    }

    if (hasErrors) return;

    if (category) {
      // Update existing category
      updateCategory(category.id, formData);
    } else {
      createCategory({
        name: formData.name || "",
        icon: formData.icon || ""
      });
    }

    if(afterSubmitAction) {
      afterSubmitAction();
    }
  };

  const commonIcons = ['📱', '💻', '🍕', '🍔', '✈️', '🏨', '⚽', '🏀', '🎵', '🎮', '📚', '🎨', '🚗', '🏠', '💰', '🛍️'];


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            {category ? 'Sửa danh mục' : 'Thêm danh mục mới'}
          </h3>
          <button
            onClick={closeAction}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6"/>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4 text-gray-500">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên danh mục
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập tên danh mục..."
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <input
                type="text"
                value={formData.icon || ""}
                onChange={(e) => setFormData(prev => ({...prev, icon: e.target.value}))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.icon ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập icon (emoji)..."
              />
              {errors.icon && (
                <p className="text-red-500 text-sm mt-1">{errors.icon}</p>
              )}

              {/* Quick icon selection */}
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Chọn nhanh:</p>
                <div className="grid grid-cols-8 gap-2">
                  {commonIcons.map((icon, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFormData(prev => ({...prev, icon}))}
                      className={`p-2 text-xl rounded-lg border-2 hover:bg-gray-50 transition-colors ${
                        formData.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={closeAction}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2"/>
              {category ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}