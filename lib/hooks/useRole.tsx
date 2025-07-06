// lib/hooks/useRole.ts
import { useEffect, useState } from "react";

// Simulasi role, ganti dengan SecureStore atau Firebase Auth sesuai real
export function useRole() {
  const [role, setRole] = useState<"admin" | "anggota" | "umum" | null>(null);

  useEffect(() => {
    // Simulasi async fetch role (ganti ini nanti)
    setTimeout(() => {
      setRole("admin"); // contoh hardcoded role
    }, 1000);
  }, []);

  return role;
}
