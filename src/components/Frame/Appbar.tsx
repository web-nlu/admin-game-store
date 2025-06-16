'use client'
import {Gamepad2, Menu} from "lucide-react";
import {useSidebarStore} from "@/services/sidebarService";
import {useEffect} from "react";
import {useUserStore} from "@/services/user/userService";
import ProfileButton from "@/components/common/ProfileButton";

type Props = {
  user: UserInfo
}

export default function Appbar({user}: Props) {

  const { toggleSidebar } = useSidebarStore();
  const {setUser} = useUserStore()
  useEffect(() => {
    setUser(user)
  }, [JSON.stringify(user)])

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
        <ProfileButton />
      </div>
    </header>
  )
}