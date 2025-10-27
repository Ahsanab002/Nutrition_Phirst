import React, { useState } from 'react';
import { Heart, Brain, Sun, Users, MessageCircle, Sparkles } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Social() {
  const [activeTab, setActiveTab] = useState('wellness');

  const wellnessTips = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Mindful Moments",
      description: "Take 5 minutes daily for meditation or deep breathing exercises to center yourself."
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Daily Sunshine",
      description: "Get outside for at least 15 minutes a day. Natural light boosts mood and energy."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Stay Connected",
      description: "Reach out to friends and family. Social connections are vital for mental wellness."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Self-Care Rituals",
      description: "Create a daily routine that nourishes your mind, body, and spirit."
    }
  ];

  const products = [
    {
      name: "Goodbye Stress",
      benefit: "Supports calm & relaxation",
      color: "from-[#c81b6a] to-[#a01554]"
    },
    {
      name: "Serene Sleep",
      benefit: "Promotes restful sleep",
      color: "from-[#c81b6a] to-[#a01554]"
    },
    {
      name: "Laser Focus",
      benefit: "Enhances mental clarity",
      color: "from-[#c81b6a] to-[#a01554]"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background via-white to-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#c81b6a] to-[#a01554] text-white py-20 px-6">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-center mb-6">
              Mental Health Awareness Month
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto opacity-95">
              This May, we're celebrating mental wellness and the power of taking care of your mind, body, and spirit.
            </p>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Our Commitment to Your Wellness
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Nutrition pHirst, we believe mental health is just as important as physical health. 
              This month, we're dedicated to breaking stigmas, sharing resources, and 
              supporting everyone on their wellness journey. Because when you feel good, 
              you can do good.
            </p>
          </div>
        </section>

        {/* Wellness Tips Grid */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center text-foreground mb-12">
              Daily Wellness Practices
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wellnessTips.map((tip, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-[#c81b6a]/5 to-[#a01554]/5 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-[#c81b6a] mb-4">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Tabs Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab('wellness')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'wellness'
                    ? 'bg-[#c81b6a] text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Wellness Tips
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'resources'
                    ? 'bg-[#c81b6a] text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Resources
              </button>
            </div>

            <div className="bg-background rounded-3xl shadow-xl p-8 md:p-12">
              {activeTab === 'wellness' && (
                <div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-6">
                    Your Mental Wellness Toolkit
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-[#c81b6a] pl-6">
                      <h4 className="text-xl font-serif font-bold text-foreground mb-2">Start Your Day Right</h4>
                      <p className="text-muted-foreground">Begin with gratitude journaling, stretching, or a nutritious breakfast to set a positive tone.</p>
                    </div>
                    <div className="border-l-4 border-[#c81b6a] pl-6">
                      <h4 className="text-xl font-serif font-bold text-foreground mb-2">Move Your Body</h4>
                      <p className="text-muted-foreground">Exercise releases endorphins. Even a 10-minute walk can boost your mood significantly.</p>
                    </div>
                    <div className="border-l-4 border-[#c81b6a] pl-6">
                      <h4 className="text-xl font-serif font-bold text-foreground mb-2">Practice Self-Compassion</h4>
                      <p className="text-muted-foreground">Be kind to yourself. Treat yourself with the same compassion you'd offer a good friend.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-6">
                    Mental Health Resources
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-[#c81b6a]/5 rounded-xl p-6">
                      <h4 className="text-xl font-serif font-bold text-foreground mb-2">National Crisis Hotline</h4>
                      <p className="text-muted-foreground mb-2">24/7 support for those in crisis</p>
                      <p className="text-2xl font-bold text-[#c81b6a]">988</p>
                    </div>
                    <div className="bg-[#c81b6a]/5 rounded-xl p-6">
                      <h4 className="text-xl font-serif font-bold text-foreground mb-2">Mental Health America</h4>
                      <p className="text-muted-foreground">Free screening tools and resources at mhanational.org</p>
                    </div>
                    <div className="bg-[#c81b6a]/5 rounded-xl p-6">
                      <h4 className="text-xl font-serif font-bold text-foreground mb-2">NAMI Support</h4>
                      <p className="text-muted-foreground">Education and support groups at nami.org</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-[#c81b6a]/5 via-background to-[#a01554]/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center text-foreground mb-4">
              Wellness Support from Nutrition pHirst
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our supplements are designed to support your mental wellness journey with quality ingredients you can trust.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {product.benefit}
                  </p>
                  <button className="bg-[#c81b6a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a01554] transition-colors">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-6 text-[#c81b6a]" />
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Join the Conversation
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Share your mental wellness journey and inspire others. Use #NutritionPHirst 
              to connect with our community and spread awareness this Mental Health Awareness Month.
            </p>
            <button className="bg-gradient-to-r from-[#c81b6a] to-[#a01554] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105">
              Share Your Story
            </button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-r from-[#c81b6a] to-[#a01554] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Your Wellness Matters
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Take the first step towards better mental health today. You deserve to feel your best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#c81b6a] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Shop Wellness Products
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#c81b6a] transition-colors">
                Explore Resources
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}