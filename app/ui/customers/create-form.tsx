'use client';

import { useFormState } from 'react-dom';
import { createCustomerAction } from '@/app/lib/actions-customers';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCustomerForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createCustomerAction, initialState);
  const router = useRouter();

  // Efecto para redireccionar después de éxito
  useEffect(() => {
    if (state.message && state.message.includes('successfully')) {
      const timer = setTimeout(() => {
        router.push('/dashboard/customers');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.message, router]);

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombre">Name</Label>
        <Input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Enter customer name"
          required
        />
        {state.errors?.nombre && (
          <p className="text-sm text-red-600">{state.errors.nombre}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="correo">Email</Label>
        <Input
          id="correo"
          name="correo"
          type="email"
          placeholder="customer@example.com"
          required
        />
        {state.errors?.correo && (
          <p className="text-sm text-red-600">{state.errors.correo}</p>
        )}
      </div>

      <Button type="submit">Create Customer</Button>
      
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