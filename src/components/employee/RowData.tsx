'use client'

import {ImageIcon, Phone, User} from "lucide-react";
import React from "react";
import {CldImage} from "next-cloudinary";
import ActionEmployeeButton from "@/components/employee/ActionEmployeeButton";

type Props = {
  employee: Employee
}

export default function RowData({ employee }: Props) {

  return (
    <tr key={employee.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">User ID: {employee.id}</div>
      </td>
      <td className="px-6 py-4">
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
          { employee.avatar ?
            <CldImage src={employee.avatar} width={30} height={30} alt={"avatar"}/> :
            <ImageIcon className="w-4 h-4 center" color={"white"} />
          }
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="gap-1 flex flex-col">
            <div className="text-sm gap-1 text-gray-500 flex items-center">
              <User className="w-4 h-4 text-gray-400"/>
              <div className="text-sm font-medium text-gray-900">{employee.email}</div>
            </div>

            <div className="text-sm text-gray-500 flex items-center">
              <Phone className="w-3 h-3 mr-1"/>
              {employee.phoneNumber}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap flex flex-row text-right text-sm font-medium">
        <ActionEmployeeButton employee={employee} />
      </td>
    </tr>
  )
}