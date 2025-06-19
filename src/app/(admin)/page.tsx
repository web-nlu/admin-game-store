import {CheckCircle, Clock, LucideProps, Package, TrendingUp, XCircle} from "lucide-react";
import {getPercentage} from "@/utils/utils";
import * as react from "react";
import {cookies} from "next/headers";

const homePatternData : {
  title: string;
  icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
  color: string,
  value: keyof HomeData,
  bgColor: string,
  textColor: string
}[] = [
  {
    title: "Tổng đơn hàng",
    icon: Package,
    color: 'bg-blue-500',
    value: "totalOrders",
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  }
  ,
  {
    title: 'Đã hoàn thành',
    icon: CheckCircle,
    color: 'bg-green-500',
    value: "completedOrders",
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  }
  ,
  {
    title: 'Đang xử lý',
    icon: Clock,
    value: "pendingOrders",
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
  }
  ,
  {
    title: 'Đã hủy',
    icon: XCircle,
    value: "cancelledOrders",
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
  }
]
export default async function Home() {
  const cookieStore = await cookies();
  const requestHome = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/home`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieStore.get('token')?.value}`
    },
  })
  const {data}: {data: HomeData} = await requestHome.json()
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thống kê đơn hàng</h2>
        <p className="text-gray-600">Tổng quan tình trạng đơn hàng trong hệ thống</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {homePatternData.map((stat, index) => {
          const IconComponent = stat.icon;
          const percentage = getPercentage(data?.totalOrders || 0, data?.totalOrders || 0);
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {(data || {})[stat.value] || 0}
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm font-medium ${stat.textColor}`}>
                      {percentage}%
                    </span>
                    {index > 0 && (
                      <TrendingUp className={`h-4 w-4 ${stat.textColor}`}/>
                    )}
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`}/>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${stat.color}`}
                    style={{width: `${percentage}%`}}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tỷ lệ hoàn thành
            </h3>
            <p className="text-gray-600">
              {getPercentage(data?.completedOrders || 0, data?.totalOrders || 0)}% đơn hàng đã được hoàn thành thành công
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {data?.completedOrders || 0}/{data?.totalOrders || 0}
            </p>
            <p className="text-sm text-gray-500">Đơn hàng</p>
          </div>
        </div>
      </div>
    </div>
  );
}
