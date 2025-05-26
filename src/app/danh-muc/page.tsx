'use client'
import {useEffect, useState} from "react";
import { Search, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', icon: '' });
  const [errors, setErrors] = useState({ name: '', icon: '' });

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const requestCategories = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'force-cache',
      next: {revalidate: 60}
    })
    const { categories } = (await requestCategories.json());
    setCategories(categories);
  }

  // Handle form submission
  const handleSubmit = () => {
    // Reset errors
    setErrors({ name: '', icon: '' });

    // Validate form
    let hasErrors = false;
    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Tên danh mục không được để trống' }));
      hasErrors = true;
    }
    if (!formData.icon.trim()) {
      setErrors(prev => ({ ...prev, icon: 'Icon không được để trống' }));
      hasErrors = true;
    }

    if (hasErrors) return;

    if (editingCategory) {
      // Update existing category
      setCategories(prev => prev.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, name: formData.name, icon: formData.icon }
          : cat
      ));
    } else {
      // Add new category
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      setCategories(prev => [...prev, {
        id: newId,
        name: formData.name,
        icon: formData.icon
      }]);
    }

    closeModal();
  };

  // Open modal for adding new category
  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', icon: '' });
    setErrors({ name: '', icon: '' });
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, icon: category.icon });
    setErrors({ name: '', icon: '' });
    setIsModalOpen(true);
  };

  // Delete category
  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', icon: '' });
    setErrors({ name: '', icon: '' });
  };

  const commonIcons = ['📱', '💻', '🍕', '🍔', '✈️', '🏨', '⚽', '🏀', '🎵', '🎮', '📚', '🎨', '🚗', '🏠', '💰', '🛍️'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
              <p className="text-gray-600 mt-1">Quản lý tất cả danh mục trong hệ thống</p>
            </div>
            <button
              onClick={handleAdd}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Thêm danh mục
            </button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="text-sm text-gray-600">
              Hiển thị {filteredCategories.length} / {categories.length} danh mục
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'Không tìm thấy danh mục' : 'Chưa có danh mục nào'}
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Bắt đầu bằng cách thêm danh mục đầu tiên'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên danh mục
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{category.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-2xl">{category.icon}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên danh mục
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
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
                          onClick={() => setFormData(prev => ({ ...prev, icon }))}
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
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingCategory ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}