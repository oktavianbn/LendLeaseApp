import { Timestamp } from "firebase/firestore";

export interface ModelBarang {
  id: string;
  nama: string;
  jumlahTotal: number | null;
  jumlahPinjamSewa: number | null;
  //   deskripsi?: string;
  biayaSewa?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
