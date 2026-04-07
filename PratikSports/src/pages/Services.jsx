import Navbar from "../components/Navbar";

export default function Services() {
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

        {/* Hero Section */}
        <div className="relative py-32 px-6 text-center">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-md"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/30">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
              Complete Sportswear & Customization Solutions for Teams and Tournaments
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">

          {/* Services Grid */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                What We Offer
              </h2>
              <p className="text-gray-600 text-lg">Premium sports services tailored to your needs</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {[
                {
                  title: "Custom Jersey Manufacturing",
                  desc: "Fully customizable sports jerseys with player name, number, logo, and team colors."
                },
                {
                  title: "Team & Club Orders",
                  desc: "Bulk jersey orders for cricket, football, volleyball, kabaddi, and other sports teams."
                },
                {
                  title: "Tournament Jersey Supply",
                  desc: "Complete jersey solutions for local and district-level tournaments."
                },
                {
                  title: "Sportswear Printing",
                  desc: "High-quality sublimation and vinyl printing for long-lasting designs."
                },
                {
                  title: "Trophies & Awards",
                  desc: "Medals, trophies, and awards for sports events and competitions."
                },
                {
                  title: "Accessories & Equipment",
                  desc: "Sports accessories such as bats, kits, bags, and training essentials."
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 
                             hover:shadow-3xl transition-all transform hover:scale-105 
                             border border-white/30
                             group"
                >
                  <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:from-purple-600 group-hover:to-indigo-700 transition-all">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-indigo-700 transition">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}

            </div>
          </section>

          {/* Service Areas / Branches */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Service Areas
              </h2>
              <p className="text-gray-600 text-lg">Serving communities across Maharashtra</p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center border border-white/30">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                Pratik Sports provides custom sportswear services primarily
                across Maharashtra and nearby regions. Orders are accepted
                online and delivered as per availability.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 
                              text-gray-800 font-bold mb-8">
                <div className="bg-linear-to-r from-emerald-50 to-teal-50 py-4 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-teal-100 transition-all">
                  📍 Sawantwadi
                </div>
                <div className="bg-linear-to-r from-emerald-50 to-teal-50 py-4 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-teal-100 transition-all">
                  📍 Kalawa
                </div>
                <div className="bg-linear-to-r from-emerald-50 to-teal-50 py-4 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-teal-100 transition-all">
                  📍 Gansoli
                </div>
                <div className="bg-linear-to-r from-emerald-50 to-teal-50 py-4 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-teal-100 transition-all">
                  📍 Thane
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                *For exact availability and delivery, please contact us directly.
              </p>
            </div>
          </section>

        </div>
        </div>
      </div>
    </>
  );
}