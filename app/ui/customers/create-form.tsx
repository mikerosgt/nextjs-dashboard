'use client';

import { useFormState } from 'react-dom';
import { createCustomerAction } from '@/app/lib/actions-customers';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';

export default function CreateCustomerForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createCustomerAction, initialState);

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
        <p className="text-sm text-red-600">{state.message}</p>
      )}
    </form>
  );
}