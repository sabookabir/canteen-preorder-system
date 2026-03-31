import supabase from '../config/supabase.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Student)
export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, total, pickup_time } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const { data: createdOrder, error } = await supabase
      .from('orders')
      .insert([{
        student_id: req.user._id,
        order_items: orderItems, // stored as JSONB
        total,
        pickup_time,
        status: 'Pending',
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Normalise shape for frontend compatibility
    const shaped = shapeOrder(createdOrder);

    // Emit socket event for new order
    const io = req.app.get('socketio');
    if (io) io.to('staff_room').emit('new_order', shaped);

    res.status(201).json(shaped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('student_id', req.user._id)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    res.json(orders.map(shapeOrder));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Staff/Admin)
// @route   GET /api/orders/all
// @access  Private/Staff/Admin
export const getOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, users!orders_student_id_fkey(id, name, email)')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    res.json(orders.map(o => ({
      ...shapeOrder(o),
      student_id: o.users ? { _id: o.users.id, name: o.users.name, email: o.users.email } : o.student_id,
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, users!orders_student_id_fkey(id, name, email)')
      .eq('id', req.params.id)
      .single();

    if (error || !order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Authorization check for students
    if (order.student_id !== req.user._id && req.user.role === 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      ...shapeOrder(order),
      student_id: order.users ? { _id: order.users.id, name: order.users.name, email: order.users.email } : order.student_id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Staff/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { data: updatedOrder, error } = await supabase
      .from('orders')
      .update({ status: req.body.status, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const shaped = shapeOrder(updatedOrder);

    // Emit socket events for real-time tracking
    const io = req.app.get('socketio');
    if (io) {
      io.to(`order_${updatedOrder.id}`).emit('order_status_update', shaped);
      io.to('staff_room').emit('order_updated', shaped);
    }

    res.json(shaped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper: Map Supabase row shape to the shape frontend expects (_id, createdAt etc.)
function shapeOrder(o) {
  return {
    _id: o.id,
    student_id: o.student_id,
    order_items: o.order_items,
    total: o.total,
    status: o.status,
    pickup_time: o.pickup_time,
    createdAt: o.created_at,
    updatedAt: o.updated_at,
  };
}
