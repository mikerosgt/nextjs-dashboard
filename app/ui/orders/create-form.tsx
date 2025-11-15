'use client';

import { useFormState } from 'react-dom';
import { createOrderAction } from '@/app/lib/actions-orders';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateOrderForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createOrderAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message && state.message.includes('successfully')) {
      const timer = setTimeout(() => {
        router.push('/dashboard/orders');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.message, router]);

  return (
    <form action={dispatch} className="space-y-4">
      {/* ... resto del formulario igual ... */}
      <Button type="submit">Create Order</Button>
      
      {state.message && (
        <p className={`text-sm ${
          state.message.includes('successfully') 
            ? 'text-green-600' 
            : 'text-red-600'
        }`}>
          {state.message}
        </p>
      )}
    </form>
  );
}