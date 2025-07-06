import { Timestamp } from "firebase/firestore";

export interface ModelUser {
  id: string;
  nama: string;
  email: string;
  role: 'inspektor' | 'penanggungjawab' | 'inventaris' | 'pengguna';
  createdAt: Timestamp;
  lastLoginAt?: Timestamp;
}
