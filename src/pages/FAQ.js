import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Ordering & Custom Designs',
      questions: [
        {
          question: 'How do I create a custom design?',
          answer: 'Visit our Design Studio from the navigation menu. You can add text, upload images, choose colors, and create your unique design. Our easy-to-use canvas editor makes it simple to bring your ideas to life!'
        },
        {
          question: 'What file formats can I upload for custom designs?',
          answer: 'We accept PNG, JPG, and SVG files. For best quality, we recommend high-resolution images (at least 300 DPI) in PNG format with transparent backgrounds.'
        },
        {
          question: 'Can I save my design and finish ordering later?',
          answer: 'Yes! Once you create an account, all your designs are automatically saved. You can access them anytime from your dashboard and complete your order when ready.'
        },
        {
          question: 'Do you review custom designs before printing?',
          answer: 'Yes, our team reviews all custom designs to ensure print quality. We\'ll notify you within 24 hours if any adjustments are needed. This helps guarantee the best possible results!'
        },
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Custom designs may require 2-3 additional days for printing and quality check.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes! We ship to most countries worldwide. International shipping typically takes 10-15 business days. Shipping costs and delivery times vary by location.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order anytime from your dashboard.'
        },
        {
          question: 'What if my package is lost or damaged?',
          answer: 'We\'re committed to your satisfaction! If your package is lost or arrives damaged, contact us immediately with photos (if damaged). We\'ll send a replacement or issue a full refund.'
        },
      ]
    },
    {
      category: 'Products & Quality',
      questions: [
        {
          question: 'What materials do you use?',
          answer: 'We use premium, 100% cotton for our t-shirts and hoodies. All materials are pre-shrunk, breathable, and ethically sourced. We\'re committed to sustainability!'
        },
        {
          question: 'How should I care for my custom printed items?',
          answer: 'Wash inside-out in cold water, tumble dry low, and avoid ironing directly on the print. This will help your custom design stay vibrant for years to come!'
        },
        {
          question: 'What printing method do you use?',
          answer: 'We use Direct-to-Garment (DTG) printing for detailed designs and screen printing for bulk orders. Both methods produce high-quality, long-lasting prints.'
        },
        {
          question: 'Do colors look exactly like on screen?',
          answer: 'Colors may vary slightly due to screen settings and printing processes. We calibrate our systems regularly to match colors as closely as possible. If you\'re concerned, request a color sample!'
        },
      ]
    },
    {
      category: 'Sizing & Fit',
      questions: [
        {
          question: 'How do I choose the right size?',
          answer: 'Check our detailed size guide available on each product page. We provide measurements for chest, length, and sleeve. If you\'re between sizes, we recommend sizing up for a comfortable fit.'
        },
        {
          question: 'Are your products true to size?',
          answer: 'Yes! Our products fit true to standard US sizing. However, different styles may fit differently. Check the specific product description and size chart for each item.'
        },
        {
          question: 'Can I exchange for a different size?',
          answer: 'Yes! We offer free size exchanges within 30 days of purchase (for non-custom items). Custom designs cannot be exchanged unless there\'s a production error.'
        },
      ]
    },
    {
      category: 'Payment & Pricing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay through our secure Stripe payment system.'
        },
        {
          question: 'Do you offer bulk order discounts?',
          answer: 'Yes! Orders of 10+ items receive automatic discounts. Contact us for custom quotes on large orders (50+ items) - we\'ll beat any competitor\'s price!'
        },
        {
          question: 'Can I use a coupon code?',
          answer: 'Absolutely! Enter your coupon code at checkout. Sign up for our newsletter to receive exclusive discounts and early access to sales!'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees! The price you see is the price you pay (plus shipping and applicable taxes). We believe in transparent pricing.'
        },
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: '30-day returns for non-custom items in original condition with tags. Custom designs can only be returned if there\'s a production error or defect. Return shipping is free for defective items.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Refunds are processed within 5-7 business days after we receive your return. The funds will appear in your account within 3-5 business days depending on your bank.'
        },
        {
          question: 'What if my custom design came out wrong?',
          answer: 'If there\'s an error in production or your design doesn\'t match what was approved, we\'ll reprint it for free or issue a full refund. Your satisfaction is guaranteed!'
        },
      ]
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our custom printing services
          </p>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-ink-600 to-soul-600 rounded-lg p-6 mb-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Can't find what you're looking for?
          </h2>
          <p className="text-ink-100 mb-4">
            Our support team is here to help!
          </p>
          <a
            href="/contact"
            className="bg-white text-ink-600 px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all inline-block"
          >
            Contact Support
          </a>
        </div>

        {/* FAQ Categories */}
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-ink-600 text-white rounded-lg flex items-center justify-center text-sm">
                {categoryIndex + 1}
              </span>
              {category.category}
            </h2>

            <div className="space-y-3">
              {category.questions.map((faq, faqIndex) => {
                const globalIndex = `${categoryIndex}-${faqIndex}`;
                const isOpen = openIndex === globalIndex;

                return (
                  <div
                    key={globalIndex}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(globalIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-6 h-6 text-ink-600 dark:text-ink-400 transform transition-transform flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                        <p className="leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Additional Help Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-ink-100 dark:bg-ink-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ink-600 dark:text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Get help via email within 24 hours
            </p>
            <a href="mailto:support@inksoul.com" className="text-ink-600 dark:text-ink-400 font-medium hover:underline">
              support@inksoul.com
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-soul-100 dark:bg-soul-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-soul-600 dark:text-soul-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Live Chat
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Chat with us in real-time
            </p>
            <button className="text-soul-600 dark:text-soul-400 font-medium hover:underline">
              Start Chat
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Phone Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Monday - Friday, 9AM - 6PM EST
            </p>
            <a href="tel:+1-800-INKSOUL" className="text-green-600 dark:text-green-400 font-medium hover:underline">
              1-800-INKSOUL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
