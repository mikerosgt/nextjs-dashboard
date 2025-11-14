import { fetchOrders } from '@/app/lib/api-orders';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default async function OrdersPage() {
  const orders = await fetchOrders();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Orders</h1>
        <Button asChild>
          <Link href="/dashboard/orders/create">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Order
          </Link>
        </Button>
      </div>
      
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">ID</th>
                  <th scope="col" className="px-3 py-5 font-medium">Customer</th>
                  <th scope="col" className="px-3 py-5 font-medium">Items</th>
                  <th scope="col" className="px-3 py-5 font-medium">Subtotal</th>
                  <th scope="col" className="px-3 py-5 font-medium">Discount</th>
                  <th scope="col" className="px-3 py-5 font-medium">Total</th>
                  <th scope="col" className="px-3 py-5 font-medium">Status</th>
                  <th scope="col" className="px-3 py-5 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders.map((order) => (
                  <tr key={order.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">{order.id}</td>
                    <td className="whitespace-nowrap px-3 py-3">{order.clienteNombre}</td>
                    <td className="whitespace-nowrap px-3 py-3">{order.productos.length} items</td>
                    <td className="whitespace-nowrap px-3 py-3">Q. {order.subtotal.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-3 py-3">Q. {order.descuento.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-3 py-3 font-medium">Q. {order.total.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        order.estado === 'COMPLETED' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {order.estado}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {order.fechaCreacion 
                        ? new Date(order.fechaCreacion).toLocaleDateString('en-US')
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