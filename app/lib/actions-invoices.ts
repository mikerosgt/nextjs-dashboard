'use server';

import { createSupplierInvoice } from './api-invoices'; // ← CORREGIDO
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    proveedorId?: string[];
    pedidos?: string[];
  };
  message?: string | null;
};

export async function createSupplierInvoiceAction(prevState: State, formData: FormData): Promise<State> { // ← CORREGIDO
  const proveedorId = formData.get('proveedorId');
  const pedidosJson = formData.get('pedidos');
  const fechaVencimiento = formData.get('fechaVencimiento') as string;

  if (!proveedorId) {
    return {
      errors: {
        proveedorId: ['Supplier ID is required'],
      },
    };
  }

  if (!pedidosJson) {
    return {
      errors: {
        pedidos: ['Orders are required'],
      },
    };
  }

  try {
    const pedidos = JSON.parse(pedidosJson as string);
    
    await createSupplierInvoice({ // ← CORREGIDO
      proveedorId: Number(proveedorId),
      pedidos: pedidos,
      fechaVencimiento: fechaVencimiento || undefined,
    });

    revalidatePath('/dashboard/supplier-invoices');
    redirect('/dashboard/supplier-invoices');
  } catch (error) {
    console.error('Error creating invoice:', error);
    return {
      message: 'Database Error: Failed to create invoice.',
    };
  }
}