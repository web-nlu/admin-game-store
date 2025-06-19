'use client'
import {Gamepad2, Home, ShoppingCart, Users, Package, BarChart3, Settings} from "lucide-react";
import {useState} from "react";
import {useSidebarStore} from "@/services/sidebarService";
import {useUserStore} from "@/services/user/userService";
import _ from "lodash";

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
  { id: 'accounts', label: 'Sản phẩm', icon: Gamepad2, href: '/san-pham' },
  { id: 'categories', label: 'Danh mục', icon: Package, href: '/danh-muc' },
  { id: 'orders', label: 'Đơn hàng', icon: ShoppingCart, href: '/don-hang' },
  { id: 'employees', label: 'Nhân viên', icon: Users, href: '/nhan-vien', role: "ADMIN" },
  { id: 'analytics', label: 'Thống kê', icon: BarChart3, href: '/thong-ke', role: "ADMIN" },
  // { id: 'settings', label: 'Cài đặt', icon: Settings, href: '/settings', role: "ADMIN" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { isOpen, closeSidebar } = useSidebarStore();
  const {user} = useUserStore();
  const handleMenuClick = (itemId: string, href: string) => {
    setActiveItem(itemId);
    closeSidebar();
    window.location.href = href
  };
  return (
    <aside className={`
        fixed left-0 top-0 z-40 h-full w-64 pt-24 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Gamepad2 className="h-5 w-5 text-white"/>
          </div>
          <h2 className="text-lg font-bold text-gray-900">GameStore</h2>
        </div>
        <button
          onClick={closeSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {/*<X className="h-5 w-5 text-gray-600"/>*/}
        </button>
      </div>

      <nav className="mt-16 lg:mt-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            if(item.role && !_.some(user?.activeRoles, ["name", item.role])) {
              return
            }
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id, item.href)}
                  className={`
                      cursor-pointer w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200
                      ${isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                    `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}/>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  )
}