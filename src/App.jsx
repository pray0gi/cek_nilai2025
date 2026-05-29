import React, { useState } from 'react';
import { School, MapPin, Award, Users, RefreshCw, Trophy, TrendingDown, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

// Memanggil data dari file terpisah
import { dataSMA } from './dataSMA';
import { dataSMK } from './dataSMK';

// Ikon untuk masing-masing jalur
const pathIcons = {
  "Domisili Wilayah": <MapPin className="w-5 h-5" />,
  "Domisili Radius": <MapPin className="w-5 h-5" />,
  "Afirmasi": <Users className="w-5 h-5" />,
  "Mutasi": <RefreshCw className="w-5 h-5" />,
  "Prestasi": <Award className="w-5 h-5" />
};

// Helper Functions
const formatNilai = (data) => {
  if (!data) return "N/A";
  if (typeof data === 'number') return data.toFixed(2);
  if (typeof data.nilai === 'number') return data.nilai.toFixed(2);
  return "N/A";
};

const getNama = (data) => {
  if (!data) return "";
  if (typeof data === 'object' && data.nama) return data.nama;
  return "";
};

export default function App() {
  const [activeTab, setActiveTab] = useState('SMA');

  // State untuk SMA 
  const [smaSchool, setSmaSchool] = useState("");
  const [smaPath, setSmaPath] = useState("");

  // State untuk SMK 
  const [smkSchool, setSmkSchool] = useState("");
  const [smkMajor, setSmkMajor] = useState("");
  const [smkPath, setSmkPath] = useState("");

  // Handler Perubahan SMA
  const handleSmaSchoolChange = (e) => {
    setSmaSchool(e.target.value);
    setSmaPath(""); 
  };

  // Handler Perubahan SMK
  const handleSmkSchoolChange = (e) => {
    setSmkSchool(e.target.value);
    setSmkMajor(""); 
    setSmkPath("");  
  };

  const handleSmkMajorChange = (e) => {
    setSmkMajor(e.target.value);
    setSmkPath(""); 
  };

  // Data Terpilih dengan Pengaman (Safe check)
  const safeDataSMA = dataSMA || {};
  const safeDataSMK = dataSMK || {};

  const selectedSmaData = smaSchool && smaPath && safeDataSMA[smaSchool] ? safeDataSMA[smaSchool][smaPath] : null;
  const selectedSmkData = smkSchool && smkMajor && smkPath && safeDataSMK[smkSchool] && safeDataSMK[smkSchool][smkMajor] ? safeDataSMK[smkSchool][smkMajor][smkPath] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg pt-12 pb-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-5">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/20 shadow-inner backdrop-blur-sm">
            <School className="w-10 h-10 text-white" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Portal Hasil SPMB DIY 2025</h1>
            <p className="text-blue-100 mt-2 text-sm md:text-base font-medium">Cek Nilai Tertinggi & Terendah per Sekolah dan Jalur</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* Modern Segmented Control Tabs */}
        <div className="flex bg-slate-200/70 p-1.5 rounded-2xl mb-6 shadow-inner border border-slate-200">
          <button
            onClick={() => setActiveTab('SMA')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ease-out ${
              activeTab === 'SMA' 
                ? 'bg-white text-blue-700 shadow-md ring-1 ring-slate-900/5 transform scale-[1.01]' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'SMA' ? 'text-blue-600' : 'text-slate-400'}`} />
            Jenjang SMA
          </button>
          <button
            onClick={() => setActiveTab('SMK')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ease-out ${
              activeTab === 'SMK' 
                ? 'bg-white text-blue-700 shadow-md ring-1 ring-slate-900/5 transform scale-[1.01]' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <GraduationCap className={`w-5 h-5 ${activeTab === 'SMK' ? 'text-blue-600' : 'text-slate-400'}`} />
            Jenjang SMK
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
          
          {/* ================= JENJANG SMA ================= */}
          {activeTab === 'SMA' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">Pilih Sekolah</label>
                  <div className="relative group">
                    <select 
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 appearance-none outline-none transition-all cursor-pointer font-medium text-slate-700"
                      value={smaSchool}
                      onChange={handleSmaSchoolChange}
                    >
                      <option value="" disabled hidden>Pilih Sekolah...</option>
                      {Object.keys(safeDataSMA).map(school => (
                        <option key={school} value={school}>{school}</option>
                      ))}
                    </select>
                    <School className="w-5 h-5 text-blue-500 absolute left-4 top-4 transition-colors group-hover:text-blue-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">Pilih Jalur Pendaftaran</label>
                  <div className="relative group">
                    <select 
                      className={`w-full pl-11 pr-4 py-3.5 border rounded-xl appearance-none outline-none transition-all font-medium 
                        ${!smaSchool 
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 cursor-pointer focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300'
                        }`}
                      value={smaPath}
                      onChange={(e) => setSmaPath(e.target.value)}
                      disabled={!smaSchool}
                    >
                      <option value="" disabled hidden>Pilih Jalur...</option>
                      {smaSchool && safeDataSMA[smaSchool] && Object.keys(safeDataSMA[smaSchool]).map(path => (
                        <option key={path} value={path}>{path}</option>
                      ))}
                    </select>
                    <div className={`absolute left-4 top-4 transition-colors ${!smaSchool ? 'text-slate-300' : 'text-blue-500 group-hover:text-blue-600'}`}>
                      {smaPath && pathIcons[smaPath] ? pathIcons[smaPath] : <MapPin className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tampilan Hasil SMA */}
              {selectedSmaData ? (
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    Hasil Seleksi 
                    <span className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                      {smaPath}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-gradient-to-br from-white to-emerald-50/50 p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                      <div className="relative overflow-hidden pr-2 w-full">
                        <p className="text-emerald-700 text-sm font-bold mb-1 tracking-wide uppercase">Nilai Tertinggi</p>
                        <p className="text-4xl font-extrabold text-emerald-600 mb-1">{formatNilai(selectedSmaData.tertinggi)}</p>
                        {getNama(selectedSmaData.tertinggi) && (
                          <p className="text-sm text-emerald-800/80 mt-2 font-semibold truncate uppercase" title={getNama(selectedSmaData.tertinggi)}>
                            {getNama(selectedSmaData.tertinggi)}
                          </p>
                        )}
                      </div>
                      <div className="bg-emerald-100/80 p-3.5 rounded-2xl flex-shrink-0 relative z-10">
                        <Trophy className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-orange-50/50 p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                      <div className="relative overflow-hidden pr-2 w-full">
                        <p className="text-orange-700 text-sm font-bold mb-1 tracking-wide uppercase">Nilai Terendah</p>
                        <p className="text-4xl font-extrabold text-orange-600 mb-1">{formatNilai(selectedSmaData.terendah)}</p>
                        {getNama(selectedSmaData.terendah) && (
                          <p className="text-sm text-orange-800/80 mt-2 font-semibold truncate uppercase" title={getNama(selectedSmaData.terendah)}>
                            {getNama(selectedSmaData.terendah)}
                          </p>
                        )}
                      </div>
                      <div className="bg-orange-100/80 p-3.5 rounded-2xl flex-shrink-0 relative z-10">
                        <TrendingDown className="w-8 h-8 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 p-10 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                  <p className="text-slate-500 font-medium">Silakan pilih Sekolah dan Jalur terlebih dahulu.</p>
                </div>
              )}
            </div>
          )}

          {/* ================= JENJANG SMK ================= */}
          {activeTab === 'SMK' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">Pilih Sekolah</label>
                  <div className="relative group">
                    <select 
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 appearance-none outline-none text-sm cursor-pointer font-medium text-slate-700 transition-all"
                      value={smkSchool}
                      onChange={handleSmkSchoolChange}
                    >
                      <option value="" disabled hidden>Pilih Sekolah...</option>
                      {Object.keys(safeDataSMK).map(school => (
                        <option key={school} value={school}>{school}</option>
                      ))}
                    </select>
                    <School className="w-4 h-4 text-blue-500 absolute left-4 top-4.5 transition-colors group-hover:text-blue-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">Pilih Jurusan</label>
                  <div className="relative group">
                    <select 
                      className={`w-full pl-11 pr-4 py-3.5 border rounded-xl appearance-none outline-none text-sm transition-all font-medium 
                        ${!smkSchool 
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 cursor-pointer focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300'
                        }`}
                      value={smkMajor}
                      onChange={handleSmkMajorChange}
                      disabled={!smkSchool}
                    >
                      <option value="" disabled hidden>Pilih Jurusan...</option>
                      {smkSchool && safeDataSMK[smkSchool] && Object.keys(safeDataSMK[smkSchool]).map(major => (
                        <option key={major} value={major}>{major}</option>
                      ))}
                    </select>
                    <BookOpen className={`w-4 h-4 absolute left-4 top-4.5 transition-colors ${!smkSchool ? 'text-slate-300' : 'text-blue-500 group-hover:text-blue-600'}`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">Pilih Jalur</label>
                  <div className="relative group">
                    <select 
                      className={`w-full pl-11 pr-4 py-3.5 border rounded-xl appearance-none outline-none text-sm transition-all font-medium 
                        ${!smkMajor 
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 cursor-pointer focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300'
                        }`}
                      value={smkPath}
                      onChange={(e) => setSmkPath(e.target.value)}
                      disabled={!smkMajor}
                    >
                      <option value="" disabled hidden>Pilih Jalur...</option>
                      {smkSchool && smkMajor && safeDataSMK[smkSchool] && safeDataSMK[smkSchool][smkMajor] && Object.keys(safeDataSMK[smkSchool][smkMajor]).map(path => (
                        <option key={path} value={path}>{path}</option>
                      ))}
                    </select>
                    <div className={`absolute left-4 top-4.5 transition-colors ${!smkMajor ? 'text-slate-300' : 'text-blue-500 group-hover:text-blue-600'}`}>
                      {smkPath && pathIcons[smkPath] ? pathIcons[smkPath] : <MapPin className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tampilan Hasil SMK */}
              {selectedSmkData ? (
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex flex-wrap items-center gap-2">
                    Hasil Seleksi 
                    <ArrowRight className="w-4 h-4 text-slate-400 mx-1" />
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold">
                      {smkMajor}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 mx-1" />
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold">
                      {smkPath}
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-gradient-to-br from-white to-emerald-50/50 p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                      <div className="relative overflow-hidden pr-2 w-full">
                        <p className="text-emerald-700 text-sm font-bold mb-1 tracking-wide uppercase">Nilai Tertinggi</p>
                        <p className="text-4xl font-extrabold text-emerald-600 mb-1">{formatNilai(selectedSmkData.tertinggi)}</p>
                        {getNama(selectedSmkData.tertinggi) && (
                          <p className="text-sm text-emerald-800/80 mt-2 font-semibold truncate uppercase" title={getNama(selectedSmkData.tertinggi)}>
                            {getNama(selectedSmkData.tertinggi)}
                          </p>
                        )}
                      </div>
                      <div className="bg-emerald-100/80 p-3.5 rounded-2xl flex-shrink-0 relative z-10">
                        <Trophy className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-orange-50/50 p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                      <div className="relative overflow-hidden pr-2 w-full">
                        <p className="text-orange-700 text-sm font-bold mb-1 tracking-wide uppercase">Nilai Terendah</p>
                        <p className="text-4xl font-extrabold text-orange-600 mb-1">{formatNilai(selectedSmkData.terendah)}</p>
                        {getNama(selectedSmkData.terendah) && (
                          <p className="text-sm text-orange-800/80 mt-2 font-semibold truncate uppercase" title={getNama(selectedSmkData.terendah)}>
                            {getNama(selectedSmkData.terendah)}
                          </p>
                        )}
                      </div>
                      <div className="bg-orange-100/80 p-3.5 rounded-2xl flex-shrink-0 relative z-10">
                        <TrendingDown className="w-8 h-8 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 p-10 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                  <p className="text-slate-500 font-medium">Silakan pilih Jurusan dan Jalur terlebih dahulu.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}