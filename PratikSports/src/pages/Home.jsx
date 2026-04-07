import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// Import Jersey Images
import bats from "../assets/jerseys/bats.jpeg";
import cricket_jersey from "../assets/jerseys/cricket_jersey.jpeg";
import ganesh_fest from "../assets/jerseys/ganesh_fest.jpeg";
import sports_jersey from "../assets/jerseys/sports_jersey.jpeg";
import trophises from "../assets/jerseys/trophises.jpeg";

export default function Home() {
  const navigate = useNavigate();

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
        <section className="relative py-32 px-6 text-center">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-md"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              Pratik Sports
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12">
              Custom sports jerseys, sportswear, trophies & accessories —
              designed for champions.
            </p>

            <div className="flex justify-center gap-6 flex-wrap">
              <button
                onClick={() => navigate("/products")}
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl"
              >
                View Products
              </button>

              <button
                onClick={() => navigate("/order")}
                className="bg-linear-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-xl"
              >
                Order Jersey
              </button>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Why Choose Pratik Sports
            </h2>
            <p className="text-gray-600 text-lg">We deliver excellence in every stitch</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              title="Custom Designs"
              desc="Get jerseys designed with your team name, logo, and colors."
            />
            <Feature
              title="Premium Quality"
              desc="High-quality fabric for comfort, durability, and performance."
            />
            <Feature
              title="On-Time Delivery"
              desc="Fast and reliable delivery across Maharashtra & India."
            />
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Our Jersey Collection
              </h2>
              <p className="text-gray-600 text-lg">Premium quality jerseys for every sport and occasion</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              <Category title="Cricket Jersey" image={cricket_jersey} />
              <Category title="Festival Jersey" image={ganesh_fest} />
              <Category title="Trophy" image={trophises} />
              <Category title="Custom Team Jersey" image={sports_jersey} />
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 text-center px-6">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30">
            <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Ready to Create Your Team Jersey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Place your order today and play like a pro.
            </p>

            <button
              onClick={() => navigate("/order")}
              className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl"
            >
              Order Now
            </button>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/30 hover:shadow-3xl transition-all transform hover:scale-105">
      <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
        </svg>
      </div>
      <h3 className="font-bold text-2xl mb-4 bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{desc}</p>
    </div>
  );
}

function Category({ title, image }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all transform hover:scale-105 border border-white/30">
      <div className="relative overflow-hidden rounded-2xl mb-6">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-purple-600/20 to-transparent"></div>
      </div>
      <h3 className="font-bold text-xl bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{title}</h3>
    </div>
  );
}