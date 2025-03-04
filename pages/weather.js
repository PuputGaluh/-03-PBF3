import { useState } from 'react'; // Mengimpor useState dari React untuk mengelola state

export default function Weather() {
  const [city, setCity] = useState(''); // State untuk menyimpan nama kota yang dimasukkan pengguna
  const [weather, setWeather] = useState(null); // State untuk menyimpan data cuaca yang diterima dari API
  const [error, setError] = useState(null); // State untuk menyimpan pesan error jika terjadi kesalahan

  const fetchWeather = async () => { // Fungsi untuk mengambil data cuaca dari API
    setError(null); // Menghapus pesan error sebelumnya
    setWeather(null); // Menghapus data cuaca sebelumnya

    if (!city.trim()) { // Jika input kosong, tampilkan pesan error
      setError("Masukkan nama kota!");
      return;
    }

    try {
      const res = await fetch(`/api/weather?city=${city.trim()}`); // Mengambil data cuaca berdasarkan nama kota dari API
      const data = await res.json(); // Mengubah respons API menjadi format JSON

      if (res.ok) { // Jika respons dari API berhasil, simpan data cuaca ke state
        setWeather(data);
      } else {
        setError(data.message || 'Terjadi kesalahan. Pastikan kota benar dan API key valid.'); // Tampilkan pesan error jika gagal
      }
    } catch (err) {
      console.error("Error fetching weather:", err); // Menampilkan error di konsol jika terjadi masalah
      setError('Gagal mengambil data cuaca. Periksa koneksi internet Anda.'); // Tampilkan pesan error ke pengguna
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"> {/* Kontainer utama dengan styling */}
      <h1 className="text-3xl font-bold mb-4">Data Cuaca</h1> {/* Judul utama aplikasi */}
      
      <div className="flex gap-2 mb-4"> {/* Input untuk memasukkan nama kota dan tombol untuk mencari cuaca */}
        <input
          type="text"
          value={city} // Nilai input diambil dari state city
          onChange={(e) => setCity(e.target.value)} // Mengupdate state saat input berubah
          placeholder="Masukkan nama kota..."
          className="p-2 border rounded-lg w-64 shadow-sm"
        />
        <button onClick={fetchWeather} className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"> {/* Tombol untuk mencari cuaca */}
          Tampilkan Cuaca
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Menampilkan pesan error jika terjadi kesalahan */}

      {weather && weather.main && weather.wind && ( // Jika data cuaca tersedia, tampilkan informasi */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80"> {/* Kontainer informasi cuaca */}
          <h2 className="text-2xl font-bold mb-2">{weather.name}</h2> {/* Nama kota */}
          <p className="text-lg">Temperatur: {weather.main.temp}°C</p> {/* Temperatur saat ini */}
          <p>Terasa seperti: {weather.main.feels_like}°C</p> {/* Temperatur yang dirasakan */}
          <p>Curah hujan: {weather.rain?.['1h'] || 0} mm</p> {/* Curah hujan dalam mm, jika tersedia */}
          <p>Kecepatan angin: {weather.wind.speed} m/s</p> {/* Kecepatan angin dalam m/s */}
          <p>Arah angin: {weather.wind.deg}°</p> {/* Arah angin dalam derajat */}
          <p>Kelembaban: {weather.main.humidity}%</p> {/* Kelembaban udara dalam persen */}
          <p>Awan: {weather.clouds.all}%</p> {/* Persentase tutupan awan */}
          <p>Tekanan udara: {weather.main.pressure} hPa</p> {/* Tekanan udara dalam hPa */}
          <p>Matahari terbit: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p> {/* Waktu matahari terbit dalam format waktu lokal */}
          <p>Matahari terbenam: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p> {/* Waktu matahari terbenam dalam format waktu lokal */}
        </div>
      )}
    </div>
  );
}


// .