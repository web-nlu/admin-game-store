import {Search} from "lucide-react";
import React from "react";

export default function EmptyList() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
      <div className="text-gray-400 mb-4">
        <Search className="w-12 h-12 mx-auto"/>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts found</h3>
      <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
    </div>
  )
}