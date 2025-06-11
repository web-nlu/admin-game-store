import {Check, Clock, CreditCard} from "lucide-react";

type StatusType = 'available' | 'pending' | 'sold';

const statusConfig = {
  available: {
    label: 'Có sẵn',
    color: 'bg-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: <Check />
  },
  pending: {
    label: 'Đang xử lý',
    color: 'bg-yellow-500',
    icon: <Clock />
  },
  sold: {
    label: 'Đã bán',
    color: 'bg-red-600',
    borderColor: 'border-blue-200',
    icon: <CreditCard />
  }
};

type Props = {
  handleChange: (status: StatusType) => void;
  status: string
}

export default function UpdateStatusButton(props: Props) {
  return (
    <div className="flex space-x-1">
      {(Object.keys(statusConfig) as StatusType[]).map((status) => {
        if (status === props.status) return null;

        const targetConfig = statusConfig[status];
        return (
          <button
            key={status}
            onClick={() => props.handleChange(status)}
            className={`px-3 inline-flex items-center gap-2 cursor-pointer font-medium rounded-md ${targetConfig.color} text-white hover:opacity-80 transition-opacity`}
          >
            {targetConfig.icon}
            {`Chuyển sang ${targetConfig.label}`}
          </button>
        );
      })}
    </div>
  )
}