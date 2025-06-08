'use client'
import {Plus, X} from "lucide-react";
import React from "react";

type Props = {
  list: string[];
  setList(list: string[]): void;
  title: string
}

export default function AppendList ({list, setList, title}: Props) {

  const handleArrayChange = (index: number, value: string) => {
    list[index] = value;
    setList(list);
  };

  const addArrayItem = () => {
    setList([...list, ''])
  };

  const removeArrayItem = (index: number) => {
    setList(list.filter((_, i) => i !== index))
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {title}
      </label>
      <div className="space-y-3">
        {list.map((tag, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => handleArrayChange(index, e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder={`${title} ${index + 1}`}
            />
            {list.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5"/>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem()}
          className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4"/>
          <span>Thêm {title}</span>
        </button>
      </div>
    </div>
  )
}