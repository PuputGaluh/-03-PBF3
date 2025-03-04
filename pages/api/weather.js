export default async function handler(req, res) { // Mendefinisikan fungsi handler untuk menangani request API
    const { city } = req.query; // Mengambil parameter nama kota dari query URL
    const API_KEY = "47a096a6cce352abe2bc4876b5a4e932"; // API Key untuk mengakses OpenWeatherMap (gantilah dengan yang aman)

    if (!city) { // Jika tidak ada nama kota yang diberikan
        return res.status(400).json({ message: "Nama kota harus diisi" }); // Kembalikan status 400 (Bad Request) dengan pesan error
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; // URL untuk mengambil data cuaca dari API OpenWeatherMap

    try {
        const response = await fetch(URL); // Mengambil data dari API menggunakan fetch
        const data = await response.json(); // Mengonversi respons API ke format JSON

        if (!response.ok) { // Jika respons tidak berhasil (misalnya kota tidak ditemukan)
            return res.status(response.status).json({ message: data.message || "Gagal mengambil data cuaca." }); // Kirim error dengan status dari API
        }

        res.status(200).json(data); // Jika berhasil, kirim data cuaca dengan status 200 (OK)
    } catch (error) { // Tangani jika terjadi error dalam proses fetch
        res.status(500).json({ message: "Terjadi kesalahan server. Coba lagi nanti." }); // Kirim error dengan status 500 (Internal Server Error)
    }
}

// .