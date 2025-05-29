
export const checkout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/s/order`,
    {method: "POST"}
  );

  const {order, message} = await response.json();

  if (!response.ok) {
    console.error(message);
    return false;
  }


  window.location.href = `/thanh-toan?${new URLSearchParams({
    orderCode: order.id.toString(), totalPrice: order.totalPrice.toString()
  })}`
  return true;
}

export const cancel = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/s/order/cancel/${id}`,
    {method: "PUT"}
  );

  const {order, message} = await response.json();

  if (!response.ok) {
    console.error(message);
    return false;
  }
  setTimeout(( ) => {
    window.location.href = `/thanh-toan?${new URLSearchParams({
      orderCode: order.id.toString(), totalPrice: order.totalPrice.toString()
    })}`
  }, 30000)

  return true;
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