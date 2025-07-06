import { Timestamp } from "firebase/firestore";

export interface ModelPenyewaan {
  id: string;
  userId: string;
  barangId: string;

  jumlah: number;                      // jumlah barang yang disewa
  tanggalPengajuan: Timestamp;
  tanggalDisetujui?: Timestamp;
  tanggalMulai: Timestamp;            // tanggal sewa dimulai
  tanggalBerakhir: Timestamp;         // akhir kontrak sewa
  tanggalKembali?: Timestamp;         // tanggal dikembalikan

  durasiHari?: number;
  biayaPerHari?: number;
  totalBiaya?: number;

  status: 'diajukan' | 'diterima' | 'disewa' | 'dikembalikan' | 'ditolak' | 'terlambat';

  alasanDitolak?: string;
  pengingatTerakhir?: Timestamp;
  denda?: number;
}
