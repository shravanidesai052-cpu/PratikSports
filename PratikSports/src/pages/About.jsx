import Navbar from "../components/Navbar";

export default function About() {
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

        {/* Hero */}
        <div className="relative py-32 px-6 text-center">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-md"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              About Pratik Sports
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
              Premium Sportswear & Custom Jersey Manufacturing Brand
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">

          {/* About Content */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Who We Are
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed text-center max-w-4xl mx-auto">
              Pratik Sports is a sportswear and sports merchandise brand based in
              Maharashtra, India. Established in 2018, we specialize in
              manufacturing premium-quality custom jerseys and sports apparel
              for teams, clubs, schools, and tournaments.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30 hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To deliver durable, stylish, and affordable sportswear while
                offering complete customization to athletes and teams.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30 hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Our Vision
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become a trusted sportswear brand across India by empowering
                athletes with quality and comfort.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bglinear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-lg">We'd love to hear from you</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">

              {/* Contact Details */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30 hover:shadow-3xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Mobile:</strong> +91 8550908660
                  </p>
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Email:</strong> pratiksports@gmail.com
                  </p>
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Location:</strong> Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30 hover:shadow-3xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Follow Us
                </h3>

                <div className="space-y-4">
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Instagram:</strong>{" "}
                    <a
                      href="https://www.instagram.com/pratik.sports"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 font-bold transition"
                    >
                      instagram.com/pratiksports
                    </a>
                  </p>

                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Facebook:</strong>{" "}
                    <a
                      href="https://www.facebook.com/pratiksports"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 font-bold transition"
                    >
                      facebook.com/pratiksports
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
        </div>
      </div>
    </>
  );
}