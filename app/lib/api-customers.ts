const API_CUSTOMERS_BASE_URL = 'http://localhost:8080';

export interface Customer {
  id: number;
  nombre: string;
  correo: string;
  fechaCreacion?: string;
}

export interface CustomerInput {
  nombre: string;
  correo: string;
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const response = await fetch(`${API_CUSTOMERS_BASE_URL}/clientes`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers');
  }
}

export async function createCustomer(customer: CustomerInput): Promise<Customer> {
  try {
    const response = await fetch(`${API_CUSTOMERS_BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create customer');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}

export async function fetchCustomerById(id: number): Promise<Customer> {
  try {
    const response = await fetch(`${API_CUSTOMERS_BASE_URL}/clientes/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw new Error('Failed to fetch customer');
  }
}