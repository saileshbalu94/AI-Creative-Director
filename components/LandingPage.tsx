import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import TargetIcon from './icons/TargetIcon';
import BoltIcon from './icons/BoltIcon';
import QualityIcon from './icons/QualityIcon';

interface LandingPageProps {
  onStart: () => void;
}

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-DEFAULT text-white">
      {icon}
    </div>
    <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; }> = ({ quote, name, title }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="text-gray-600 italic">"{quote}"</p>
    <div className="mt-4">
      <p className="font-semibold text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            AI Creative Director
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
            Turn your product photos into professional, high-converting ad creatives in minutes, not weeks.
          </p>
          <div className="mt-10">
            <button
              onClick={onStart}
              className="px-8 py-4 text-white bg-primary-hover text-lg font-semibold rounded-lg shadow-lg hover:bg-primary-hover transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75"
            >
              Start Creating for Free
            </button>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Stop the Creative Bottleneck</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Traditional ad creative production is a major drag on marketing agility and budgets.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">High Costs</h3>
              <p className="mt-2 text-gray-600">Teams spend <span className="font-semibold">$50k-$100k annually</span> on agencies or in-house designers.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">Long Lead Times</h3>
              <p className="mt-2 text-gray-600">Campaigns are delayed by <span className="font-semibold">2-3 week turnarounds</span> for a single creative set.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">Limited A/B Testing</h3>
              <p className="mt-2 text-gray-600">The high cost and slow speed prevent rapid experimentation and optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
             <h2 className="text-3xl font-extrabold text-gray-900">Your On-Demand Creative Partner</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              AI Creative Director empowers you to generate professional ad creatives instantly, freeing up your team to focus on strategy.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              <Feature icon={<BoltIcon className="w-6 h-6" />} title="Generate in Minutes" description="Go from product photo to campaign-ready ad in less time than a coffee break." />
              <Feature icon={<QualityIcon className="w-6 h-6" />} title="Professional Quality" description="Leverage advanced AI to produce visually stunning, high-resolution ad images." />
              <Feature icon={<TargetIcon className="w-6 h-6" />} title="Multi-Platform" description="Get perfectly sized creatives for Instagram, Facebook, TikTok, and more." />
              <Feature icon={<SparklesIcon className="w-6 h-6" />} title="AI Art Direction" description="Explore dozens of creative concepts without needing specialized design skills." />
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700">Image generation is live. <span className="font-semibold text-primary-DEFAULT">Video generation is coming soon!</span></p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Trusted by Modern Marketing Teams</h2>
             <p className="mt-4 text-sm text-gray-500">(Testimonials are for demonstration purposes only)</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This tool has been a game-changer. We've cut our creative production time by 90% and can finally test all the angles we want."
              name="Sarah J."
              title="Head of Growth, E-commerce Brand"
            />
            <TestimonialCard
              quote="I'm not a designer, but with AI Creative Director, I can produce ads that look like they came from a top-tier agency. Incredible."
              name="Mike R."
              title="Founder, SaaS Startup"
            />
            <TestimonialCard
              quote="The quality is consistently impressive. It understands our brand and delivers on-point creatives every single time. We've saved thousands."
              name="Emily T."
              title="Marketing Manager, CPG Company"
            />
          </div>
        </div>
      </section>

      {/* Final CTA & Disclaimer */}
      <footer className="bg-gray-800 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
           <h2 className="text-2xl font-bold text-white">Ready to Revolutionize Your Ad Creative?</h2>
           <div className="mt-6">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-primary-DEFAULT text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-primary-hover transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75"
            >
              Start Creating Now
            </button>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-700">
             <p className="text-xs">
                Disclaimer: Users are solely responsible for the creatives generated. Please ensure you have the rights to use all assets and that the final output complies with all applicable copyright and trademark laws.
             </p>
             <p className="mt-4 text-sm text-gray-500">&copy; 2024 AI Creative Director. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
