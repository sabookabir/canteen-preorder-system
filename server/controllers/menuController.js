import supabase from '../config/supabase.js';

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
export const getMenuItems = async (req, res) => {
  try {
    const { data: items, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    // Map 'id' to '_id' to prevent frontend crashes
    const shapedItems = items.map(item => ({...item, _id: item.id }));
    res.json(shapedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (req, res) => {
  try {
    const { name, category, price, image_url, available } = req.body;

    const { data: createdItem, error } = await supabase
      .from('menu_items')
      .insert([{ name, category, price, image_url, available: available ?? true }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    res.status(201).json({ ...createdItem, _id: createdItem.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req, res) => {
  try {
    const { name, category, price, image_url, available } = req.body;

    const { data: updatedItem, error } = await supabase
      .from('menu_items')
      .update({ name, category, price, image_url, available, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ ...updatedItem, _id: updatedItem.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req, res) => {
  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', req.params.id);

    if (error) throw new Error(error.message);
    res.json({ message: 'Menu item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
