import React, { useState, useMemo, useCallback } from 'react';
import { lokasiData } from './data/lokasi';

// Base URL untuk server Flask
const BASE_URL = 'http://127.0.0.1:5000';

// ========================= HEADER ========================= //

const Header = ({ onOpen }) => (
  <header className="bg-white shadow-lg sticky top-0 z-20 border-b border-indigo-100">
    <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-3xl font-extrabold text-indigo-700 tracking-wider">
          HarPro
        </span>
        <span className="ml-2 text-xs font-medium text-gray-500 hidden sm:inline">
          ML Powered
        </span>
      </div>
      <nav className="hidden sm:block">
        <button
          onClick={() => onOpen('tentang')}
          className="text-gray-600 hover:text-indigo-600 font-medium ml-6"
        >
          Tentang
        </button>
        <button
          onClick={() => onOpen('model')}
          className="text-gray-600 hover:text-indigo-600 font-medium ml-6"
        >
          Model & Data
        </button>
      </nav>
    </div>
  </header>
);

// ========================= FOOTER ========================= //

const Footer = () => (
  <footer className="bg-gray-900 p-6 mt-16">
    <div className="max-w-screen-xl mx-auto text-center text-sm text-gray-400">
      &copy; {new Date().getFullYear()} HarPro. Hak Cipta Dilindungi.
    </div>
  </footer>
);

// ========================= HASIL PREDIKSI ========================= //

const ResultDisplay = ({ result, loading, error }) => {
  const formatRupiah = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-2xl border-2 border-indigo-200 shadow-lg">
        <svg className="animate-spin h-8 w-8 text-indigo-500 mb-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-indigo-600 font-semibold text-base text-center">
          Model sedang menghitung...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-red-50 rounded-2xl border-2 border-red-300 text-center shadow-sm">
        <p className="text-red-700 font-bold mb-2">Kesalahan Prediksi</p>
        <p className="text-xs text-red-500">{error}</p>
      </div>
    );

  if (!result)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
        <p className="text-gray-500 font-medium text-base">
          Masukkan detail rumah untuk melihat hasil di sini.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-indigo-200 p-8 flex flex-col justify-center items-center text-center min-h-[320px]">
      <h3 className="text-lg font-semibold text-gray-500 mb-4">
        Harga Prediksi Terbaik Kami
      </h3>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-4 border-indigo-300 rounded-2xl px-4 py-6 w-full shadow-inner overflow-hidden">
        <p className="text-base font-semibold text-indigo-600 mb-2">
          Estimasi Jual:
        </p>
        <div className="flex justify-center items-center w-full overflow-hidden">
          <p
          className="
    font-extrabold
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-indigo-600
    to-purple-700
    whitespace-nowrap
  "
  style={{
    fontSize: 'clamp(1.25rem, 6vw, 3rem)',
    maxWidth: '100%',
    lineHeight: '1.1',
    textAlign: 'center',
  }}
          >
            {formatRupiah(result.predicted_price)}
          </p>
        </div>
      </div>
    </div>
  );
};

// ========================= INPUT CUSTOM ========================= //

const NumberStepperInput = ({ label, name, value, onChange, unit, min = 0, required = false }) => {
  const handleChange = useCallback(
    (delta) => {
      const currentValue = value === '' ? 0 : Number(value);
      const newValue = Math.max(min, currentValue + delta);
      onChange({ target: { name, value: newValue, type: 'number' } });
    },
    [name, value, onChange, min]
  );

  return (
    <div className="col-span-full sm:col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center bg-white border border-gray-300 rounded-xl">
        <button type="button" onClick={() => handleChange(-1)} className="p-3 text-indigo-600 hover:bg-indigo-50">
          -
        </button>
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          required={required}
          className="w-full text-center p-3 border-x border-gray-300 focus:outline-none"
        />
        <button type="button" onClick={() => handleChange(1)} className="p-3 text-indigo-600 hover:bg-indigo-50">
          +
        </button>
        {unit && <span className="text-sm text-gray-500 w-10 text-right pr-4 hidden md:inline">{unit}</span>}
      </div>
    </div>
  );
};

// ========================= FORM PREDIKSI ========================= //

const CustomSelect = ({ label, name, value, onChange, options, placeholder, required = false, disabled = false }) => (
  <div className="col-span-full sm:col-span-1">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value || ''}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full p-3 border rounded-xl bg-white shadow-sm"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const PredictionForm = ({ formData, setFormData, handleSubmit, loading }) => {
  // ===============================
  // STATE TAMBAHAN (WAJIB DI SINI)
  // ===============================
  const [showWarning, setShowWarning] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // ===============================
  // HANDLE CHANGE (TETAP)
  // ===============================
  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
      return;
    }

    if (name === 'pulau') {
      setFormData((prev) => ({ ...prev, pulau: value, provinsi: '', kota: '' }));
    } else if (name === 'provinsi') {
      setFormData((prev) => ({ ...prev, provinsi: value, kota: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, [setFormData]);

  // ===============================
  // OPTIONS LOKASI (TETAP)
  // ===============================
  const pulauOptions = useMemo(
    () => Object.keys(lokasiData).map((k) => lokasiData[k].label),
    []
  );

  const provinsiOptions = useMemo(() => {
    const key = Object.keys(lokasiData).find(
      (k) => lokasiData[k].label === formData.pulau
    );
    return key
      ? Object.values(lokasiData[key].provinsi).map((p) => p.label)
      : [];
  }, [formData.pulau]);

  const kotaOptions = useMemo(() => {
    const keyPulau = Object.keys(lokasiData).find(
      (k) => lokasiData[k].label === formData.pulau
    );
    if (!keyPulau) return [];

    const keyProv = Object.keys(
      lokasiData[keyPulau].provinsi
    ).find(
      (p) =>
        lokasiData[keyPulau].provinsi[p].label === formData.provinsi
    );

    return keyProv
      ? lokasiData[keyPulau].provinsi[keyProv].kota.map((k) => k.label)
      : [];
  }, [formData.pulau, formData.provinsi]);

  return (
    <>
      {/* ===============================
          FORM UTAMA
      =============================== */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <h3 className="text-2xl font-bold text-indigo-700 border-b-4 border-indigo-100 pb-3 mb-4">
          1. Detail Lokasi Properti 🗺️
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CustomSelect
            label="Pulau"
            name="pulau"
            value={formData.pulau}
            onChange={handleChange}
            options={pulauOptions}
            placeholder="Pilih Pulau"
            required
          />

          <CustomSelect
            label="Provinsi"
            name="provinsi"
            value={formData.provinsi}
            onChange={handleChange}
            options={provinsiOptions}
            placeholder="Pilih Provinsi"
            required
            disabled={!formData.pulau}
          />

          <div className="sm:col-span-2">
            <CustomSelect
              label="Kota/Kabupaten"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              options={kotaOptions}
              placeholder="Pilih Kota"
              required
              disabled={!formData.provinsi}
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-indigo-700 border-b-4 border-indigo-100 pb-3 pt-4">
          2. Detail Ukuran & Fasilitas 🏠
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Luas Tanah (m²)
            </label>
            <input
              type="number"
              name="luas_tanah"
              value={formData.luas_tanah}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Luas Bangunan (m²)
            </label>
            <input
              type="number"
              name="luas_bangunan"
              value={formData.luas_bangunan}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <NumberStepperInput
            label="Jumlah Kamar Tidur"
            name="jumlah_kamar_tidur"
            value={formData.jumlah_kamar_tidur}
            onChange={handleChange}
            unit="Kamar"
            min={1}
            required
          />

          <NumberStepperInput
            label="Jumlah Kamar Mandi"
            name="jumlah_kamar_mandi"
            value={formData.jumlah_kamar_mandi}
            onChange={handleChange}
            unit="Kamar"
            min={1}
            required
          />

          <NumberStepperInput
            label="Muatan Parkir"
            name="muatan_parkir"
            value={formData.muatan_parkir}
            onChange={handleChange}
            unit="Slot"
            min={0}
          />
        </div>

        {/* ===============================
            TOMBOL (Bukan Submit)
        =============================== */}
        <button
          type="button"
          disabled={loading}
          onClick={() => setShowWarning(true)}
          className={`w-full py-4 px-4 font-extrabold text-lg rounded-xl shadow-xl ${loading
              ? 'bg-gray-400'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all'
            }`}
        >
          {loading ? 'Memproses...' : 'PREDIKSI HARGA RUMAH SEKARANG 🚀'}
        </button>
      </form>

      {/* ===============================
          MODAL PERINGATAN
      =============================== */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              ⚠️ Peringatan Penting
            </h2>

            <ul className="text-sm text-gray-700 space-y-2 mb-4 list-disc pl-5">
              <li>
                Model prediksi hanya tersedia untuk wilayah
                <strong> Yogyakarta</strong>.
                Untuk daerah lain, data belum tersedia.
              </li>
              <li>
                Output yang dihasilkan adalah
                <strong> estimasi harga</strong>, bukan harga pasar final.
              </li>
            </ul>

            <label className="flex gap-2 mb-4 text-sm">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              Saya memahami dan menyetujui ketentuan di atas.
            </label>

            <div className="flex gap-3">
              <button
                className="w-full py-2 rounded-lg bg-gray-300"
                onClick={() => {
                  setShowWarning(false);
                  setAgreed(false);
                }}
              >
                Batal
              </button>

              <button
                disabled={!agreed}
                className={`w-full py-2 rounded-lg ${agreed
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-400 cursor-not-allowed'
                  }`}
                onClick={() => {
                  setShowWarning(false);
                  setAgreed(false);
                  document.querySelector('form').requestSubmit();
                }}
              >
                Lanjutkan Prediksi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ========================= MODAL ========================= //

const InfoModal = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    tentang: {
      title: 'Tentang Website',
      body: (
        <>
          <p className="mb-3">
            <strong>HarPro</strong> adalah aplikasi prediksi harga properti berbasis
            Machine Learning yang dirancang untuk memberikan estimasi harga rumah
            secara objektif dan konsisten.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Fokus pada pasar properti rumah di Yogyakarta, Indonesia</li>
            <li>Menggunakan data lokasi dan spesifikasi bangunan</li>
            <li>Ditujukan untuk edukasi, riset, dan simulasi harga</li>
          </ul>
        </>
      ),
    },
    model: {
      title: 'Model & Data',
      body: (
        <>
          <p className="mb-3">
            Sistem ini menggunakan model regresi berbasis Machine Learning
            untuk memprediksi harga properti. Data dilatih menggunakan dataset{' '}
            <a
              href="https://www.kaggle.com/datasets/pramudyadika/yogyakarta-housing-price-ndonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline font-medium"
            >
              Yogyakarta Housing Price (Indonesia)
            </a>
            .
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Algoritma: Random Forest Regression</li>
            <li>Fitur utama: lokasi, luas tanah, luas bangunan, jumlah kamar tidur, jumlah kamar mandi, muatan parkir</li>
            <li>Data telah melalui preprocessing dan normalisasi</li>
            <li>Output berupa estimasi harga (bukan harga pasar final)</li>
          </ul>
        </>
      ),
    },
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          {content[type].title}
        </h2>
        <div className="text-gray-700 text-sm leading-relaxed">
          {content[type].body}
        </div>
      </div>
    </div>
  );
};

// ========================= APP ========================= //

const App = () => {
  const [formData, setFormData] = useState({
    pulau: '',
    provinsi: '',
    kota: '',
    luas_tanah: '',
    luas_bangunan: '',
    jumlah_kamar_tidur: '',
    jumlah_kamar_mandi: '',
    muatan_parkir: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.luas_tanah <= 0 || formData.luas_bangunan <= 0) {
      setError('Luas tanah dan bangunan harus lebih dari 0');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header onOpen={setActiveModal} />

      <main className="flex-grow flex justify-center px-4 py-10">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-3xl mx-auto w-full">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
              Hitung Harga Properti Anda
            </h1>
            <PredictionForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-2xl border-l-8 border-indigo-500 flex items-center justify-center max-w-4xl w-full">
            <ResultDisplay result={result} loading={loading} error={error} />
          </div>
        </div>
      </main>

      <Footer />

      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default App;
