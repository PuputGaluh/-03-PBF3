import Link from 'next/link'; // Mengimpor komponen Link dari Next.js untuk navigasi

export async function getStaticPaths() { 
    const res = await fetch('https://jsonplaceholder.typicode.com/users'); // Mengambil daftar pengguna dari API
    const users = await res.json(); // Mengonversi respons ke format JSON
    const paths = users.map((user) => ({ 
      params: { id: user.id.toString() }, // Membuat daftar jalur dinamis berdasarkan ID pengguna
    }));
    return { paths, fallback: false }; // Menonaktifkan fallback, hanya jalur yang tersedia yang bisa diakses
}
  
// Fungsi untuk mengambil detail pengguna berdasarkan ID
export async function getStaticProps({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`); // Mengambil data pengguna berdasarkan ID
    const user = await res.json(); // Mengonversi respons ke format JSON
    return { props: { user } }; // Mengembalikan data pengguna sebagai props ke komponen
}
  
// Komponen untuk menampilkan detail pengguna
export default function UserDetail({ user }) {
    return (
      <div>
        <h1>{user.name}</h1> {/* Menampilkan nama pengguna */}
        <p>Email: {user.email}</p> {/* Menampilkan email pengguna */}
        <p>Telepon: {user.phone}</p> {/* Menampilkan nomor telepon pengguna */}
        <p>Website: {user.website}</p> {/* Menampilkan website pengguna */}
        <Link href="/users">Kembali</Link> {/* Tombol navigasi kembali ke daftar pengguna */}
      </div>
    );
}

// .