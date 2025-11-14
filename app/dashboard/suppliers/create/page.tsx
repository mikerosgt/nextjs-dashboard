import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import CreateSupplierForm from '@/app/ui/suppliers/create-form';

export default function CreateSupplierPage() {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/suppliers">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl">Create Supplier</h1>
      </div>

      <div className="max-w-md">
        <CreateSupplierForm />
      </div>
    </div>
  );
}