import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const featuresRef = useRef();
  const productsRef = useRef();
  const glowRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    // Hero section animations
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
  
      // Video animation
      gsap.fromTo(videoRef.current,
        { x: 100, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
  
      // Scroll-triggered animations
      gsap.fromTo(featuresRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    gsap.fromTo(productsRef.current.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for hero elements
    gsap.to(".float-element", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });

    // Floating animation for video container
    gsap.to(videoRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Glow effect animation
    gsap.to(glowRef.current, {
      scale: 1.1,
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, []);

  const features = [
    {
      icon: "🎨",
      title: "Premium Quality",
      description: "High-quality materials and printing techniques for lasting durability."
    },
    {
      icon: "🚚",
      title: "Fast Shipping",
      description: "Quick and reliable delivery to your doorstep worldwide."
    },
    {
      icon: "💯",
      title: "100% Satisfaction",
      description: "Money-back guarantee if you're not completely satisfied."
    },
    {
      icon: "🌱",
      title: "Eco-Friendly",
      description: "Sustainable materials and environmentally conscious production."
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Artistic T-Shirt",
      price: 29.99,
      image: "/api/placeholder/300/300",
      category: "T-Shirts"
    },
    {
      id: 2,
      name: "Premium Handkerchief",
      price: 15.99,
      image: "/api/placeholder/300/300",
      category: "Accessories"
    },
    {
      id: 3,
      name: "Cozy Socks",
      price: 12.99,
      image: "/api/placeholder/300/300",
      category: "Socks"
    },
    {
      id: 4,
      name: "Winter Gloves",
      price: 24.99,
      image: "/api/placeholder/300/300",
      category: "Gloves"
    }
  ];

  return (
    <div className="min-h-screen">
      <style jsx>{`
        .glow-effect {
          box-shadow: 0 0 20px rgba(123, 97, 255, 0.2), 0 0 40px rgba(240, 112, 155, 0.1);
          animation: glow 3s ease-in-out infinite alternate;
        }
        @media (prefers-color-scheme: dark) {
          .glow-effect {
            box-shadow: 0 0 20px rgba(123, 97, 255, 0.3), 0 0 40px rgba(240, 112, 155, 0.2);
          }
        }
        @keyframes glow {
          from {
            box-shadow: 0 0 10px rgba(123, 97, 255, 0.2), 0 0 20px rgba(240, 112, 155, 0.1);
          }
          to {
            box-shadow: 0 0 30px rgba(123, 97, 255, 0.3), 0 0 60px rgba(240, 112, 155, 0.2);
          }
        }
      `}</style>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-50 via-white to-soul-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="float-element absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-ink-400 to-soul-400 rounded-full opacity-20 blur-xl"></div>
          <div className="float-element absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-soul-400 to-ink-400 rounded-full opacity-20 blur-xl"></div>
          <div className="float-element absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-ink-500 to-soul-500 rounded-full opacity-30 blur-lg"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center lg:text-left lg:w-1/2 mb-12 lg:mb-0">
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-ink-600 via-purple-600 to-soul-600 bg-clip-text text-transparent">
                InkSoul
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Express your unique style with our premium collection of printed apparel and accessories.
              Where creativity meets comfort.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/products"
                className="btn-primary text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Video Section */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div ref={videoRef} className="relative w-full max-w-lg">
              <div ref={glowRef} className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-r from-ink-600 to-soul-600 rounded-2xl opacity-20 blur-xl"></div>
              <div className="relative bg-white/5 dark:bg-gray-800/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 dark:border-gray-700/10 shadow-ink-500/10 dark:shadow-soul-500/10 glow-effect">
                <div className="absolute inset-0 bg-gradient-to-br from-ink-500/3 to-soul-500/3"></div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover opacity-90 relative z-10"
                >
                  <source src="https://cdn.prod.website-files.com/65f6776adcbc7d17dbd30416%2F68281335d591a236c7c0fd24_walkingtshirtv3-transcode.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose InkSoul?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to delivering exceptional quality and service in every product we create.
            </p>
          </div>

          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most popular items, carefully selected for their quality and style.
            </p>
          </div>

          <div
            ref={productsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-ink-600 dark:text-ink-400 font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-ink-600 dark:text-ink-400">
                      ${product.price}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-gradient-to-r from-ink-600 to-soul-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-ink-600 to-soul-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-ink-100 mb-8">
            Get the latest updates on new products, exclusive offers, and style tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/20 text-gray-900"
            />
            <button className="bg-white text-ink-600 font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;