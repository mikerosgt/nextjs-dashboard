const API_SUPPLIERS_BASE_URL = 'http://localhost:8081';

export interface Supplier {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro?: string;
}

export interface SupplierInput {
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
}

export async function fetchSuppliers(): Promise<Supplier[]> {
  try {
    const response = await fetch(`${API_SUPPLIERS_BASE_URL}/proveedores`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw new Error('Failed to fetch suppliers');
  }
}

export async function createSupplier(supplier: SupplierInput): Promise<Supplier> {
  try {
    const response = await fetch(`${API_SUPPLIERS_BASE_URL}/proveedores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplier),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create supplier');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw new Error('Failed to create supplier');
  }
}

export async function fetchSupplierById(id: number): Promise<Supplier> {
  try {
    const response = await fetch(`${API_SUPPLIERS_BASE_URL}/proveedores/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch supplier');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching supplier:', error);
    throw new Error('Failed to fetch supplier');
  }
}