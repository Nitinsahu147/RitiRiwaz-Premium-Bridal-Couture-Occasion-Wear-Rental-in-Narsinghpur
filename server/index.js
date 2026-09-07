import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

// Cloudinary Configuration
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('Cloudinary initialized with custom credentials');
} else {
  console.log('Cloudinary environment variables missing. Falling back to local data URL / base64 image stream upload mode.');
}

// Multer in-memory storage for file uploads
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Helper to extract Cloudinary public_id from URL and delete from Cloudinary storage
async function deleteCloudinaryImages(imagesList) {
  if (!imagesList || !Array.isArray(imagesList) || imagesList.length === 0) return;
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return;
  }

  for (const imgUrl of imagesList) {
    if (typeof imgUrl !== 'string') continue;
    
    // Match Cloudinary URL format and extract public_id
    // e.g., https://res.cloudinary.com/<cloud_name>/image/upload/v12345/riti-riwaz/products/sample.jpg
    const match = imgUrl.match(/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(.+?)\.[a-z0-9]+$/i);
    if (match && match[1]) {
      const publicId = match[1];
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`Cloudinary image purged successfully for public_id: "${publicId}"`, result);
      } catch (err) {
        console.error(`Failed to purge Cloudinary image (${publicId}):`, err.message);
      }
    }
  }
}

// Seed initial products dataset
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    code: 'RR-BD-01',
    name: 'Royal Crimson Zardozi Bridal Lehenga',
    slug: 'royal-crimson-zardozi-bridal-lehenga',
    category: 'bridal',
    subcategory: 'Heavy Lehenga',
    occasion: ['Wedding', 'Main Ceremony'],
    description: 'A breathtaking royal crimson raw silk lehenga featuring opulent dabka, zardozi, and sequence hand-embroidery. Paired with a heavily embroidered blouse and dual net dupattas.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L', 'Custom Fitting Available'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Bridal', 'Velvet', 'Zardozi', 'Royal Red', 'Rental Ready']
  },
  {
    id: 'prod-2',
    code: 'RR-BD-02',
    name: 'Heritage Maroon Velvet Bridal Lehenga',
    slug: 'heritage-maroon-velvet-bridal-lehenga',
    category: 'bridal',
    subcategory: 'Velvet Lehenga',
    occasion: ['Wedding', 'Reception'],
    description: 'Deep royal maroon micro-velvet lehenga with intricate golden tilla embroidery, cutdana highlights, and handcrafted royal border detail.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['M', 'L', 'XL'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Bridal', 'Velvet', 'Deep Maroon', 'Rental Ready']
  },
  {
    id: 'prod-3',
    code: 'RR-SL-01',
    name: 'Emerald Blossom Sangeet Side Lehenga',
    slug: 'emerald-blossom-sangeet-side-lehenga',
    category: 'side-lehenga',
    subcategory: 'Lightweight Lehenga',
    occasion: ['Sangeet', 'Bridesmaid', 'Engagement'],
    description: 'Lush emerald green silk skirt with sequined botanical motifs, paired with an off-shoulder blouse and metallic dupatta.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Bridesmaid', 'Sangeet', 'Emerald Green', 'Rental Ready']
  },
  {
    id: 'prod-4',
    code: 'RR-HL-01',
    name: 'Sunny Marigold Floral Haldi Ensemble',
    slug: 'sunny-marigold-floral-haldi-ensemble',
    category: 'haldi',
    subcategory: 'Haldi Special',
    occasion: ['Haldi', 'Pooja Rituals'],
    description: 'Vibrant yellow georgette lehenga set accented with gota patti work and mirror embellishments, perfect for bright morning Haldi ceremonies.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Haldi', 'Yellow', 'Gota Patti', 'Rental Ready']
  },
  {
    id: 'prod-5',
    code: 'RR-MH-01',
    name: 'Lime Green Mirror Work Mehndi Lehenga',
    slug: 'lime-green-mirror-work-mehndi-lehenga',
    category: 'mehndi',
    subcategory: 'Mehndi Special',
    occasion: ['Mehndi', 'Sangeet'],
    description: 'Refreshing lime green crepe lehenga with real mirror work and Resham embroidery for maximum comfort and radiance during Mehndi festivities.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Mehndi', 'Green', 'Mirror Work']
  },
  {
    id: 'prod-6',
    code: 'RR-PW-01',
    name: 'Midnight Sapphire Royal Trail Gown',
    slug: 'midnight-sapphire-royal-trail-gown',
    category: 'pre-wedding',
    subcategory: 'Trail Gown',
    occasion: ['Pre-Wedding Shoot', 'Cocktail', 'Reception'],
    description: 'An ethereal 3-meter sweeping trail gown in sapphire blue satin-organza with structured corset and subtle shimmer finish.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['Free Size Adjustment', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Pre-Wedding', 'Trail Gown', 'Shoot Special', 'Rental Ready']
  },
  {
    id: 'prod-7',
    code: 'RR-JW-01',
    name: 'Imperial Kundan & Pearl Bridal Choker Set',
    slug: 'imperial-kundan-pearl-bridal-choker-set',
    category: 'jewellery',
    subcategory: 'Bridal Jewellery Set',
    occasion: ['Wedding', 'Reception'],
    description: 'Handcrafted Kundan choker set plated in 22k gold finish with freshwater pearl drops, matching earrings, maang tikka, and nath.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['Adjustable Fit'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Jewellery', 'Kundan', 'Bridal Set', 'Rental Ready']
  },
  {
    id: 'prod-8',
    code: 'RR-MT-01',
    name: 'Blush Rose Satin Maternity Shoot Gown',
    slug: 'blush-rose-satin-maternity-shoot-gown',
    category: 'maternity',
    subcategory: 'Maternity Gown',
    occasion: ['Maternity Shoot', 'Baby Shower'],
    description: 'Ultra-soft flowing silk-satin gown with detachable shoulder cape, designed for comfort and captivating photography moments.',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['Elasticated Comfort Fit (S-XL)'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: false,
    tags: ['Maternity', 'Pink', 'Shoot Special']
  },
  {
    id: 'prod-9',
    code: 'RR-WS-01',
    name: 'Champagne Gold Draped Fusion Gown',
    slug: 'champagne-gold-draped-fusion-gown',
    category: 'western',
    subcategory: 'Indo-Western',
    occasion: ['Cocktail', 'Reception', 'Engagement'],
    description: 'Sleek champagne gold shimmer gown with asymmetrical pre-draped shoulder pallu and metallic waist accents.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'CURRENTLY RENTED',
    featured: false,
    tags: ['Western', 'Cocktail', 'Champagne Gold']
  }
];

let memoryProducts = [...INITIAL_PRODUCTS];

let memoryEnquiries = [
  {
    id: 'enq-1',
    customerName: 'Priya Sharma',
    phone: '+91 9876543210',
    productName: 'Royal Crimson Zardozi Bridal Lehenga',
    eventDate: '2026-11-15',
    preferredSize: 'M',
    occasion: 'Wedding',
    status: 'New',
    createdAt: new Date().toISOString()
  },
  {
    id: 'enq-2',
    customerName: 'Anjali Verma',
    phone: '+91 9123456789',
    productName: 'Midnight Sapphire Royal Trail Gown',
    eventDate: '2026-10-08',
    preferredSize: 'Free Size',
    occasion: 'Pre-Wedding Shoot',
    status: 'Contacted',
    createdAt: new Date().toISOString()
  }
];

// MongoDB Schemas
const productSchema = new mongoose.Schema({
  id: String,
  code: String,
  name: String,
  slug: String,
  category: String,
  subcategory: String,
  occasion: [String],
  description: String,
  images: [String],
  sizes: [String],
  rentalAvailable: Boolean,
  availabilityStatus: { type: String, default: 'AVAILABLE' },
  featured: Boolean,
  tags: [String],
}, { timestamps: true });

const enquirySchema = new mongoose.Schema({
  id: String,
  customerName: String,
  phone: String,
  productName: String,
  eventDate: String,
  preferredSize: String,
  occasion: String,
  customMessage: String,
  status: { type: String, default: 'New' },
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);
const EnquiryModel = mongoose.model('Enquiry', enquirySchema);

// Connect MongoDB if URI provided
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Connected to MongoDB Atlas successfully');
      const count = await ProductModel.countDocuments();
      if (count === 0) {
        await ProductModel.insertMany(INITIAL_PRODUCTS);
        console.log('Seeded initial products into MongoDB database.');
      }
    })
    .catch((err) => console.warn('MongoDB connection error, falling back to memory database:', err.message));
}

// Flexible Product Search Query Helper
function getProductFilter(param) {
  const isObjectId = mongoose.Types.ObjectId.isValid(param);
  return {
    $or: [
      { id: param },
      { code: param },
      { slug: param },
      ...(isObjectId ? [{ _id: param }] : [])
    ]
  };
}

// REST API ROUTES
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Riti Riwaz API',
    cloudinary: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
    mongodb: mongoose.connection.readyState === 1,
    time: new Date()
  });
});

// CLOUDINARY UPLOAD ENDPOINT
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'riti-riwaz/products' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ error: 'Cloudinary upload failed: ' + error.message });
          }
          return res.json({ url: result.secure_url, public_id: result.public_id });
        }
      );
      uploadStream.end(req.file.buffer);
    } else {
      const base64Data = req.file.buffer.toString('base64');
      const dataUrl = `data:${req.file.mimetype};base64,${base64Data}`;
      return res.json({
        url: dataUrl,
        notice: 'Uploaded locally as Data URL. Set CLOUDINARY credentials in .env for Cloudinary cloud hosting.'
      });
    }
  } catch (err) {
    console.error('Upload endpoint error:', err);
    res.status(500).json({ error: err.message });
  }
});

// CLOUDINARY DELETE IMAGE ENDPOINT
app.post('/api/upload/delete', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
    await deleteCloudinaryImages([url]);
    res.json({ message: 'Cloudinary image purge request executed', url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PRODUCTS CRUD

// 1. GET ALL PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let products = await ProductModel.find().sort({ createdAt: -1 });
      if (products.length === 0) {
        await ProductModel.insertMany(INITIAL_PRODUCTS);
        products = await ProductModel.find().sort({ createdAt: -1 });
      }
      const formatted = products.map((doc) => {
        const obj = doc.toObject();
        obj.id = obj.id || obj._id.toString();
        return obj;
      });
      return res.json(formatted);
    }
    res.json(memoryProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET SINGLE PRODUCT
app.get('/api/products/:idOrSlug', async (req, res) => {
  const { idOrSlug } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await ProductModel.findOne(getProductFilter(idOrSlug));
      if (!product) return res.status(404).json({ error: 'Product not found' });
      const obj = product.toObject();
      obj.id = obj.id || obj._id.toString();
      return res.json(obj);
    }

    const product = memoryProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug || p.code === idOrSlug);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE PRODUCT
app.post('/api/products', async (req, res) => {
  try {
    const { name, code, category, subcategory, occasion, description, images, sizes, rentalAvailable, availabilityStatus, featured, tags } = req.body;
    
    if (!name || !code) {
      return res.status(400).json({ error: 'Name and Code are required' });
    }

    const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = {
      id: `prod-${Date.now()}`,
      code: code.toUpperCase(),
      name,
      slug: generatedSlug || `outfit-${Date.now()}`,
      category: category || 'bridal',
      subcategory: subcategory || 'Couture',
      occasion: occasion && occasion.length ? occasion : ['Wedding', 'Special Occasion'],
      description: description || 'Handcrafted designer ensemble from Riti Riwaz boutique collection.',
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800'],
      sizes: sizes && sizes.length ? sizes : ['S', 'M', 'L', 'Custom Fitting'],
      rentalAvailable: rentalAvailable !== undefined ? rentalAvailable : true,
      availabilityStatus: availabilityStatus || 'AVAILABLE',
      featured: featured !== undefined ? featured : true,
      tags: tags && tags.length ? tags : ['New Arrival', category || 'Bridal']
    };

    if (mongoose.connection.readyState === 1) {
      const created = await ProductModel.create(newProduct);
      const obj = created.toObject();
      obj.id = obj.id || obj._id.toString();
      return res.status(201).json(obj);
    }

    memoryProducts.unshift(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. UPDATE PRODUCT
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let existingProduct = null;

    if (mongoose.connection.readyState === 1) {
      const filter = getProductFilter(id);
      existingProduct = await ProductModel.findOne(filter);
      let updated = await ProductModel.findOneAndUpdate(filter, req.body, { new: true });
      if (!updated && existingProduct) {
        Object.assign(existingProduct, req.body);
        updated = await existingProduct.save();
      }
      if (!updated) return res.status(404).json({ error: 'Product not found' });

      // Clean up any Cloudinary images that were removed during edit
      if (existingProduct && existingProduct.images && Array.isArray(req.body.images)) {
        const removedImages = existingProduct.images.filter(img => !req.body.images.includes(img));
        if (removedImages.length > 0) {
          deleteCloudinaryImages(removedImages).catch(e => console.error('Cloudinary update cleanup error:', e));
        }
      }

      const obj = updated.toObject();
      obj.id = obj.id || obj._id.toString();
      return res.json(obj);
    }

    const index = memoryProducts.findIndex(p => p.id === id || p.code === id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    existingProduct = memoryProducts[index];
    memoryProducts[index] = { ...memoryProducts[index], ...req.body };

    if (existingProduct && existingProduct.images && Array.isArray(req.body.images)) {
      const removedImages = existingProduct.images.filter(img => !req.body.images.includes(img));
      if (removedImages.length > 0) {
        deleteCloudinaryImages(removedImages).catch(e => console.error('Cloudinary cleanup error:', e));
      }
    }

    res.json(memoryProducts[index]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE PRODUCT
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let deletedProduct = null;

    if (mongoose.connection.readyState === 1) {
      const filter = getProductFilter(id);
      deletedProduct = await ProductModel.findOneAndDelete(filter);
    } else {
      const index = memoryProducts.findIndex(p => p.id === id || p.code === id);
      if (index !== -1) {
        deletedProduct = memoryProducts.splice(index, 1)[0];
      }
    }

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Purge associated Cloudinary images from Cloudinary storage
    if (deletedProduct.images && Array.isArray(deletedProduct.images) && deletedProduct.images.length > 0) {
      await deleteCloudinaryImages(deletedProduct.images);
    }

    return res.json({
      message: 'Product and associated Cloudinary images deleted successfully',
      id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ENQUIRIES CRUD

// 1. GET ALL ENQUIRIES
app.get('/api/enquiries', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const enquiries = await EnquiryModel.find().sort({ createdAt: -1 });
      const formatted = enquiries.map((doc) => {
        const obj = doc.toObject();
        obj.id = obj.id || obj._id.toString();
        return obj;
      });
      return res.json(formatted);
    }
    res.json(memoryEnquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. CREATE ENQUIRY
app.post('/api/enquiries', async (req, res) => {
  try {
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      ...req.body,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    if (mongoose.connection.readyState === 1) {
      const created = await EnquiryModel.create(newEnquiry);
      const obj = created.toObject();
      obj.id = obj.id || obj._id.toString();
      return res.status(201).json(obj);
    }

    memoryEnquiries.unshift(newEnquiry);
    res.status(201).json(newEnquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. UPDATE ENQUIRY STATUS
app.put('/api/enquiries/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (mongoose.connection.readyState === 1) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const filter = {
        $or: [
          { id: id },
          ...(isObjectId ? [{ _id: id }] : [])
        ]
      };
      const updated = await EnquiryModel.findOneAndUpdate(filter, { status }, { new: true });
      if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
      const obj = updated.toObject();
      obj.id = obj.id || obj._id.toString();
      return res.json(obj);
    }

    const target = memoryEnquiries.find(e => e.id === id);
    if (!target) return res.status(404).json({ error: 'Enquiry not found' });

    target.status = status;
    res.json(target);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. DELETE ENQUIRY
app.delete('/api/enquiries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const filter = {
        $or: [
          { id: id },
          ...(isObjectId ? [{ _id: id }] : [])
        ]
      };
      const deleted = await EnquiryModel.findOneAndDelete(filter);
      if (!deleted) return res.status(404).json({ error: 'Enquiry not found' });
      return res.json({ message: 'Enquiry deleted successfully', id });
    }

    const index = memoryEnquiries.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: 'Enquiry not found' });

    memoryEnquiries.splice(index, 1);
    res.json({ message: 'Enquiry deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Riti Riwaz backend API server running on port ${PORT}`);
});
