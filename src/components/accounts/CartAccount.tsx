'use client'
import {Edit, Image as ImageIcon, Trash2} from "lucide-react";
import {formatPrice} from "@/utils/utils";
import React from "react";
import Link from "next/link";

type Props = {
  account: Account;
  handleEditAction: (account: Account) => void;
}

export default function CartAccount({account, handleEditAction}: Props) {
  return (
    <div key={account.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {account.image ? (
                <img src={account.image} alt={account.title} className="w-full h-full object-cover"/>
              ) : (
                <ImageIcon className="w-6 h-6 text-gray-400"/>
              )}
            </div>
            <div>
              <Link href={`/san-pham/${account.id}`} className="font-semibold text-gray-900 line-clamp-1">{account.title}</Link>
              <p className="text-sm text-gray-500">{account.game}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handleEditAction(account)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit className="w-4 h-4"/>
            </button>
            <button
              // onClick={() => handleDelete(account.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4"/>
            </button>
          </div>
        </div>

        <div className="mb-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full`}>
                    {account.category}
                  </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{account.info}</p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(account.price)}
          </div>
          <div className="text-xs text-gray-500">
            ID: {account.id}
          </div>
        </div>
      </div>
    </div>
  )
}