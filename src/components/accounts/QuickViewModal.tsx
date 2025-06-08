'use client'
import React from "react";
import {useCategoryStore} from "@/services/categories/categoriesService";
import {useGameStore} from "@/services/games/gamesService";

type Props = {
  account: Account | null,
  setShowModalAction: (show: boolean) => void,
}

export default function QuickViewModal({account, setShowModalAction}: Props) {
  const handleSave = () => {
    // Here you would make API call to save the account
    // console.log('Saving account:', currentAccount);
    setShowModalAction(false);
    // setCurrentAccount(null);
  };

  const {categories} = useCategoryStore()
  const {games} = useGameStore()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-500">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{account?.id ? 'Edit Account' : 'Add New Account'}</h2>
          <button onClick={() => setShowModalAction(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={account?.title}
              placeholder="Enter account title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Giá (VNĐ)</label>
              <input
                type="number"
                step="1"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={account?.price}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Danh mục</label>
              <select
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={account?.categoryId}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Game</label>
            <select
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={account?.game}
            >
              {games.map(game => (
                <option key={game.id} value={game.id}>{game.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Information</label>
            <textarea
              className="w-full p-3 border rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={account?.info}
              placeholder="Describe the account details, features, and benefits..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowModalAction(false)}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {account?.id ? 'Update' : 'Create'} Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}