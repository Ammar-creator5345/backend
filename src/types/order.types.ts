export interface CheckOutItem {
  product: string;
  quantity: number;
}

export interface CheckOutRequestBody {
  items: CheckOutItem[];
}

export interface CreateOrderRequestBody {
  items: CheckOutItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export interface CreateOrderService extends CreateOrderRequestBody {
  userId: string;
}
