import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef();
  const storyRef = useRef();
  const valuesRef = useRef();
  const teamRef = useRef();

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    );

    // Scroll-triggered animations
    gsap.fromTo(storyRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(valuesRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(teamRef.current.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const values = [
    {
      icon: "🎨",
      title: "Creativity",
      description: "We believe in the power of creative expression and unique design that tells your story."
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Committed to eco-friendly practices and sustainable materials in all our products."
    },
    {
      icon: "💯",
      title: "Quality",
      description: "Premium materials and meticulous craftsmanship ensure products that last."
    },
    {
      icon: "❤️",
      title: "Community",
      description: "Building a community of individuals who value self-expression and authenticity."
    }
  ];

  const team = [
    {
      name: "Maryada Chauhan",
      role: "Founder & CEO",
      image: "/api/placeholder/300/300",
      bio: "Visionary leader passionate about creating innovative, high-quality apparel that blends style with purpose."
    },
    {
      name: "Praphul Tomer",
      role: "Logistic Head",
      image: "/api/placeholder/300/300",
      bio: "Expert in supply chain and logistics, ensuring smooth operations and timely delivery across all channels."
    },
    {
      name: "Vipul Sharma",
      role: "Sales & Networking Head",
      image: "/api/placeholder/300/300",
      bio: "Driven sales strategist focused on building strong networks and expanding market reach for sustainable growth."
    },
    {
      name: "Dushyant Yadav",
      role: "Digital Marketing Head",
      image: "/api/placeholder/300/300",
      bio: "Creative digital marketer skilled in driving brand visibility, engagement, and customer loyalty through impactful campaigns."
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ink-50 via-white to-soul-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={heroRef}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-ink-600 via-purple-600 to-soul-600 bg-clip-text text-transparent">
                About InkSoul
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Where creativity meets comfort, and every piece tells a story
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-ink-600 to-soul-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={storyRef} className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                InkSoul was born from a simple belief: that what we wear should be an extension of who we are.
                Founded in 2025, we started as a small team of artists and designers who were passionate about
                creating apparel that goes beyond fashion – pieces that carry meaning, spark conversations, and
                celebrate individuality.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Our journey began in a small studio, where we experimented with different printing techniques,
                sustainable materials, and unique designs. We wanted to create products that not only looked good
                but also felt good – both to wear and to purchase, knowing they were made responsibly.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, InkSoul has grown into a community of creative individuals who share our vision of
                self-expression through thoughtfully designed apparel. Every product we create is a canvas
                for your story, crafted with care and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The creative minds behind InkSoul
            </p>
          </div>

          <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={"https://tse2.mm.bing.net/th/id/OIP.9k6NZTQk5G6g5PVDDDeLiAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-ink-600 dark:text-ink-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made with Love */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Made with ❤️
          </h3>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-ink-600 to-soul-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the InkSoul Community
          </h2>
          <p className="text-xl text-ink-100 mb-8">
            Discover unique designs that express your individuality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-ink-600 font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-ink-600 transition-all duration-200 transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;