'use server';

import { createOrder } from './api-orders';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    clienteId?: string[];
    productos?: string[];
  };
  message?: string | null;
};

export async function createOrderAction(prevState: State, formData: FormData): Promise<State> {
  const clienteId = formData.get('clienteId');
  const productosJson = formData.get('productos');

  if (!clienteId) {
    return {
      errors: {
        clienteId: ['Customer ID is required'],
      },
    };
  }

  if (!productosJson) {
    return {
      errors: {
        productos: ['Products are required'],
      },
    };
  }

  try {
    const productos = JSON.parse(productosJson as string);
    
    await createOrder({
      clienteId: Number(clienteId),
      productos: productos,
    });

    revalidatePath('/dashboard/orders');
    redirect('/dashboard/orders');
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      message: 'Database Error: Failed to create order.',
    };
  }
}