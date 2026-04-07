# Cloudinary Setup Instructions

## 1. Create Cloudinary Account
1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Navigate to your Dashboard

## 2. Get Your Credentials
From your Cloudinary Dashboard, you'll need:
- **Cloud Name**: Found in Dashboard > Account Details
- **API Key**: Found in Dashboard > Security > API Keys
- **API Secret**: Found in Dashboard > Security > API Keys

## 3. Update .env File
Replace the placeholder values in your `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/PratikSports
PORT=5000
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

## 4. Features Enabled
With Cloudinary integration, you now have:
- ✅ Automatic image upload to cloud storage
- ✅ Image optimization and transformation
- ✅ CDN delivery for fast loading
- ✅ Category-wise product filtering
- ✅ Proper image display in frontend

## 5. How It Works
1. Admin uploads image through Manage Product page
2. Image is automatically uploaded to Cloudinary
3. Cloudinary URL is stored in database
4. Frontend displays images from Cloudinary CDN
5. Products are filtered by category dynamically

## 6. Testing
1. Start backend: `npm start` (from backend folder)
2. Start frontend: `npm run dev` (from frontend folder)
3. Go to admin panel: `http://localhost:5173/admin`
4. Upload a product with image
5. Check products page: `http://localhost:5173/products`

## Notes
- Images are stored in Cloudinary folder: `pratik-sports/products`
- No local file storage required
- Images are accessible via HTTPS URLs
- Automatic fallback to placeholder if image fails to load
