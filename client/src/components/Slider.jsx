import React, { useState } from 'react';

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    <div className="p-4 bg-blue-700">
      <h2 className="text-2xl font-bold">Envy</h2>
      <h3 className="text-xl mt-2">How to handle envy</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Recognize your envy</li>
        <li>Don't compare yourself</li>
        <li>Value what you have</li>
        <li>Be happy for others</li>
        <li>Work for yourself, not for others</li>
      </ul>
    </div>,
    <div className="p-4 bg-green-700">
      <h2 className="text-2xl font-bold">Displeasure</h2>
      <h3 className="text-xl mt-2">How to handle displeasure</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Reflecting on what causes displeasure helps to understand the situation</li>
        <li>Displeasure protects against risks and toxic bonds</li>
        <li>It allows you to set limits and say no.</li>
      </ul>
    </div>,
    <div className="p-4 bg-red-300">
      <h2 className="text-2xl font-bold">Shame</h2>
      <h3 className="text-xl mt-2">How to handle shame</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Downplay it; it's a natural emotion.</li>
        <li>Don't let the opinion of others affect you</li>
        <li>Have confidence in yourself</li>
      </ul>
    </div>,
    <div className="p-4 bg-blue-600">
      <h2 className="text-2xl font-bold">Sadness</h2>
      <h3 className="text-xl mt-2">How to handle sadness</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Accept what is happening; it is okay not to feel okay.</li>
        <li>Prioritize taking care of yourself and be aware of your feelings</li>
        <li>Stay in touch with others and seek professional help if necessary.</li>
      </ul>
    </div>,
    <div className="p-4 bg-blue-900">
      <h2 className="text-2xl font-bold">Boredom</h2>
      <h3 className="text-xl mt-2">How to handle boredom</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Redecorate the house, read a book, create a mini garden</li>
        <li>Exercising at home, trying new recipes, learning a language or instrument</li>
        <li>Helping the community, spending time with family, having coffee with friends, doing crafts</li>
      </ul>
    </div>,
    <div className="p-4 bg-red-700">
      <h2 className="text-2xl font-bold">Anger</h2>
      <h3 className="text-xl mt-2">How to handle anger</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Think before you speak</li>
        <li>Express your discomfort once calmed down</li>
        <li>Do exercise</li>
      </ul>
    </div>,
    <div className="p-4 bg-yellow-400">
      <h2 className="text-2xl font-bold">Happiness</h2>
      <h3 className="text-xl mt-2">How to be happier</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Work on what you like</li>
        <li>Become an emotionally intelligent person</li>
        <li>Surround yourself with people with optimism and positive mindset</li>
      </ul>
    </div>,
    <div className="p-4 bg-purple-600">
      <h2 className="text-2xl font-bold">Fear</h2>
      <h3 className="text-xl mt-2">How to face fears and insecurities</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Focus on your breathing and relax</li>
        <li>Practice mindfulness</li>
        <li>Use imagination positively</li>
        <li>Live outside your comfort zone</li>
      </ul>
    </div>,
    <div className="p-4 bg-yellow-700">
      <h2 className="text-2xl font-bold">Anxiety</h2>
      <h3 className="text-xl mt-2">How to handle anxiety</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Take slow, deep breaths</li>
        <li>Take a warm immersion bath</li>
        <li>Listen to relaxing music</li>
      </ul>
    </div>,
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-xl bg-gradient-to-tr from-gray-300/30 to-gray-500/30 backdrop-blur-lg pt-10">
  {/* Title */}
  <h1 className="absolute top-6 left-0 w-full text-center text-white text-4xl font-bold drop-shadow-lg">
    Management of Emotions
  </h1>
    



      {/* Slide Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 flex items-center justify-center p-6"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg z-20 transition duration-300 ease-in-out"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg z-20 transition duration-300 ease-in-out"
      >
        &gt;
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 w-full flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition transform ${
              currentSlide === index
                ? 'bg-white scale-125 shadow-md'
                : 'bg-gray-500 hover:scale-110'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
    </div>
  );
}

export default Slider;