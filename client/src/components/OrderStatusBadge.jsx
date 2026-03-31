const OrderStatusBadge = ({ status }) => {
  const styles = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Preparing': 'bg-blue-100 text-blue-800 border-blue-200',
    'Ready': 'bg-green-100 text-green-800 border-green-200',
    'Picked Up': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded-full border ${styles[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
