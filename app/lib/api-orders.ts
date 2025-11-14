const API_ORDERS_BASE_URL = 'http://localhost:8080';

export interface Order {
  id: number;
  clienteId: number;
  clienteNombre: string;
  productos: OrderItem[];
  subtotal: number;
  descuento: number;
  total: number;
  estado: string;
  fechaCreacion?: string;
}

export interface OrderItem {
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface OrderInput {
  clienteId: number;
  productos: OrderItemInput[];
}

export interface OrderItemInput {
  productoId: number;
  cantidad: number;
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const response = await fetch(`${API_ORDERS_BASE_URL}/pedidos`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
}

export async function createOrder(order: OrderInput): Promise<Order> {
  try {
    const response = await fetch(`${API_ORDERS_BASE_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

export async function fetchOrderById(id: number): Promise<Order> {
  try {
    const response = await fetch(`${API_ORDERS_BASE_URL}/pedidos/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order');
  }
}