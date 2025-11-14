const API_INVOICES_BASE_URL = 'http://localhost:8081';

export interface SupplierInvoice {
  id: number;
  proveedorId: number;
  proveedorNombre: string;
  pedidos: InvoiceItem[];
  subtotal: number;
  iva: number;
  totalFactura: number;
  estado: string;
  fechaEmision?: string;
  fechaVencimiento?: string;
}

export interface InvoiceItem {
  pedidoId: number;
  descripcion: string;
  total: number;
}

export interface SupplierInvoiceInput {
  proveedorId: number;
  pedidos: InvoiceItemInput[];
  fechaVencimiento?: string;
}

export interface InvoiceItemInput {
  pedidoId: number;
  descripcion: string;
}

export async function fetchSupplierInvoices(): Promise<SupplierInvoice[]> {
  try {
    const response = await fetch(`${API_INVOICES_BASE_URL}/facturas`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch supplier invoices');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching supplier invoices:', error);
    throw new Error('Failed to fetch supplier invoices');
  }
}

export async function createSupplierInvoice(invoice: SupplierInvoiceInput): Promise<SupplierInvoice> {
  try {
    const response = await fetch(`${API_INVOICES_BASE_URL}/facturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create supplier invoice');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating supplier invoice:', error);
    throw new Error('Failed to create supplier invoice');
  }
}