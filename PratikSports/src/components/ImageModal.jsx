import React, { useEffect } from 'react';

export default function ImageModal({ image, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  console.log('ImageModal opened with image URL:', image);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-9999 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black rounded-lg p-2 max-w-7xl max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 z-10 shadow-lg"
          title="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Container */}
        <div className="flex items-center justify-center min-w-96 min-h-96 max-w-full max-h-full">
          {image ? (
            <img
              src={image}
              alt="Full size jersey image"
              className="max-w-full max-h-full object-contain"
              style={{ 
                display: 'block',
                backgroundColor: 'transparent',
                imageRendering: 'auto'
              }}
              onLoad={(e) => {
                console.log('✅ Image loaded successfully:', image);
                // Ensure clean display
                e.target.style.backgroundColor = 'transparent';
                e.target.style.imageRendering = 'auto';
              }}
              onError={(e) => {
                console.error('❌ Image failed to load:', image);
                // Show error message
                e.target.style.display = 'none';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'text-red-500 text-center p-8 bg-white rounded';
                errorDiv.innerHTML = `
                  <p class="text-lg font-bold mb-2">❌ Failed to load image</p>
                  <button onclick="window.open('${image}', '_blank')" class="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Test URL in New Tab
                  </button>
                `;
                e.target.parentNode.appendChild(errorDiv);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="text-center text-white">
              <p>No image available</p>
            </div>
          )}
        </div>

        {/* Image Info */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
          <p className="text-sm">Click outside or press ESC to close</p>
        </div>
      </div>
    </div>
  );
}
