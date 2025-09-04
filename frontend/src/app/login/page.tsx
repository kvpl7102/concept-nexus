"use client";

import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/api';
import { UserCredentials } from '@/lib/types';
import { useAuth } from '@/context/AuthContext'; 
import AuthForm from '@/components/ui/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); 

  const handleLogin = async (credentials: UserCredentials) => {
    const data = await loginUser(credentials);
    login(data.token); 
    router.push('/'); 
  };

  return <AuthForm formType="Login" onSubmit={handleLogin} />;
}

