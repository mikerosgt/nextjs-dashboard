import { fetchSupplierInvoices } from '@/app/lib/api-invoices';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default async function SupplierInvoicesPage() {
  const invoices = await fetchSupplierInvoices();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Supplier Invoices</h1>
        <Button asChild>
          <Link href="/dashboard/supplier-invoices/create">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Supplier Invoice
          </Link>
        </Button>
      </div>
      
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Supplier
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Orders
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Subtotal
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    IVA
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {invoice.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {invoice.proveedorNombre}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {invoice.pedidos.length} orders
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      Q. {invoice.subtotal.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      Q. {invoice.iva.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-medium">
                      Q. {invoice.totalFactura.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        invoice.estado === 'PAID' 
                          ? 'bg-green-500 text-white' 
                          : invoice.estado === 'PENDING'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {invoice.estado}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {invoice.fechaVencimiento 
                        ? new Date(invoice.fechaVencimiento).toLocaleDateString('en-US')
                        : 'N/A'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}