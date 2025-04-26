'use client';

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "./nav-bar";


export default function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
