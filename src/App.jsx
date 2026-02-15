import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false);
    const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      number: '01',
      title: 'Instant Payouts',
      description: 'Receive your earnings immediately with zero waiting periods. Direct deposit to your account within seconds.'
    },
    {
      number: '02',
      title: 'Custom Alerts',
      description: 'Design sophisticated on-stream alerts that seamlessly integrate with your brand and engage your audience.'
    },
    {
      number: '03',
      title: 'Bank-Grade Security',
      description: 'Enterprise-level encryption and fraud protection ensure your earnings are always protected.'
    },
    {
      number: '04',
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your earnings, supporter behavior, and content performance metrics.'
    },
    {
      number: '05',
      title: 'Universal Integration',
      description: 'Works seamlessly across all major platforms. One elegant solution for your entire streaming ecosystem.'
    },
    {
      number: '06',
      title: 'Smart Automation',
      description: 'Intelligent chat integration and automated supporter engagement to build stronger communities.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Creators' },
    { number: '$12M', label: 'Processed Monthly' },
    { number: '2.4M', label: 'Supporters' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
       <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-semibold tracking-tight cursor-pointer">
          ProTip
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm text-white/70">
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 text-sm border border-white/10 rounded-md hover:bg-white/5 transition">
            Login
          </button>
          <button className="px-5 py-2 text-sm bg-white text-black rounded-md font-medium hover:shadow-lg hover:shadow-white/20 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h18M4 13h18M4 20h18" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 px-6 py-6 space-y-4 bg-black">
          <a className="block text-white/80 hover:text-white">Features</a>
          <a className="block text-white/80 hover:text-white">Pricing</a>
          <a className="block text-white/80 hover:text-white">Contact</a>

          <div className="pt-4 flex flex-col gap-3">
            <button className="py-2 border border-white/10 rounded-md">
              Login
            </button>
            <button className="py-2 bg-white text-black rounded-md font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-36 lg:py-44 text-center relative">
          <h1 
            className={`text-5xl lg:text-8xl font-semibold tracking-tighter mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Premium monetization
            <br />
            for modern creators
          </h1>
          
          <p 
            className={`text-lg lg:text-xl text-white/60 max-w-xl mx-auto mb-12 tracking-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Accept tips from your viewers in real-time. Simple, secure, and built for livestreamers who demand excellence.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button className="px-12 py-5 bg-white text-black rounded-md hover:shadow-2xl hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-300 text-base font-medium tracking-tight">
              Get Started
            </button>
            <button className="px-12 py-5 border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 text-base font-medium tracking-tight">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tighter mb-5">
              Built for professionals
            </h2>
            <p className="text-lg text-white/50 tracking-tight">
              Everything you need to monetize your content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black p-12 lg:p-16 group hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-sm text-white/40 mb-8 font-medium tracking-wider">
                    {feature.number}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm lg:text-base tracking-tight">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="border-t border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tighter mb-5">
              Trusted worldwide
            </h2>
            <p className="text-lg text-white/50 tracking-tight">
              The platform of choice for leading creators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-10 lg:p-12 border border-white/5 rounded-sm hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="text-5xl lg:text-6xl font-semibold tracking-tighter mb-3">
                  {stat.number}
                </div>
                <div className="text-sm text-white/40 tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="border-t border-white/5 py-44 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center relative">
          <h2 className="text-4xl lg:text-6xl font-semibold tracking-tighter mb-8">
            Start earning today
          </h2>
          <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-12 tracking-tight">
            Join thousands of creators who are monetizing their passion with the most sophisticated platform available.
          </p>
          <button className="px-12 py-5 bg-white text-black rounded-md hover:shadow-2xl hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-300 text-base font-medium tracking-tight">
            Contact Us
          </button>
          <p className="mt-6 text-sm text-white/40 tracking-tight">
            No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <p className="text-md text-white/40 tracking-tight">
            &copy; 2026 ProTip. All rights reserved.
          </p>
          <p className="text-md text-white/40 mt-4 tracking-tight">
            <a href='privacy-policy' >Privacy Policy</a> • <a href='terms-and-conditions'> Terms of Service</a> • <a href="Contactus">Contact Us</a> • <a href='Shipping-policy'> Shipping & Delivery Policy</a> •  <a href='refund-policy'>Refund Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App
