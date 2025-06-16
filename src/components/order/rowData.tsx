'use client'

import {Eye, Phone, User} from "lucide-react";
import {formatPrice, formatVietnamTime} from "@/utils/utils";
import {getStatusColor, getStatusText} from "@/utils/order";
import React from "react";
import {useRouter} from "next/navigation";
import {getStatusIcon} from "@/components/order/getStatusIcon";
import ActionOrderButton from "@/components/order/actionButton";
import {useUserStore} from "@/services/user/userService";
import _ from "lodash";

type Props = {
  order: Order
}

export default function RowData({ order }: Props) {
  const router = useRouter();
  const {user} = useUserStore();
  return (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
        <div className="text-sm text-gray-500">User ID: {order.userId}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400"/>
          <div>
            <div className="text-sm font-medium text-gray-900">{order.email}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Phone className="w-3 h-3 mr-1"/>
              {order.phoneNumber}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">{formatPrice(order.totalPrice)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="ml-1">{getStatusText(order.status)}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{order.paymentMethod}</div>
        <div className="text-xs text-gray-500 font-mono">{order.paymentLinkId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatVietnamTime(order.createdAt)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap flex flex-row text-right text-sm font-medium">
        <button onClick={() => router.push(`/don-hang/${order.id}`)}
                className="cursor-pointer text-blue-600 hover:text-blue-900 transition-colors">
          <Eye className="w-4 h-4"/>
        </button>
        { (_.some(user?.activeRoles, ["name", "ADMIN"]) && (order.status !== "COMPLETED")) &&  <ActionOrderButton order={order} /> }
      </td>
    </tr>
  )
}