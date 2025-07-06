import { Timestamp } from "firebase/firestore";

export interface ModelPeminjaman {
  id: string;
  userId: string;
  barangId: string;

  jumlah: number;                      // jumlah barang yang dipinjam
  tanggalPengajuan: Timestamp;
  tanggalDisetujui?: Timestamp;
  tanggalMulai: Timestamp;            // tanggal mulai digunakan
  tanggalBerakhir?: Timestamp;        // target kembali
  tanggalKembali?: Timestamp;         // waktu barang benar-benar kembali

  status: 'diajukan' | 'diterima' | 'dipinjam' | 'dikembalikan' | 'ditolak' | 'terlambat';

  alasanDitolak?: string;
  pengingatTerakhir?: Timestamp;
  denda?: number;
}
