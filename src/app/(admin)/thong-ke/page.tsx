'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {formatPrice, formatShortCurrency} from "@/utils/utils";
import MonthPicker from "@/components/common/Date/MonthPicker";
import moment from "moment";
import _ from "lodash";

export default function StatPage () {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');
  const [statistics, setStatistics] = useState([] as Stat[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats(moment().startOf("month").unix().toString(), moment().endOf("month").unix().toString())
  }, [])

  const getStats = async (startDate: string, endDate: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/stats?${new URLSearchParams({
        startDate,
        endDate,
      })}`);
      const { stats } = await res.json();
      setStatistics(stats);
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{data.label}</p>
          <p className="text-blue-600 font-bold">
            {formatPrice(data.totalRevenue)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: statistics,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    if(loading) {
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
          <span>Đang xử lý...</span>
        </div>
      )
    }

    if(_.isEmpty(statistics)) {
      return (
        <div className="text-center">
          <div>Không có dữ liệu thống kê</div>
        </div>
      )
    }

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={formatShortCurrency}
              dataKey="totalRevenue"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="totalRevenue"
              fill="url(#colorRevenue)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              interval={2}
            />
            <YAxis
              dataKey="totalRevenue"
              tick={{ fontSize: 12 }}
              tickFormatter={formatShortCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorUv)"
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              interval={2}
            />
            <YAxis
              dataKey="totalRevenue"
              tick={{ fontSize: 12 }}
              tickFormatter={formatShortCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Biểu Đồ Doanh Thu Theo Ngày
          </h1>
          <p className="text-gray-600">
            Theo dõi doanh thu hàng ngày trong tháng
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <MonthPicker
                onChange={({startDate, endDate}) => getStats(startDate.toString(), endDate.toString())}
                value={{year: moment().year(), month: moment().month()}}
              />
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setChartType('line')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  chartType === 'line'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Đường
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  chartType === 'bar'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Cột
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  chartType === 'area'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Vùng
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}


        {/* Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Doanh Thu Theo Ngày
          </h2>
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
        </div>
      </div>
    </div>
  );
}