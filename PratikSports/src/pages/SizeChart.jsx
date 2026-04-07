import Navbar from "../components/Navbar";

export default function SizeChart() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
        {/* Sports-themed background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">

        {/* Header */}
        <div className="relative py-32 text-center px-6">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-md"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/30">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              Jersey Size Chart
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
              Please refer to the size chart carefully before placing your order.
              Measurements are in inches.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">

          {/* Men's Size Chart */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Men's Jersey Sizes
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
              <table className="w-full bg-white overflow-hidden">
                <thead className="bg-linear-to-r from-blue-50 to-indigo-50 text-gray-900">
                  <tr>
                    <th className="p-4 border font-bold">Size</th>
                    <th className="p-4 border font-bold">Chest (in)</th>
                    <th className="p-4 border font-bold">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {[
                    ["S", "36", "26"],
                    ["M", "38", "27"],
                    ["L", "40", "28"],
                    ["XL", "42", "29"],
                    ["XXL", "44", "30"],
                    ["3XL", "46", "31"],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition">
                      {row.map((cell, j) => (
                        <td key={j} className="p-4 border text-gray-700 font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Women's Size Chart */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Women's Jersey Sizes
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
              <table className="w-full bg-white overflow-hidden">
                <thead className="bg-linear-to-r from-purple-50 to-pink-50 text-gray-900">
                  <tr>
                    <th className="p-4 border font-bold">Size</th>
                    <th className="p-4 border font-bold">Chest (in)</th>
                    <th className="p-4 border font-bold">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {[
                    ["XS", "32", "24"],
                    ["S", "34", "25"],
                    ["M", "36", "26"],
                    ["L", "38", "27"],
                    ["XL", "40", "28"],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-purple-50 transition">
                      {row.map((cell, j) => (
                        <td key={j} className="p-4 border text-gray-700 font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Kids Size Chart */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Kids Jersey Sizes
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
              <table className="w-full bg-white overflow-hidden">
                <thead className="bg-linear-to-r from-emerald-50 to-teal-50 text-gray-900">
                  <tr>
                    <th className="p-4 border font-bold">Age Group</th>
                    <th className="p-4 border font-bold">Chest (in)</th>
                    <th className="p-4 border font-bold">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {[
                    ["6–8 Years", "26", "20"],
                    ["8–10 Years", "28", "22"],
                    ["10–12 Years", "30", "24"],
                    ["12–14 Years", "32", "26"],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-emerald-50 transition">
                      {row.map((cell, j) => (
                        <td key={j} className="p-4 border text-gray-700 font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Size Note */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Important Notes
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-4 text-lg max-w-3xl mx-auto">
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1">•</span>
                All measurements are approximate and may vary slightly.
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1">•</span>
                For a comfortable fit, choose one size larger if unsure.
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1">•</span>
                Customized jerseys are non-returnable.
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1">•</span>
                Contact us for special size requirements.
              </li>
            </ul>
          </section>

        </div>
        </div>
      </div>
    </>
  );
}