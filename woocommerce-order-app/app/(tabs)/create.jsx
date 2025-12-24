import { View, Text, ScrollView, TextInput, Alert, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import wooCommerceService from '../../services/woocommerce';
import Loader from '../../components/Loader';
import { PAYMENT_METHODS } from '../../utils/constants';

export default function CreateOrderScreen() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  
  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    customer_id: null,
    selectedCustomer: null,
    line_items: [],
    payment_method: 'cod',
    payment_method_title: 'Cash on Delivery',
    billing: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address_1: '',
      city: '',
      state: '',
      postcode: '',
      country: 'IN',
    },
    shipping: {
      first_name: '',
      last_name: '',
      address_1: '',
      city: '',
      state: '',
      postcode: '',
      country: 'IN',
    },
  });
  
  // Fetch products and customers
  useEffect(() => {
    loadInitialData();
  }, []);
  
  const loadInitialData = async () => {
    try {
      setLoadingData(true);
      const [productsData, customersData] = await Promise.all([
        wooCommerceService.getProducts({ per_page: 50 }),
        wooCommerceService.getCustomers({ per_page: 50 }),
      ]);
      setProducts(productsData);
      setCustomers(customersData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoadingData(false);
    }
  };
  
  // Add product to order
  const addProduct = (product) => {
    const existingItem = formData.line_items.find(item => item.product_id === product.id);
    
    if (existingItem) {
      setFormData(prev => ({
        ...prev,
        line_items: prev.line_items.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        line_items: [
          ...prev.line_items,
          {
            product_id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
      }));
    }
    setShowProductModal(false);
  };
  
  // Remove product from order
  const removeProduct = (productId) => {
    setFormData(prev => ({
      ...prev,
      line_items: prev.line_items.filter(item => item.product_id !== productId),
    }));
  };
  
  // Update product quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeProduct(productId);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      line_items: prev.line_items.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      ),
    }));
  };
  
  // Select customer
  const selectCustomer = (customer) => {
    setFormData(prev => ({
      ...prev,
      customer_id: customer.id,
      selectedCustomer: customer,
      billing: {
        first_name: customer.billing.first_name,
        last_name: customer.billing.last_name,
        email: customer.email,
        phone: customer.billing.phone,
        address_1: customer.billing.address_1,
        city: customer.billing.city,
        state: customer.billing.state,
        postcode: customer.billing.postcode,
        country: customer.billing.country || 'IN',
      },
      shipping: {
        first_name: customer.shipping.first_name || customer.billing.first_name,
        last_name: customer.shipping.last_name || customer.billing.last_name,
        address_1: customer.shipping.address_1 || customer.billing.address_1,
        city: customer.shipping.city || customer.billing.city,
        state: customer.shipping.state || customer.billing.state,
        postcode: customer.shipping.postcode || customer.billing.postcode,
        country: customer.shipping.country || customer.billing.country || 'IN',
      },
    }));
    setShowCustomerModal(false);
  };
  
  // Calculate total
  const calculateTotal = () => {
    return formData.line_items.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  };
  
  // Submit order
  const handleSubmit = async () => {
    // Validation
    if (formData.line_items.length === 0) {
      Alert.alert('Error', 'Please add at least one product');
      return;
    }
    
    if (!formData.billing.first_name || !formData.billing.email) {
      Alert.alert('Error', 'Please fill billing information');
      return;
    }
    
    try {
      setLoading(true);
      
      const orderData = {
        customer_id: formData.customer_id || 0,
        payment_method: formData.payment_method,
        payment_method_title: formData.payment_method_title,
        set_paid: false,
        billing: formData.billing,
        shipping: formData.shipping,
        line_items: formData.line_items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        status: 'pending',
      };
      
      const response = await wooCommerceService.createOrder(orderData);
      
      Alert.alert(
        'Success',
        `Order #${response.number} created successfully!`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                customer_id: null,
                selectedCustomer: null,
                line_items: [],
                payment_method: 'cod',
                payment_method_title: 'Cash on Delivery',
                billing: {
                  first_name: '',
                  last_name: '',
                  email: '',
                  phone: '',
                  address_1: '',
                  city: '',
                  state: '',
                  postcode: '',
                  country: 'IN',
                },
                shipping: {
                  first_name: '',
                  last_name: '',
                  address_1: '',
                  city: '',
                  state: '',
                  postcode: '',
                  country: 'IN',
                },
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };
  
  if (loadingData) {
    return <Loader text="Loading data..." />;
  }
  
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        {/* Customer Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">Customer</Text>
          
          {formData.selectedCustomer ? (
            <View className="bg-gray-50 rounded-lg p-3">
              <Text className="text-base font-semibold text-gray-800">
                {formData.selectedCustomer.first_name} {formData.selectedCustomer.last_name}
              </Text>
              <Text className="text-sm text-gray-600">{formData.selectedCustomer.email}</Text>
              <Button
                title="Change Customer"
                variant="outline"
                size="sm"
                onPress={() => setShowCustomerModal(true)}
                className="mt-2"
              />
            </View>
          ) : (
            <Button
              title="Select Customer"
              onPress={() => setShowCustomerModal(true)}
            />
          )}
        </View>
        
        {/* Products Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">Products</Text>
            <Button
              title="Add Product"
              size="sm"
              onPress={() => setShowProductModal(true)}
            />
          </View>
          
          {formData.line_items.length === 0 ? (
            <Text className="text-center text-gray-500 py-4">
              No products added
            </Text>
          ) : (
            formData.line_items.map((item) => (
              <View
                key={item.product_id}
                className="bg-gray-50 rounded-lg p-3 mb-2"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="flex-1 text-base font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeProduct(item.product_id)}
                    className="ml-2"
                  >
                    <Text className="text-red-500 text-lg">✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center bg-white rounded-lg">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="px-3 py-2"
                    >
                      <Text className="text-lg font-bold text-gray-700">−</Text>
                    </TouchableOpacity>
                    <Text className="px-4 text-base font-semibold text-gray-800">
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="px-3 py-2"
                    >
                      <Text className="text-lg font-bold text-gray-700">+</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text className="text-base font-bold text-primary">
                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
        
        {/* Billing Information */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">Billing Information</Text>
          
          <View className="space-y-3">
            <View className="flex-row space-x-2">
              <TextInput
                placeholder="First Name *"
                value={formData.billing.first_name}
                onChangeText={(text) => setFormData(prev => ({
                  ...prev,
                  billing: { ...prev.billing, first_name: text }
                }))}
                className="flex-1 bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              />
              <TextInput
                placeholder="Last Name"
                value={formData.billing.last_name}
                onChangeText={(text) => setFormData(prev => ({
                  ...prev,
                  billing: { ...prev.billing, last_name: text }
                }))}
                className="flex-1 bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              />
            </View>
            
            <TextInput
              placeholder="Email *"
              value={formData.billing.email}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                billing: { ...prev.billing, email: text }
              }))}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
            />
            
            <TextInput
              placeholder="Phone"
              value={formData.billing.phone}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                billing: { ...prev.billing, phone: text }
              }))}
              keyboardType="phone-pad"
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
            />
            
            <TextInput
              placeholder="Address"
              value={formData.billing.address_1}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                billing: { ...prev.billing, address_1: text }
              }))}
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
            />
            
            <View className="flex-row space-x-2">
              <TextInput
                placeholder="City"
                value={formData.billing.city}
                onChangeText={(text) => setFormData(prev => ({
                  ...prev,
                  billing: { ...prev.billing, city: text }
                }))}
                className="flex-1 bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              />
              <TextInput
                placeholder="Postcode"
                value={formData.billing.postcode}
                onChangeText={(text) => setFormData(prev => ({
                  ...prev,
                  billing: { ...prev.billing, postcode: text }
                }))}
                keyboardType="numeric"
                className="flex-1 bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              />
            </View>
            
            <TextInput
              placeholder="State"
              value={formData.billing.state}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                billing: { ...prev.billing, state: text }
              }))}
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
            />
          </View>
        </View>
        
        {/* Payment Method */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">Payment Method</Text>
          <TouchableOpacity
            onPress={() => setShowPaymentModal(true)}
            className="bg-gray-50 rounded-lg p-4"
          >
            <Text className="text-base font-semibold text-gray-800">
              {formData.payment_method_title}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Total */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-gray-800">Total</Text>
            <Text className="text-2xl font-bold text-primary">
              ₹{calculateTotal()}
            </Text>
          </View>
        </View>
        
        {/* Submit Button */}
        <Button
          title="Create Order"
          onPress={handleSubmit}
          loading={loading}
          size="lg"
        />
        
        <View className="h-6" />
      </ScrollView>
      
      {/* Product Selection Modal */}
      <Modal
        visible={showProductModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black/50">
          <View className="flex-1 mt-20 bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-xl font-bold text-gray-800">Select Product</Text>
              <TouchableOpacity onPress={() => setShowProductModal(false)}>
                <Text className="text-2xl text-gray-600">✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => addProduct(item)}
                  className="p-4 border-b border-gray-100"
                >
                  <Text className="text-base font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    ₹{item.price}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      
      {/* Customer Selection Modal */}
      <Modal
        visible={showCustomerModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black/50">
          <View className="flex-1 mt-20 bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-xl font-bold text-gray-800">Select Customer</Text>
              <TouchableOpacity onPress={() => setShowCustomerModal(false)}>
                <Text className="text-2xl text-gray-600">✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={customers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectCustomer(item)}
                  className="p-4 border-b border-gray-100"
                >
                  <Text className="text-base font-semibold text-gray-800">
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    {item.email}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      
      {/* Payment Method Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black/50">
          <View className="flex-1 mt-20 bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-xl font-bold text-gray-800">Payment Method</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Text className="text-2xl text-gray-600">✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={PAYMENT_METHODS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setFormData(prev => ({
                      ...prev,
                      payment_method: item.value,
                      payment_method_title: item.label,
                    }));
                    setShowPaymentModal(false);
                  }}
                  className="p-4 border-b border-gray-100"
                >
                  <Text className="text-base font-semibold text-gray-800">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
