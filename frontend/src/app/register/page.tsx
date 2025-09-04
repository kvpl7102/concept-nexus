"use client";

import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/api';
import { UserCredentials } from '@/lib/types';
import AuthForm from '@/components/ui/AuthForm';

export default function RegisterPage() {
  const router = useRouter();

  /**
   * This function is passed to the AuthForm and is called on submission.
   * It calls our API service to register the user and handles the successful response.
   */
  const handleRegister = async (credentials: UserCredentials) => {
    // The AuthForm component's internal state will handle loading and errors.
    // This function only needs to define what happens on a successful API call.
    await registerUser(credentials);

    // On success:
    alert('Registration successful! You will now be redirected to the login page.');
    router.push('/login'); // Redirect to the login page
  };

  return (
    <AuthForm formType="Register" onSubmit={handleRegister} />
  );
}

