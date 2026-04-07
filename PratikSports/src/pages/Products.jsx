import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import JerseyOrderForm from "../forms/JerseyOrderForm";
import GeneralOrderForm from "../forms/GeneralOrderForm";
import ImageModal from "../components/ImageModal";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["all", "Sports Jersey", "Festival Jersey", "Trophies", "Bats"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === "all" 
          ? "/products/all" 
          : `/products?category=${selectedCategory}`;
        
        const res = await API.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch products error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedProduct(null);
  };

  const getOrderFormType = () => {
    if (!selectedProduct) return null;
    
    if (selectedProduct.category === "Trophies" || selectedProduct.category === "Bats") {
      return (
        <GeneralOrderForm 
          productType={selectedProduct.category}
        />
      );
    } else {
      return <JerseyOrderForm />;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 max-w-7xl mx-auto bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden">
          {/* Sports-themed background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="flex justify-center items-center h-64 relative z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-6 shadow-lg"></div>
              <p className="text-gray-600 text-lg font-medium">Loading sports gear...</p>
              <p className="text-gray-400 text-sm mt-2">Preparing the best collection for you</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showOrderForm) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 p-6 relative overflow-hidden">
          {/* Sports-themed background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="mb-8">
              <button
                onClick={handleCloseOrderForm}
                className="bg-linear-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Products
              </button>
            </div>
            {getOrderFormType()}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden">
        {/* Sports-themed background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">Sports Collection</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Premium jerseys, trophies & sportswear for every occasion. Elevate your game with our top-quality equipment.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                    selectedCategory === category
                      ? "bg-linear-to-r from-emerald-600 to-blue-600 text-white shadow-lg"
                      : "bg-white/80 backdrop-blur text-gray-700 hover:bg-white border-2 border-emerald-200 hover:border-emerald-400"
                  }`}
                >
                  {category === "all" ? "🏆 All Sports" : 
                   category === "Sports Jersey" ? "👕 Sports Jerseys" :
                   category === "Festival Jersey" ? "🎉 Festival Jerseys" :
                   category === "Trophies" ? "🏆 Trophies" : "🏏 Bats"}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-white/30"
              >
                {/* Image */}
                <div className="h-56 w-full flex items-center justify-center bg-linear-to-br from-emerald-50 to-blue-50">
                  {product.image ? (
                    <div className="relative group cursor-pointer" onClick={() => {
                      const imageUrl = product.image.startsWith('http') 
                        ? product.image 
                        : product.image.includes('cloudinary') 
                          ? product.image 
                          : `http://localhost:5000/uploads/${product.image}`;
                      console.log('User page - setting selected image:', imageUrl);
                      setSelectedImage(imageUrl);
                    }}>
                      <img
                        src={
                          product.image.startsWith('http') 
                            ? product.image 
                            : product.image.includes('cloudinary') 
                              ? product.image 
                              : `http://localhost:5000/uploads/${product.image}`
                        }
                        alt={product.name}
                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: 'transparent' }}
                        onLoad={(e) => {
                          console.log('✅ User page image loaded successfully:', e.target.src);
                          e.target.style.backgroundColor = 'transparent';
                        }}
                        onError={e => { 
                          console.error('❌ User page image failed to load:', e.target.src);
                          e.target.onerror = null; 
                          e.target.style.backgroundColor = '#f8f9fa';
                          // Try alternative path if main path fails
                          if (!product.image.startsWith('http')) {
                            const originalSrc = e.target.src;
                            e.target.src = `http://localhost:5000/uploads/${product.image}`;
                            // If that also fails, show fallback
                            e.target.onerror = function() {
                              this.onerror = null;
                              this.style.backgroundColor = '#f8f9fa';
                              this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjJGMkYyIi8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNOTAgMTAwSDExMFYxMTBIMTBWMTAwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                            };
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          <p className="text-sm font-bold">View Image</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <svg className="w-20 h-20 text-emerald-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-emerald-600 font-medium">No Image</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                      {product.category || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-gray-500">SKU: {product._id.slice(-6)}</span>
                  </div>
                  <h2 className="font-bold text-xl text-gray-800 mb-2">{product.name}</h2>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-bold text-emerald-600">₹{product.price}</p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'Premium quality sports gear designed for champions.'}</p>
                  <button
                    onClick={() => handleOrderClick(product)}
                    className="w-full bg-linear-to-r from-emerald-600 to-blue-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {products.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <p className="text-gray-500 text-xl font-medium mb-2">No products found</p>
              <p className="text-gray-400">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  );
}