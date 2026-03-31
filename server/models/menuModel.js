import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Snacks', 'Drinks'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const MenuItem = mongoose.model('MenuItem', menuSchema);
export default MenuItem;
