import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import CreateSupplierInvoiceForm from '@/app/ui/supplier-invoices/create-form';
import { lusitana } from '@/app/ui/fonts';

export default function CreateSupplierInvoicePage() {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/supplier-invoices">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className={`${lusitana.className} text-2xl`}>Create Supplier Invoice</h1>
      </div>

      <div className="max-w-2xl">
        <CreateSupplierInvoiceForm />
      </div>
    </div>
  );
}