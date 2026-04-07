import { useState, useEffect } from "react";
import API from "../../services/api";
import AdminNavbar from "../../pages/admin/AdminNavbar";
import ImageModal from "../../components/ImageModal";

const ManageProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: ""
  });

  const [image, setImage] = useState(null);
  const [useUrl, setUseUrl] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/all");
      console.log("Products fetched:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value) || 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (useUrl && !formData.imageUrl) {
      alert("Please enter an image URL");
      return;
    }

    if (!useUrl && !image) {
      alert("Please select an image file");
      return;
    }

    try {
      setLoading(true);

      if (useUrl) {
        // Submit with image URL
        await API.post("/products/create", {
          name: formData.name,
          price: formData.price,
          category: formData.category,
          description: formData.description,
          image: formData.imageUrl
        });
      } else {
        // Submit with file upload
        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("description", formData.description);
        data.append("image", image);

        await API.post("/products/create", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }

      alert("Jersey Uploaded Successfully");

      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: ""
      });

      setImage(null);
      setUseUrl(false);

      fetchProducts(); // refresh list

    } catch (err) {
      console.error("Upload Error:", err);
      if (err.response) {
        // Server responded with error
        alert(`Upload Failed: ${err.response.data.message || err.response.data.error || 'Server error'}`);
      } else if (err.request) {
        // Network error
        alert('Upload Failed: Network error. Please check your connection.');
      } else {
        // Other error
        alert(`Upload Failed: ${err.message || 'Unknown error occurred'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Product
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product Deleted");
      fetchProducts();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 p-8 relative overflow-hidden">
      {/* Sports-themed background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <AdminNavbar/>

      <div className="relative z-10">
        {/* Upload Form */}
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl mb-12 mt-10 border border-white/30">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2 text-center">Add New Sports Gear</h2>
          <p className="text-gray-600 text-center mb-8">Upload your premium sports products to the collection</p>

          <form onSubmit={handleSubmit}>

            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                placeholder="Enter product name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 2.09 1.25.48 2.65.48 3.31 0 .66-.27 1.05-.41 1.05-.82 0-.43-.21-.72-.61-1.1-.4-.37-1.32-.94-2.73-1.41-1.41-.46-2.35-1.37-2.35-2.86 0-1.41 1.05-2.49 2.8-2.86v-1.93h2.67v1.93c1.52.36 2.67 1.37 2.78 2.86h-1.96c-.1-.81-.44-1.61-1.67-2.09-.66-.27-1.56-.27-2.22 0-.65.27-.99.41-.99.82 0 .43.21.72.61 1.1.4.37 1.32.94 2.73 1.41 1.41.46 2.35 1.37 2.35 2.86 0 1.41-1.05 2.49-2.8 2.86zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                Price
              </label>
              <input
                name="price"
                value={formData.price}
                placeholder="Enter price"
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 focus:bg-white"
                required
              >
                <option value="">Select Category</option>
                <option value="Sports Jersey">👕 Sports Jersey</option>
                <option value="Festival Jersey">🎉 Festival Jersey</option>
                <option value="Trophies">🏆 Trophies</option>
                <option value="Bats">🏏 Bats</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zM5 4v6h6V4H5z"/>
                </svg>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Enter product description"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white h-24 resize-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload Options */}
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                Product Image
              </label>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center cursor-pointer bg-white px-4 py-2 rounded-xl border-2 border-gray-300 hover:border-emerald-500 transition-colors">
                  <input
                    type="radio"
                    checked={!useUrl}
                    onChange={() => setUseUrl(false)}
                    className="mr-2"
                  />
                  <span className="font-medium">📁 Upload File</span>
                </label>
                <label className="flex items-center cursor-pointer bg-white px-4 py-2 rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    checked={useUrl}
                    onChange={() => setUseUrl(true)}
                    className="mr-2"
                  />
                  <span className="font-medium">🔗 Use Image URL</span>
                </label>
              </div>

              {!useUrl ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required={!useUrl}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <p className="text-gray-600 font-medium">Click to upload image</p>
                    <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </label>
                  {image && (
                    <p className="mt-3 text-sm text-emerald-600 font-medium">✓ {image.name}</p>
                  )}
                </div>
              ) : (
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  onChange={handleChange}
                  required={useUrl}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Upload Product
                </>
              )}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">Sports Gear Inventory</h2>
            <p className="text-gray-600">Manage your existing product collection</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-white/30"
              >
                <div className="relative group cursor-pointer" onClick={() => {
                    const imageUrl = product.image.startsWith('http') 
                      ? product.image 
                      : `http://localhost:5000/uploads/${product.image}`;
                    console.log('Admin page - setting selected image:', imageUrl);
                    setSelectedImage(imageUrl);
                  }}>
                  <img
                    src={
                      product.image.startsWith('http') 
                        ? product.image 
                        : `http://localhost:5000/uploads/${product.image}`
                    }
                    alt={product.name}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'transparent' }}
                    onLoad={(e) => {
                      console.log('✅ Image loaded successfully:', e.target.src);
                      e.target.style.backgroundColor = 'transparent';
                    }}
                    onError={(e) => {
                      console.error('❌ Image failed to load:', e.target.src);
                      e.target.style.backgroundColor = '#f8f9fa';
                      
                      if (!product.image.startsWith('http')) {
                        const originalSrc = e.target.src;
                        e.target.src = `http://localhost:5000/uploads/${product.image}`;
                        
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

                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-bold text-emerald-600">₹{product.price}</p>
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this product?')) {
                        deleteProduct(product._id);
                      }
                    }}
                    className="w-full bg-linear-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </div>
    </div>
  );
}
export default ManageProduct;