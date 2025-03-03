import Link from 'next/link'; // Mengimpor komponen Link dari Next.js untuk navigasi antar halaman

// Fungsi untuk mengambil data pengguna secara statis saat build time
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users'); // Mengambil data pengguna dari API placeholder
  const users = await res.json(); // Mengonversi respons menjadi format JSON
  return {
    props: { users }, // Mengirim data pengguna sebagai props ke komponen Users
  };
}

// Komponen untuk menampilkan daftar pengguna
export default function Users({ users }) {
  return (
    <div>
      <h1>Daftar Pengguna</h1> {/* Judul halaman */}
      <ul>
        {users.map((user) => ( // Melakukan perulangan untuk menampilkan daftar pengguna
          <li key={user.id}> {/* Menampilkan setiap pengguna dengan key unik berdasarkan ID */}
            <Link href={`/users/${user.id}`}>{user.name}</Link> {/* Navigasi ke halaman detail pengguna berdasarkan ID */}
          </li>
        ))}
      </ul>
    </div>
  );
}
