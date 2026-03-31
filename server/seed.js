import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import MenuItem from './models/menuModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await MenuItem.deleteMany();

    // Create Sample Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test1234', salt);

    await User.create([
      { name: 'Test Student', email: 'student@college.com', password: hashedPassword, role: 'student' },
      { name: 'Test Staff', email: 'staff@canteen.com', password: hashedPassword, role: 'staff' },
      { name: 'Test Admin', email: 'admin@canteen.com', password: hashedPassword, role: 'admin' },
    ]);

    // Create Sample Menu Items
    await MenuItem.create([
      { name: 'Masala Dosa', category: 'Breakfast', price: 50, available: true, image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80' },
      { name: 'Paneer Butter Masala', category: 'Lunch', price: 120, available: true, image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80' },
      { name: 'Veg Sandwich', category: 'Snacks', price: 40, available: true, image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80' },
      { name: 'Cold Coffee', category: 'Drinks', price: 60, available: true, image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=300&q=80' },
    ]);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
