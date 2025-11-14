'use client';

import { useFormState } from 'react-dom';
import { createSupplierInvoiceAction } from '@/app/lib/actions-invoices'; // ← CORREGIDO
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';

export default function CreateSupplierInvoiceForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createSupplierInvoiceAction, initialState); // ← CORREGIDO

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="proveedorId">Supplier ID</Label>
        <Input
          id="proveedorId"
          name="proveedorId"
          type="number"
          placeholder="Enter supplier ID"
          required
        />
        {state.errors?.proveedorId && (
          <p className="text-sm text-red-600">{state.errors.proveedorId}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pedidos">Orders (JSON format)</Label>
        <textarea
          id="pedidos"
          name="pedidos"
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder='[{"pedidoId": 1, "descripcion": "Order description"}]'
          required
        />
        {state.errors?.pedidos && (
          <p className="text-sm text-red-600">{state.errors.pedidos}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fechaVencimiento">Due Date (Optional)</Label>
        <Input
          id="fechaVencimiento"
          name="fechaVencimiento"
          type="date"
        />
      </div>

      <Button type="submit">Create Supplier Invoice</Button>
      
      {state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
    </form>
  );
}