import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
} from 'react-router-dom';
import styles from './index.module.css';

// --- Komponen Halaman Utama ---
const Beranda = () => (
  <div className="p-8 bg-white shadow-2xl rounded-2xl border-l-4 border-indigo-500 max-w-4xl mx-auto">
    <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">🏠 Selamat Datang</h2>
    <p className="mt-4 text-gray-700 text-xl">
      Ini adalah halaman **Beranda**. Semua navigasi diatur menggunakan React Router.
    </p>
  </div>
);

// --- Komponen Halaman Tentang Kami ---
const TentangKami = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="p-8 bg-white shadow-2xl rounded-2xl border-l-4 border-emerald-500 max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-emerald-700 mb-4">ℹ️ Tentang Kami</h2>
      <p className="mt-4 text-gray-700 text-xl">
        Halaman ini mendemonstrasikan hook **useNavigate()** untuk navigasi terprogram.
      </p>
      <button
        onClick={handleGoBack}
        className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
      >
        ← Kembali ke Halaman Sebelumnya (useNavigate)
      </button>
    </div>
  );
};

// --- Komponen Induk Layanan (Parent Route) ---
const LayananLayout = () => {
  return (
    <div className="p-8 bg-yellow-50 rounded-2xl border-4 border-yellow-300 shadow-2xl max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold text-yellow-800 mb-6 border-b-2 pb-3 border-yellow-200">
        🛠️ Layanan Kami (Rute Bersarang)
      </h2>
      
      {/* Sub-navigasi untuk Nested Routes menggunakan Link */}
      <nav className="flex space-x-6 mb-8 p-4 bg-yellow-100 rounded-lg">
        <Link 
          to="web-dev" 
          className="text-yellow-900 hover:text-indigo-600 font-bold transition duration-200 text-lg border-b-2 border-transparent hover:border-indigo-600 pb-1"
        >
          Web Development
        </Link>
        <Link 
          to="mobile-app" 
          className="text-yellow-900 hover:text-indigo-600 font-bold transition duration-200 text-lg border-b-2 border-transparent hover:border-indigo-600 pb-1"
        >
          Aplikasi Seluler
        </Link>
      </nav>

      {/* Outlet merender konten dari rute anak (LayananDetail) */}
      <div className="p-4">
        <Outlet /> 
      </div>
    </div>
  );
};

// --- Komponen Detail Layanan (Child/Nested Route) ---
const LayananDetail = () => {
  // Menggunakan useParams untuk mengambil path parameter
  const { jenis } = useParams(); 

  const getDetail = (param) => {
    switch (param) {
      case 'web-dev':
        return {
          icon: '💻',
          title: "Pengembangan Web Modern (React)",
          desc: "Fokus pada pembuatan aplikasi web *scalable* menggunakan React. URL: /layanan/web-dev."
        };
      case 'mobile-app':
        return {
          icon: '📱',
          title: "Pembuatan Aplikasi Seluler Lintas Platform",
          desc: "Pengembangan aplikasi iOS dan Android menggunakan React Native. URL: /layanan/mobile-app."
        };
      default:
        return {
          icon: '👆',
          title: "Pilih Jenis Layanan",
          desc: "URL saat ini: /layanan. Silakan klik salah satu tautan di atas untuk melihat parameter rute."
        };
    }
  };

  const detail = getDetail(jenis);

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg border-t-4 border-yellow-500">
      <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-3 text-3xl">{detail.icon}</span> {detail.title}
      </h3>
      <p className="mt-2 text-gray-600">{detail.desc}</p>
      {jenis && (
        <div className="mt-5 p-3 bg-pink-50 rounded-md border border-pink-200">
            <p className="text-sm italic text-gray-600">
                Parameter Rute Terdeteksi: 
            </p>
            <p className="font-mono text-pink-600 font-bold text-base mt-1">
                <span className="text-gray-400">/layanan/</span>{jenis}
            </p>
        </div>
      )}
    </div>
  );
};

// --- Komponen Tata Letak Utama (Root Layout) ---
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <header className="mb-10 p-6 bg-white shadow-2xl rounded-2xl max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-indigo-800 tracking-tight">
          React Router Declarative Demo
        </h1>
        <p className="text-gray-500 mt-2">Menggunakan BrowserRouter dan NavLink</p>
      </header>
      
      {/* Navigasi Utama menggunakan NavLink */}
      <nav className="mb-12 flex flex-wrap justify-center space-x-3 md:space-x-8 max-w-4xl mx-auto">
        <NavLink 
          to="/" 
          // Menggunakan kelas pseudo-CSS Module
          className={({ isActive }) => 
            isActive 
              ? `${styles.navLink} ${styles.activeLink}` 
              : styles.navLink
          }
        >
          Beranda
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            isActive 
              ? `${styles.navLink} ${styles.activeLink}` 
              : styles.navLink
          }
        >
          Tentang Kami
        </NavLink>
        <NavLink 
          to="/layanan" 
          className={({ isActive }) => 
            isActive 
              ? `${styles.navLink} ${styles.activeLink}` 
              : styles.navLink
          }
        >
          Layanan (Nested)
        </NavLink>
      </nav>

      {/* Outlet merender konten rute yang cocok */}
      <main className="container mx-auto">
        <Outlet />
      </main>

      <footer className="mt-16 text-center text-gray-400 text-sm border-t pt-6 max-w-6xl mx-auto">
        &copy; 2024 Demo React Router.
      </footer>
    </div>
  );
};

// --- Komponen Utama Aplikasi ---
export default function App() {
  return (
    <BrowserRouter>

      {/* Semua rute didefinisikan di sini */}
      <Routes>
        {/* Rute Induk: Menggunakan Layout sebagai elemen utama untuk semua rute */}
        <Route path="/" element={<Layout />}>
          {/* Rute Anak (termasuk index) */}
          <Route index element={<Beranda />} />
          <Route path="about" element={<TentangKami />} />
          
          {/* Rute Bersarang */}
          <Route path="layanan" element={<LayananLayout />}>
            <Route index element={<LayananDetail />} />
            <Route path=":jenis" element={<LayananDetail />} /> {/* Rute Dinamis */}
          </Route>
          
          {/* Rute Catch-all */}
          <Route path="*" element={
            <div className="p-8 bg-red-100 shadow-xl rounded-xl max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-red-700">404 - Halaman Tidak Ditemukan</h2>
              <p className="mt-4 text-red-600">URL tidak cocok dengan rute manapun.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
