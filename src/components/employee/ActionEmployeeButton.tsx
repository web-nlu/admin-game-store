import {useEffect, useRef, useState} from "react";
import {EllipsisVertical} from "lucide-react";
import _ from "lodash";

type Props = {
  employee: Employee
}

export default function ActionEmployeeButton({employee}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng tooltip khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Nút 3 dấu chấm */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <EllipsisVertical className="w-5 h-5 text-gray-600" />
      </button>

      {/* Tooltip */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1 flex flex-col">
            <button
              // onClick={() => complete()}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Reset mật khẩu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}