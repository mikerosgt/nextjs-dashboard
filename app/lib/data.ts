import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency, formatDateToLocal } from './utils';

// ========== DATOS MOCK ==========
const mockRevenue: Revenue[] = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const mockLatestInvoicesRaw = [
  {
    id: '1',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
    amount: 15795,
  },
  {
    id: '2',
    name: 'Lee Robinson', 
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
    amount: 20348,
  },
  {
    id: '3',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
    amount: 3040,
  },
  {
    id: '4',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
    amount: 44800,
  },
  {
    id: '5',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
    amount: 34577,
  },
];

const mockInvoices: InvoicesTable[] = [
  {
    id: '1',
    customer_id: '1',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
    date: '2023-12-06',
    amount: 15795,
    status: 'pending',
  },
  {
    id: '2',
    customer_id: '2',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
    date: '2023-11-14',
    amount: 20348,
    status: 'pending',
  },
  {
    id: '3',
    customer_id: '3',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
    date: '2023-10-29',
    amount: 3040,
    status: 'paid',
  },
  {
    id: '4',
    customer_id: '4',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
    date: '2023-09-10',
    amount: 44800,
    status: 'paid',
  },
  {
    id: '5',
    customer_id: '5',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
    date: '2023-08-05',
    amount: 34577,
    status: 'pending',
  },
];

const mockCustomers: CustomerField[] = [
  { id: '1', name: 'Delba de Oliveira' },
  { id: '2', name: 'Lee Robinson' },
  { id: '3', name: 'Hector Simpson' },
  { id: '4', name: 'Steven Tey' },
  { id: '5', name: 'Steph Dietz' },
];

// ========== FUNCIONES ==========
export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    console.log('✅ Revenue data from database');
    return data.rows;
  } catch (error) {
    console.log('📋 Using mock revenue data');
    return mockRevenue;
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    console.log('✅ Latest invoices from database');
    return latestInvoices;
  } catch (error) {
    console.log('📋 Using mock latest invoices');
    return mockLatestInvoicesRaw.map(invoice => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
  }
}

export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    console.log('✅ Card data from database');
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.log('📋 Using mock card data');
    return {
      numberOfInvoices: 12,
      numberOfCustomers: 8,
      totalPaidInvoices: formatCurrency(25995),
      totalPendingInvoices: formatCurrency(15348),
    };
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoicesTable[]> {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    console.log('✅ Filtered invoices from database');
    return invoices.rows;
  } catch (error) {
    console.error('Database Error: Failed to fetch invoices.', error);
    console.log('📋 Using mock filtered invoices');
    const filtered = mockInvoices.filter(invoice => 
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase()) ||
      invoice.amount.toString().includes(query) ||
      formatDateToLocal(invoice.date).toLowerCase().includes(query.toLowerCase()) ||
      invoice.status.toLowerCase().includes(query.toLowerCase())
    );
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }
}

// FUNCIÓN FALTANTE - AGREGAR ESTA
export async function fetchInvoicesPages(query: string): Promise<number> {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log('✅ Invoice pages from database');
    return totalPages;
  } catch (error) {
    console.error('Database Error: Failed to fetch invoice pages.', error);
    console.log('📋 Using mock invoice pages');
    
    const filtered = mockInvoices.filter(invoice => 
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase()) ||
      invoice.amount.toString().includes(query) ||
      formatDateToLocal(invoice.date).toLowerCase().includes(query.toLowerCase()) ||
      invoice.status.toLowerCase().includes(query.toLowerCase())
    );
    
    return Math.ceil(filtered.length / ITEMS_PER_PAGE);
  }
}

export async function fetchInvoiceById(id: string): Promise<InvoiceForm | undefined> {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));

    console.log('✅ Invoice by ID from database');
    return invoice[0];
  } catch (error) {
    console.error('Database Error: Failed to fetch invoice.', error);
    return undefined;
  }
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    console.log('✅ Customers from database');
    return customers;
  } catch (err) {
    console.log('📋 Using mock customers');
    return mockCustomers;
  }
}

export async function fetchFilteredCustomers(query: string): Promise<CustomersTableType[]> {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    console.log('✅ Filtered customers from database');
    return customers;
  } catch (err) {
    console.log('📋 Using mock filtered customers');
    const filtered = mockCustomers.filter(customer => 
      customer.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.map(customer => {
      const customerInvoices = mockInvoices.filter(inv => inv.customer_id === customer.id);
      const total_pending = customerInvoices
        .filter(inv => inv.status === 'pending')
        .reduce((sum, inv) => sum + inv.amount, 0);
      const total_paid = customerInvoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0);
        
      return {
        id: customer.id,
        name: customer.name,
        email: mockLatestInvoicesRaw.find(i => i.id === customer.id)?.email || '',
        image_url: mockLatestInvoicesRaw.find(i => i.id === customer.id)?.image_url || '',
        total_invoices: customerInvoices.length,
        total_pending: formatCurrency(total_pending),
        total_paid: formatCurrency(total_paid),
      };
    });
  }
}