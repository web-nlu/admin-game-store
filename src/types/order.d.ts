type Order = {
  id: number;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  paymentLinkId: string;
  createdAt: number;
  updatedAt: number;
  userId: number
  phoneNumber: string
  email: string
  orderDetails: OrderDetail[];
}

type OrderDetail = {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  price: number;
}

type EventPayos = {
  cancel: string
  code: string
  id: string
  loading: false
  orderCode: number
  status: string
}