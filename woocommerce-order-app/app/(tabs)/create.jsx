import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function CreateOrderScreen() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    billing: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address_1: '',
      city: '',
      postcode: '',
      country: 'IN',
    },
    line_items: [],
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', {
        params: { per_page: 50, status: 'publish' },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProductToOrder = () => {
    if (!selectedProduct) {
      Alert.alert('Error', 'Please select a product');
      return;
    }

    const qty = parseInt(quantity) || 1;
    const newItem = {
      product_id: selectedProduct.id,
      name: selectedProduct.name,
      quantity: qty,
      price: parseFloat(selectedProduct.price),
      total: (parseFloat(selectedProduct.price) * qty).toFixed(2),
    };

    setFormData({
      ...formData,
      line_items: [...formData.line_items, newItem],
    });

    setSelectedProduct(null);
    setQuantity('1');
  };

  const removeItem = (index) => {
    const items = [...formData.line_items];
    items.splice(index, 1);
    setFormData({ ...formData, line_items: items });
  };

  const calculateTotal = () => {
    return formData.line_items.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
  };

  const handleSubmit = async () => {
    if (!formData.billing.first_name || !formData.billing.email) {
      Alert.alert('Error', 'Please fill in customer details');
      return;
    }

    if (formData.line_items.length === 0) {
      Alert.alert('Error', 'Please add at least one product');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        ...formData,
        line_items: formData.line_items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const response = await api.post('/orders', orderData);
      Alert.alert('Success', `Order #${response.data.number} created successfully!`, [
        { text: 'OK', onPress: () => resetForm() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      billing: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address_1: '',
        city: '',
        postcode: '',
        country: 'IN',
      },
      line_items: [],
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Fixed Header */}
      <View className="bg-primary-600 pt-12  px-4">
        <Text className="text-3xl font-bold text-white mb-2">Create Order</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {/* Customer Information Card */}
          <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">👤</Text>
              </View>
              <Text className="text-lg font-bold text-gray-900">Customer Details</Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">First Name *</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                placeholder="Enter first name"
                placeholderTextColor="#9CA3AF"
                value={formData.billing.first_name}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    billing: { ...formData.billing, first_name: text },
                  })
                }
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Email *</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                placeholder="customer@example.com"
                placeholderTextColor="#9CA3AF"
                value={formData.billing.email}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    billing: { ...formData.billing, email: text },
                  })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Phone</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                placeholder="+91 1234567890"
                placeholderTextColor="#9CA3AF"
                value={formData.billing.phone}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    billing: { ...formData.billing, phone: text },
                  })
                }
                keyboardType="phone-pad"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Address</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                placeholder="Enter street address"
                placeholderTextColor="#9CA3AF"
                value={formData.billing.address_1}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    billing: { ...formData.billing, address_1: text },
                  })
                }
                multiline
                numberOfLines={2}
              />
            </View>

            <View className="flex-row space-x-3">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">City</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                  placeholder="City"
                  placeholderTextColor="#9CA3AF"
                  value={formData.billing.city}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      billing: { ...formData.billing, city: text },
                    })
                  }
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Pincode</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                  placeholder="400001"
                  placeholderTextColor="#9CA3AF"
                  value={formData.billing.postcode}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      billing: { ...formData.billing, postcode: text },
                    })
                  }
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>

          {/* Products Section Card */}
          <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">📦</Text>
              </View>
              <Text className="text-lg font-bold text-gray-900">Add Products</Text>
            </View>

            {/* Product Selection */}
            <Text className="text-sm font-semibold text-gray-700 mb-3">Select Product</Text>
            <FlatList
              horizontal
              data={products}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedProduct(item)}
                  className={`mr-3 px-4 py-3 rounded-xl border-2 min-w-[140px] ${
                    selectedProduct?.id === item.id
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold mb-1 ${
                      selectedProduct?.id === item.id ? 'text-primary-700' : 'text-gray-900'
                    }`}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-500">₹{item.price}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text className="text-gray-500 text-sm">No products available</Text>
              }
            />

            {selectedProduct && (
              <View className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-3 mb-3">
                <Text className="font-bold text-gray-900 text-base mb-1">
                  {selectedProduct.name}
                </Text>
                <Text className="text-primary-600 font-bold text-lg">
                  ₹{selectedProduct.price}
                </Text>
              </View>
            )}

            {/* Quantity and Add Button */}
            <View className="flex-row space-x-3 mt-3">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Quantity</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                  placeholder="1"
                  placeholderTextColor="#9CA3AF"
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="number-pad"
                />
              </View>
              <View className="justify-end">
                <TouchableOpacity
                  onPress={addProductToOrder}
                  className="bg-primary-600 rounded-xl px-8 py-3.5 justify-center active:bg-primary-700"
                >
                  <Text className="text-white font-bold text-base">Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Cart Items */}
            {formData.line_items.length > 0 && (
              <View className="mt-5">
                <View className="flex-row items-center mb-3">
                  <Text className="text-sm font-semibold text-gray-700">
                    🛒 Cart ({formData.line_items.length} items)
                  </Text>
                </View>
                {formData.line_items.map((item, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between items-center bg-gray-50 rounded-xl p-4 mb-2 border border-gray-100"
                  >
                    <View className="flex-1 mr-3">
                      <Text className="font-semibold text-gray-900 text-base mb-1">
                        {item.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </Text>
                    </View>
                    <View className="flex-row items-center space-x-3">
                      <Text className="font-bold text-gray-900 text-base">₹{item.total}</Text>
                      <TouchableOpacity
                        onPress={() => removeItem(index)}
                        className="bg-red-100 rounded-lg p-2 w-8 h-8 items-center justify-center"
                      >
                        <Text className="text-red-600 font-bold text-sm">✕</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Total */}
                <View className="border-t-2 border-gray-200 mt-3 pt-4 flex-row justify-between items-center">
                  <Text className="text-lg font-bold text-gray-900">Total Amount</Text>
                  <Text className="text-2xl font-bold text-primary-600">
                    ₹{calculateTotal()}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>

      {/* Bottom Fixed Button */}
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className={`rounded-xl py-4 items-center ${
            loading ? 'bg-gray-400' : 'bg-primary-600 active:bg-primary-700'
          }`}
        >
          <Text className="text-white font-bold text-base">
            {loading ? '⏳ Creating Order...' : '✓ Create Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
