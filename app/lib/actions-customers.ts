'use server';

import { createCustomer } from './api-customers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    nombre?: string[];
    correo?: string[];
  };
  message?: string | null;
};

export async function createCustomerAction(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = {
    nombre: formData.get('nombre') as string,
    correo: formData.get('correo') as string,
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
    await createCustomer({
      nombre: validatedFields.nombre.trim(),
      correo: validatedFields.correo.trim(),
    });

    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
  } catch (error) {
    return {
      message: 'Database Error: Failed to create customer.',
    };
  }
}