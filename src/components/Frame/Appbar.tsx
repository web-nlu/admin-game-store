'use client'
import {Bell, Gamepad2, LogOut, Menu, User} from "lucide-react";
import {useSidebarStore} from "@/services/sidebarService";

type Props = {
  user: UserInfo
}

export default function Appbar({user}: Props) {

  const { toggleSidebar } = useSidebarStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-600"/>
          </button>

          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="h-5 w-5 text-white"/>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              GameStore Admin
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600"/>
            <span
              className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600"/>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
            <LogOut className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </header>
  )
}