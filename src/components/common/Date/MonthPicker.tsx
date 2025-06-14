'use client'
import {useEffect, useRef, useState} from "react";
import {Calendar, ChevronLeft, ChevronRight, X} from "lucide-react";
import moment from "moment";

interface MonthPickerProps {
  value?: { month: number; year: number };
  onChange?: (date: { startDate: number; endDate: number }) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minYear?: number;
  maxYear?: number;
}

export default function MonthPicker ({
 value,
 onChange,
 placeholder = "Chọn tháng",
 disabled = false,
 className = "",
 minYear = 2020,
 maxYear = 2030
}: MonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayYear, setDisplayYear] = useState(value?.year || moment().year());
  const [selectedMonth, setSelectedMonth] = useState(value?.month);
  const [selectedYear, setSelectedYear] = useState(value?.year);

  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const shortMonths = [
    'T1', 'T2', 'T3', 'T4', 'T5', 'T6',
    'T7', 'T8', 'T9', 'T10', 'T11', 'T12'
  ];

  // Đóng picker khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setSelectedYear(displayYear);
    onChange?.({
      startDate: moment().year(displayYear).month(monthIndex).startOf("month").unix(),
      endDate: moment().year(displayYear).month(monthIndex).endOf("month").unix(),
    });
    setIsOpen(false);
  };

  const handleYearChange = (direction: 'prev' | 'next') => {
    const newYear = direction === 'prev' ? displayYear - 1 : displayYear + 1;
    if (newYear >= minYear && newYear <= maxYear) {
      setDisplayYear(newYear);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMonth(undefined);
    setSelectedYear(undefined);
    onChange?.({
      startDate: moment().startOf("month").unix(),
      endDate: moment().endOf("month").unix(),
    });
  };

  const getDisplayText = () => {
    if (selectedMonth !== undefined && displayYear !== undefined) {
      return `${months[selectedMonth]} ${displayYear}`;
    }
    return placeholder;
  };

  const isCurrentMonth = (monthIndex: number) => {
    const now = new Date();
    return monthIndex === now.getMonth() && displayYear === now.getFullYear();
  };

  const isSelectedMonth = (monthIndex: number) => {
    return selectedMonth === monthIndex && selectedYear === displayYear;
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input Field */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          relative flex items-center justify-between px-4 py-2 bg-white border rounded-lg cursor-pointer transition-all duration-200
          ${disabled
          ? 'bg-gray-100 cursor-not-allowed border-gray-200'
          : isOpen
            ? 'border-blue-500 ring-2 ring-blue-200'
            : 'border-gray-300 hover:border-blue-400'
        }
        `}
      >
        <div className="flex items-center gap-3">
          <Calendar size={20} className={disabled ? 'text-gray-400' : 'text-gray-500'} />
          <span className={`
            ${selectedMonth !== undefined ? 'text-gray-900' : 'text-gray-500'}
            ${disabled ? 'text-gray-400' : ''}
          `}>
            {getDisplayText()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedMonth !== undefined && !disabled && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
          <ChevronRight
            size={20}
            className={`
              transition-transform duration-200 
              ${isOpen ? 'rotate-90' : ''} 
              ${disabled ? 'text-gray-400' : 'text-gray-500'}
            `}
          />
        </div>
      </div>

      {/* Dropdown Panel */}
      {isOpen && !disabled && (
        <div className="absolute w-100 top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Year Navigation */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <button
              onClick={() => handleYearChange('prev')}
              disabled={displayYear <= minYear}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>

            <h3 className="text-lg font-semibold text-gray-900">
              {displayYear}
            </h3>

            <button
              onClick={() => handleYearChange('next')}
              disabled={displayYear >= maxYear}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Months Grid */}
          <div className="p-4">
            <div className="grid grid-cols-6 gap-2">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => handleMonthSelect(index)}
                  className={`
                    relative py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isSelectedMonth(index)
                    ? 'bg-blue-500 text-white shadow-md'
                    : isCurrentMonth(index)
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                  `}
                >
                  {shortMonths[index]}
                  {isCurrentMonth(index) && !isSelectedMonth(index) && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  handleMonthSelect(moment().month());
                  setDisplayYear(moment().year());
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Tháng hiện tại
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};