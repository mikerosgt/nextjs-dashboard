import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import CreateOrderForm from '@/app/ui/orders/create-form';

export default function CreateOrderPage() {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/orders">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl">Create Order</h1>
      </div>

      <div className="max-w-2xl">
        <CreateOrderForm />
      </div>
    </div>
  );
}