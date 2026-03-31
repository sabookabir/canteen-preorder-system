import supabase from '../config/supabase.js';

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
  try {
    const [{ count: totalOrders }, { count: totalUsers }, { data: orders }] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('total'),
    ]);

    const totalRevenue = (orders || []).reduce((acc, item) => acc + Number(item.total), 0);

    res.json({ totalOrders, totalUsers, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at');

    if (error) throw new Error(error.message);
    res.json(users.map(u => ({ ...u, _id: u.id })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
