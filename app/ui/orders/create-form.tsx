'use client';

import { useFormState } from 'react-dom';
import { createOrderAction } from '@/app/lib/actions-orders';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';

export default function CreateOrderForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createOrderAction, initialState);

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="clienteId">Customer ID</Label>
        <Input
          id="clienteId"
          name="clienteId"
          type="number"
          placeholder="Enter customer ID"
          required
        />
        {state.errors?.clienteId && (
          <p className="text-sm text-red-600">{state.errors.clienteId}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="productos">Products (JSON format)</Label>
        <textarea
          id="productos"
          name="productos"
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder='[{"productoId": 1, "cantidad": 2}]'
          required
        />
        {state.errors?.productos && (
          <p className="text-sm text-red-600">{state.errors.productos}</p>
        )}
      </div>

      <Button type="submit">Create Order</Button>
      
      {state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
    </form>
  );
}