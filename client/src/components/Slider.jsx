import React, { useState } from 'react';
import '../styles/Slider.css';

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    <div className="slide-content card envy">
      <h2>Envy</h2>
      <h3>How to handle envy</h3>
      <ul>
        <li>Recognize your envy</li>
        <li>Don't compare yourself</li>
        <li>Value what you have</li>
        <li>Be happy for others</li>
        <li>Work for yourself, not for others</li>
      </ul>
    </div>,
    <div className="slide-content card displeasure">
      <h2>Displeasure</h2>
      <h3>How to handle displeasure</h3>
      <ul>
        <li>Reflect on what causes displeasure to understand the situation</li>
        <li>Displeasure protects against risks and toxic bonds</li>
        <li>It allows you to set limits and say no.</li>
      </ul>
    </div>,
    <div className="slide-content card shame">
      <h2>Shame</h2>
      <h3>How to handle shame</h3>
      <ul>
        <li>Downplay it; it's a natural emotion.</li>
        <li>Don't let the opinion of others affect you</li>
        <li>Have confidence in yourself</li>
      </ul>
    </div>,
    <div className="slide-content card sadness">
      <h2>Sadness</h2>
      <h3>How to handle sadness</h3>
      <ul>
        <li>Accept what is happening; it is okay not to feel okay.</li>
        <li>Prioritize taking care of yourself and be aware of your feelings</li>
        <li>Stay in touch with others and seek professional help if necessary.</li>
      </ul>
    </div>,
    <div className="slide-content card boredom">
      <h2>Boredom</h2>
      <h3>How to handle boredom</h3>
      <ul>
        <li>Redecorate the house, read a book, create a mini garden</li>
        <li>Exercising at home, trying new recipes, learning a language or instrument</li>
        <li>Helping the community, spending time with family, having coffee with friends, doing crafts</li>
      </ul>
    </div>,
    <div className="slide-content card anger">
      <h2>Anger</h2>
      <h3>How to handle anger</h3>
      <ul>
        <li>Think before you speak</li>
        <li>Express your discomfort once calmed down</li>
        <li>Do exercise</li>
      </ul>
    </div>,
    <div className="slide-content card happiness">
      <h2>Happiness</h2>
      <h3>How to be happier</h3>
      <ul>
        <li>Work on what you like</li>
        <li>Become an emotionally intelligent person</li>
        <li>Surround yourself with optimistic people</li>
      </ul>
    </div>,
    <div className="slide-content card fear">
      <h2>Fear</h2>
      <h3>How to face fears and insecurities</h3>
      <ul>
        <li>Focus on your breathing and relax</li>
        <li>Practice mindfulness</li>
        <li>Use imagination positively</li>
        <li>Live outside your comfort zone</li>
      </ul>
    </div>,
    <div className="slide-content card anxiety">
      <h2>Anxiety</h2>
      <h3>How to handle anxiety</h3>
      <ul>
        <li>Take slow, deep breaths</li>
        <li>Take a warm immersion bath</li>
        <li>Listen to relaxing music</li>
      </ul>
    </div>,
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container">
      <div className="slide-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">{slide}</div>
        ))}
      </div>
      <button className="nav-button left" onClick={handlePrev}>&lt;</button>
      <button className="nav-button right" onClick={handleNext}>&gt;</button>
      <div className="pagination">
        {slides.map((_, index) => (
          <div key={index} className={`dot ${currentSlide === index ? 'active' : ''}`} onClick={() => setCurrentSlide(index)} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
