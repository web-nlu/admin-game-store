import toast from "react-hot-toast";

export const changeStatus = async (id: number, body: {[key: string]: string}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/orders/status/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const {order, message} = await response.json();

  if (!response.ok) {
    toast.error(message)
    return null;
  }
  toast.success(message)
  return order;
}

export const getStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'Hoàn thành';
    case 'pending':
      return 'Đang xử lý';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};
export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};