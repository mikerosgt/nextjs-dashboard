'use client';

import { useFormState } from 'react-dom';
import { createSupplierAction } from '@/app/lib/actions-suppliers';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';

export default function CreateSupplierForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createSupplierAction, initialState);

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombre">Company Name</Label>
        <Input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Enter supplier company name"
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
          placeholder="supplier@example.com"
          required
        />
        {state.errors?.correo && (
          <p className="text-sm text-red-600">{state.errors.correo}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Phone (Optional)</Label>
        <Input
          id="telefono"
          name="telefono"
          type="tel"
          placeholder="+502 1234-5678"
        />
        {state.errors?.telefono && (
          <p className="text-sm text-red-600">{state.errors.telefono}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="direccion">Address (Optional)</Label>
        <Input
          id="direccion"
          name="direccion"
          type="text"
          placeholder="Enter supplier address"
        />
        {state.errors?.direccion && (
          <p className="text-sm text-red-600">{state.errors.direccion}</p>
        )}
      </div>

      <Button type="submit">Create Supplier</Button>
      
      {state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
    </form>
  );
}