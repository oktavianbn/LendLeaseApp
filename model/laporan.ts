import { Timestamp } from "firebase/firestore";

export interface ModelLaporan {
  id: string;

  tipe: 'peminjaman' | 'penyewaan';         // Jenis transaksi
  referensiId: string;                      // ID dari transaksi peminjaman atau penyewaan

  namaPengguna: string;                     // Nama peminjam atau penyewa
  namaBarang: string;
  jumlah: number;

  tanggalMulai: Timestamp;                  // Tanggal pinjam/sewa
  tanggalSelesai?: Timestamp;               // Tanggal kembali (jika sudah)

  status: 'diajukan' | 'diterima' | 'dipinjam' | 'diseewa' | 'dikembalikan' | 'ditolak' | 'terlambat';
  totalBiaya?: number;

  denda?: number;                           // Jika ada denda
  // dibuatOleh: string;                       // Nama atau ID admin/pj
  dibuatPada: Timestamp;                   // Timestamp pencatatan laporan
}
