import { fetchSuppliers } from '@/app/lib/api-suppliers';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default async function SuppliersPage() {
  const suppliers = await fetchSuppliers();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Suppliers</h1>
        <Button asChild>
          <Link href="/dashboard/suppliers/create">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Supplier
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
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Address
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {suppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {supplier.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {supplier.nombre}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {supplier.correo}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {supplier.telefono || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {supplier.direccion || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {supplier.fechaRegistro 
                        ? new Date(supplier.fechaRegistro).toLocaleDateString('en-US')
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