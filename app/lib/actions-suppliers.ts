'use server';

import { createSupplier } from './api-suppliers';
import { revalidatePath } from 'next/cache';

export type State = {
  errors?: {
    nombre?: string[];
    correo?: string[];
    telefono?: string[];
    direccion?: string[];
  };
  message?: string | null;
};

export async function createSupplierAction(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = {
    nombre: formData.get('nombre') as string,
    correo: formData.get('correo') as string,
    telefono: formData.get('telefono') as string,
    direccion: formData.get('direccion') as string,
  };

  if (!validatedFields.nombre || validatedFields.nombre.trim() === '') {
    return {
      errors: {
        nombre: ['Name is required'],
      },
    };
  }

  if (!validatedFields.correo || !validatedFields.correo.includes('@')) {
    return {
      errors: {
        correo: ['Please enter a valid email address'],
      },
    };
  }

  try {
    await createSupplier({
      nombre: validatedFields.nombre.trim(),
      correo: validatedFields.correo.trim(),
      telefono: validatedFields.telefono?.trim() || undefined,
      direccion: validatedFields.direccion?.trim() || undefined,
    });

    revalidatePath('/dashboard/suppliers');
    
    return { 
      message: 'Supplier created successfully! Redirecting...' 
    };
  } catch (error) {
    console.error('Error creating supplier:', error);
    return {
      message: 'Database Error: Failed to create supplier.',
    };
  }
}