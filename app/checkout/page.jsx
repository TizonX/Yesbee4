'use client';

import { useState, useEffect } from 'react';
import Section from '../components/Section';

const products = [
  {
    id: 1,
    name: 'Basic Financial Planning',
    description: 'Essential financial planning services for individuals',
    price: 2999,
    duration: 'Monthly',
    subscriptionEndDate: '2025-07-25', // Example date format
  },
  {
    id: 2,
    name: 'Investment Advisory',
    description: 'Personalized investment strategies and portfolio management',
    price: 4999,
    duration: 'Monthly',
    subscriptionEndDate: '2025-07-25',
  },
  {
    id: 3,
    name: 'Tax Planning',
    description: 'Comprehensive tax optimization and planning services',
    price: 3999,
    duration: 'Monthly',
    subscriptionEndDate: '2025-07-25',
  },
  {
    id: 4,
    name: 'Retirement Planning',
    description: 'Long-term retirement strategy and pension planning',
    price: 5999,
    duration: 'Monthly',
    subscriptionEndDate: '2025-07-25',
  },
  {
    id: 5,
    name: 'Estate Planning',
    description: 'Complete estate management and succession planning',
    price: 7999,
    duration: 'Monthly',
    subscriptionEndDate: '2025-07-25',
  },
  {
    id: 6,
    name: 'Business Advisory',
    description: 'Strategic business consulting and growth planning',
    price: 9999,
    duration: 'Monthly',
    subscriptionEndDate: '2025-07-25',
  },
  {
    id: 7,
    name: 'Wealth Management',
    description: 'Comprehensive wealth management and preservation',
    price: 12999,
    duration: 'Monthly',
    subscriptionEndDate: '2025-07-25',
  },
];

export default function CheckoutPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [subscribedProducts, setSubscribedProducts] = useState([2, 5]); // Example subscribed products

  // Calculate total price of selected products
  const total = selectedProducts.reduce((sum, id) => {
    const product = products.find(p => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  const toggleProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isProductDisabled = (productId) => {
    return isFreeTrial || subscribedProducts.includes(productId);
  };

  // Format date to "25 Jul 2025" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Sort products: unsubscribed first, then subscribed
  const sortedProducts = [...products].sort((a, b) => {
    const aSubscribed = subscribedProducts.includes(a.id);
    const bSubscribed = subscribedProducts.includes(b.id);
    return aSubscribed === bSubscribed ? 0 : aSubscribed ? 1 : -1;
  });

  return (
    <Section className="min-h-screen bg-background-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isFreeTrial && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.873-1.562 3.157-1.562 4.03 0l6.28 11.225c.873 1.562-.218 3.51-2.015 3.51H4.22c-1.797 0-2.888-1.948-2.015-3.51l6.28-11.225zm.853 4.763v4h1.324v-4H9.338zm0 6v-1.324h1.324V13H9.338z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You are currently on a free trial.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Available Products</h2>
              <div className="space-y-6">
                {sortedProducts.map(product => {
                  const isDisabled = isProductDisabled(product.id);
                  const isSelected = selectedProducts.includes(product.id);
                  const isSubscribed = subscribedProducts.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className={`relative flex flex-col sm:flex-row p-4 rounded-lg border ${
                        isDisabled
                          ? 'opacity-60 bg-gray-50'
                          : isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {product.name}
                              {isSubscribed && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Subscribed
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm text-gray-400">{product.duration}</p>
                              <p className="text-sm text-gray-600">
                                {isSubscribed 
                                  ? `Subscribed until: ${formatDate(product.subscriptionEndDate)}`
                                  : `Subscription end date will be: ${formatDate(product.subscriptionEndDate)}`
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col justify-between items-end mt-4 sm:mt-0 sm:ml-4">
                        <button
                          onClick={() => !isDisabled && toggleProduct(product.id)}
                          disabled={isDisabled}
                          className={`${
                            isSelected
                              ? 'bg-primary text-white hover:bg-primary-dark'
                              : isDisabled
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-primary border border-primary hover:bg-primary/5'
                          } px-4 py-2 rounded-lg text-sm font-semibold transition-colors mb-2 sm:mb-4 order-1 sm:order-2`}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </button>
                        <span className="text-lg font-bold text-gray-900 order-2 sm:order-1">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              {selectedProducts.length > 0 ? (
                <div className="space-y-4">
                  {selectedProducts.map(id => {
                    const product = products.find(p => p.id === id);
                    return (
                      <div key={id} className="flex justify-between items-center">
                        <span className="text-gray-600">{product.name}</span>
                        <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    disabled={isFreeTrial || selectedProducts.length === 0}
                  >
                    Proceed to Payment
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center">No products selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
} 