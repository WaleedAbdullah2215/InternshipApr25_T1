import React, { useState, useEffect, memo } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [ageData, setAgeData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [liveAge, setLiveAge] = useState(null);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [currentZodiac, setCurrentZodiac] = useState(null);

  // Dynamic title update
  useEffect(() => {
    const titles = {
      welcome: 'Weedoo Age Calculator | Home',
      calculator: 'Weedoo Age Calculator | Calculate Your Age',
      results: 'Weedoo Age Calculator | Your Life Stats',
      zodiac: `Weedoo Age Calculator | ${currentZodiac?.name || 'Zodiac'} Details`,
      about: 'Weedoo Age Calculator | About Us',
    };
    document.title = titles[currentPage] || 'Weedoo Age Calculator';
  }, [currentPage, currentZodiac]);

  // Initialize particles.js
  useEffect(() => {
    if (window.particlesJS && currentPage === 'about') {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: false },
          move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' },
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
          modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
        },
      });
    }
  }, [currentPage]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' }, { value: 4, name: 'April' },
    { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' },
    { value: 9, name: 'September' }, { value: 10, name: 'October' },
    { value: 11, name: 'November' }, { value: 12, name: 'December' }
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  const zodiacDetails = {
    Aquarius: {
      traits: "Progressive, original, independent, humanitarian",
      dates: "Jan 20 - Feb 18",
      element: "Air",
      ruler: "Uranus",
      description: "Aquarius-born are shy and quiet, but on the other hand they can be eccentric and energetic. They are deep thinkers and highly intellectual people who love helping others.",
      compatibility: "Leo, Sagittarius",
      strengths: "Progressive, original, independent, humanitarian",
      weaknesses: "Runs from emotional expression, temperamental, uncompromising, aloof"
    },
    Pisces: {
      traits: "Compassionate, artistic, intuitive, gentle",
      dates: "Feb 19 - Mar 20",
      element: "Water",
      ruler: "Neptune",
      description: "Pisces are very friendly and often find themselves in company of very different people. They are selfless and always willing to help others.",
      compatibility: "Virgo, Taurus",
      strengths: "Compassionate, artistic, intuitive, gentle, wise, musical",
      weaknesses: "Fearful, overly trusting, sad, desire to escape reality"
    },
    Aries: {
      traits: "Courageous, determined, confident, enthusiastic",
      dates: "Mar 21 - Apr 19",
      element: "Fire",
      ruler: "Mars",
      description: "Aries are passionate and motivated leaders who are not afraid of challenges.",
      compatibility: "Libra, Leo",
      strengths: "Courageous, determined, confident, enthusiastic, optimistic, honest",
      weaknesses: "Impatient, moody, short-tempered, impulsive, aggressive"
    },
    Taurus: {
      traits: "Reliable, patient, practical, devoted",
      dates: "Apr 20 - May 20",
      element: "Earth",
      ruler: "Venus",
      description: "Taurus is practical and well-grounded, they enjoy the pleasures of material world.",
      compatibility: "Scorpio, Cancer",
      strengths: "Reliable, patient, practical, devoted, responsible, stable",
      weaknesses: "Stubborn, possessive, uncompromising"
    },
    Gemini: {
      traits: "Gentle, affectionate, curious, adaptable",
      dates: "May 21 - Jun 20",
      element: "Air",
      ruler: "Mercury",
      description: "Gemini-born are able to express themselves clearly and are often very witty.",
      compatibility: "Sagittarius, Aquarius",
      strengths: "Gentle, affectionate, curious, adaptable, ability to learn quickly",
      weaknesses: "Nervous, inconsistent, indecisive"
    },
    Cancer: {
      traits: "Tenacious, highly imaginative, loyal, emotional",
      dates: "Jun 21 - Jul 22",
      element: "Water",
      ruler: "Moon",
      description: "Deeply intuitive and sentimental, Cancer can be one of the most challenging zodiac signs to get to know.",
      compatibility: "Capricorn, Taurus",
      strengths: "Tenacious, highly imaginative, loyal, emotional, sympathetic, persuasive",
      weaknesses: "Moody, pessimistic, suspicious, manipulative"
    },
    Leo: {
      traits: "Creative, passionate, generous, warm-hearted",
      dates: "Jul 23 - Aug 22",
      element: "Fire",
      ruler: "Sun",
      description: "Leos are natural born leaders with dramatic, passionate personalities.",
      compatibility: "Aquarius, Gemini",
      strengths: "Creative, passionate, generous, warm-hearted, cheerful, humorous",
      weaknesses: "Arrogant, stubborn, self-centered, lazy, inflexible"
    },
    Virgo: {
      traits: "Loyal, analytical, kind, hardworking",
      dates: "Aug 23 - Sep 22",
      element: "Earth",
      ruler: "Mercury",
      description: "Virgos are always paying attention to smallest details and their deep sense of humanity makes them one of the most careful signs.",
      compatibility: "Pisces, Cancer",
      strengths: "Loyal, analytical, kind, hardworking, practical",
      weaknesses: "Shyness, worry, overly critical of self and others"
    },
    Libra: {
      traits: "Cooperative, diplomatic, gracious, fair-minded",
      dates: "Sep 23 - Oct 22",
      element: "Air",
      ruler: "Venus",
      description: "People born under the sign of Libra are peaceful and fair, and they hate being alone.",
      compatibility: "Aries, Sagittarius",
      strengths: "Cooperative, diplomatic, gracious, fair-minded, social",
      weaknesses: "Indecisive, avoids confrontations, will carry a grudge"
    },
    Scorpio: {
      traits: "Resourceful, brave, passionate, stubborn",
      dates: "Oct 23 - Nov 21",
      element: "Water",
      ruler: "Pluto",
      description: "Scorpio-born are passionate and assertive with determination and focus.",
      compatibility: "Taurus, Cancer",
      strengths: "Resourceful, brave, passionate, stubborn, a true friend",
      weaknesses: "Distrusting, jealous, secretive, violent"
    },
    Sagittarius: {
      traits: "Generous, idealistic, great sense of humor",
      dates: "Nov 22 - Dec 21",
      element: "Fire",
      ruler: "Jupiter",
      description: "Curious and energetic, Sagittarius is one of the biggest travelers among all zodiac signs.",
      compatibility: "Gemini, Aries",
      strengths: "Generous, idealistic, great sense of humor",
      weaknesses: "Promises more than can deliver, very impatient, will say anything"
    },
    Capricorn: {
      traits: "Responsible, disciplined, self-control, good managers",
      dates: "Dec 22 - Jan 19",
      element: "Earth",
      ruler: "Saturn",
      description: "Capricorn is practical and considered to be the most serious sign who possess an independence that enables significant progress.",
      compatibility: "Taurus, Cancer",
      strengths: "Responsible, disciplined, self-control, good managers",
      weaknesses: "Know-it-all, unforgiving, condescending, expecting the worst"
    }
  };

  const validateDate = (day, month, year) => {
    if (!day || !month || !year) return 'All fields are required';
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (y < 1900 || y > currentYear) return 'Year must be between 1900 and ' + currentYear;
    if (m < 1 || m > 12) return 'Invalid month';
    if (d < 1 || d > 31) return 'Invalid day';
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) {
      return 'Invalid date';
    }
    if (date > new Date()) return 'Date cannot be in the future';
    return '';
  };

  const calculateDetailedAge = (birthDate, currentDate) => {
    const diff = currentDate - birthDate;
    
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);
    const totalWeeks = Math.floor(totalDays / 7);
    
    let nextBirthday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < currentDate) {
      nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));
    
    const zodiacSigns = [
      { name: 'Aquarius', start: [1, 20], end: [2, 18], emoji: '♒' },
      { name: 'Pisces', start: [2, 19], end: [3, 20], emoji: '♓' },
      { name: 'Aries', start: [3, 21], end: [4, 19], emoji: '♈' },
      { name: 'Taurus', start: [4, 20], end: [5, 20], emoji: '♉' },
      { name: 'Gemini', start: [5, 21], end: [6, 20], emoji: '♊' },
      { name: 'Cancer', start: [6, 21], end: [7, 22], emoji: '♋' },
      { name: 'Leo', start: [7, 23], end: [8, 22], emoji: '♌' },
      { name: 'Virgo', start: [8, 23], end: [9, 22], emoji: '♍' },
      { name: 'Libra', start: [9, 23], end: [10, 22], emoji: '♎' },
      { name: 'Scorpio', start: [10, 23], end: [11, 21], emoji: '♏' },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21], emoji: '♐' },
      { name: 'Capricorn', start: [12, 22], end: [1, 19], emoji: '♑' }
    ];
    
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const zodiac = zodiacSigns.find(sign => {
      if (sign.start[0] === sign.end[0]) {
        return month === sign.start[0] && day >= sign.start[1] && day <= sign.end[1];
      } else if (sign.start[0] === 12 && sign.end[0] === 1) {
        return (month === 12 && day >= sign.start[1]) || (month === 1 && day <= sign.end[1]);
      } else {
        return (month === sign.start[0] && day >= sign.start[1]) || (month === sign.end[0] && day <= sign.end[1]);
      }
    });
    
    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      zodiac: zodiac || { name: 'Unknown', emoji: '🌟' },
      heartBeats: Math.floor(totalSeconds * 1.2)
    };
  };

  const handleCalculate = async () => {
    const validationError = validateDate(dob.day, dob.month, dob.year);
    if (validationError) {
      setError(validationError);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    
    setError('');
    setIsCalculating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const birthDate = new Date(dob.year, dob.month - 1, dob.day);
      const now = new Date();
      const calculated = calculateDetailedAge(birthDate, now);
      setAgeData(calculated);
      setLiveAge(calculated);
      setCurrentPage('results');
    } catch (err) {
      console.error('Calculation error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const WelcomePage = () => (
    <div className="welcome-page">
      <div className="floating-stars">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}>
            ⭐
          </div>
        ))}
      </div>
      
      <div className="welcome-content">
        <div className="welcome-icon">📅</div>
        <h1 className="welcome-title">
          Weedoo<span className="title-accent"> Age Calculator</span>
        </h1>
        <p className="welcome-subtitle">Find all about yourself based on your date of birth</p>
        
        <div className="welcome-buttons">
          <button onClick={() => setCurrentPage('calculator')} className="btn-primary">
            Let's Start Calculatinggg ➤
          </button>
          <button onClick={() => setCurrentPage('about')} className="btn-secondary">
            Get to know uss better
          </button>
        </div>
      </div>
    </div>
  );

  const CalculatorPage = () => (
    <div className="calculator-page">
      <nav className="page-nav">
        <h2 className="nav-title">🧮 Age Calculator</h2>
        <div className="nav-buttons">
          <button onClick={() => setCurrentPage('welcome')} className="nav-btn" aria-label="Back to Home">🏠</button>
        </div>
      </nav>

      <div className="calculator-container">
        <div className={`calculator-card ${isShaking ? 'shake' : ''}`}>
          <div className="card-header">
            <div className="header-icon">💖</div>
            <h3 className="card-title">Choose Your Date of Birth</h3>
            <p className="card-subtitle">Let's calculate what a journey you've had so far!!</p>
          </div>

          <div className="input-section">
            <div className="date-input-group">
              <select
                value={dob.day}
                onChange={(e) => setDob({ ...dob, day: e.target.value })}
                className="date-input-enhanced"
                aria-label="Day"
              >
                <option value="">Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={dob.month}
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
                className="date-input-enhanced"
                aria-label="Month"
              >
                <option value="">Month</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.name}</option>
                ))}
              </select>
              <select
                value={dob.year}
                onChange={(e) => setDob({ ...dob, year: e.target.value })}
                className="date-input-enhanced"
                aria-label="Year"
              >
                <option value="">Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button
              onClick={handleCalculate}
              disabled={!dob.day || !dob.month || !dob.year || isCalculating}
              className={`calc-button-enhanced ${(!dob.day || !dob.month || !dob.year || isCalculating) ? 'disabled' : ''}`}
            >
              {isCalculating ? (
                <span>
                  <span className="spinner"></span>
                  Calculating...
                </span>
              ) : (
                <span>✨ Calculate My Age</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ZodiacInfo = () => {
    if (!currentZodiac) return null;
    const details = zodiacDetails[currentZodiac.name];

    return (
      <div className="zodiac-info-page">
        <nav className="page-nav">
          <h2 className="nav-title">🌟 {currentZodiac.name} Details</h2>
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage('results')} className="nav-btn" aria-label="Back to Results">← Back</button>
          </div>
        </nav>

        <div className="zodiac-container">
          <div className="zodiac-card">
            <div className="zodiac-header">
              <div className="zodiac-emoji">{currentZodiac.emoji}</div>
              <h2 className="zodiac-title">{currentZodiac.name}</h2>
              <p className="zodiac-dates">{details.dates}</p>
            </div>

            <div className="zodiac-content">
              <div className="zodiac-section">
                <h3>Personality Traits</h3>
                <p>{details.traits}</p>
              </div>
              <div className="zodiac-section">
                <h3>Element</h3>
                <p>{details.element}</p>
              </div>
              <div className="zodiac-section">
                <h3>Ruling Planet</h3>
                <p>{details.ruler}</p>
              </div>
              <div className="zodiac-section">
                <h3>Compatibility</h3>
                <p>{details.compatibility}</p>
              </div>
              <div className="zodiac-section">
                <h3>Description</h3>
                <p>{details.description}</p>
              </div>
              <div className="zodiac-section">
                <h3>Strengths</h3>
                <p>{details.strengths}</p>
              </div>
              <div className="zodiac-section">
                <h3>Weaknesses</h3>
                <p>{details.weaknesses}</p>
              </div>
            </div>

            <div className="zodiac-cta">
              <button onClick={() => setCurrentPage('results')} className="btn-primary">
                Back to Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResultsPage = memo(() => {
    if (!ageData) return null;
    const handleZodiacClick = () => {
      setCurrentZodiac(ageData.zodiac);
      setCurrentPage('zodiac');
    };

    return (
      <div className="results-page">
        <nav className="page-nav">
          <h2 className="nav-title">🏆 Your Life Stats</h2>
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage('calculator')} className="nav-btn" aria-label="Back to Calculator">🧮</button>
            <button onClick={() => setCurrentPage('welcome')} className="nav-btn" aria-label="Back to Home">🏠</button>
          </div>
        </nav>

        <div className="results-container">
          <div className="main-age-card">
            <div className="zodiac-display" onClick={handleZodiacClick} style={{ cursor: 'pointer' }}>
              {ageData.zodiac.emoji}
            </div>
            <h3 className="main-age-text">
              You are {liveAge?.years || ageData.years} years, {liveAge?.months || ageData.months} months, and {liveAge?.days || ageData.days} days old!
            </h3>
            <p className="zodiac-text" onClick={handleZodiacClick} style={{ cursor: 'pointer' }}>
              Your Zodiac Sign isss {ageData.zodiac.name} (Click to learn more)
            </p>
          </div>

          <div className="stats-grid">
            {[
              { label: 'Total Days Lived', value: (liveAge?.totalDays || ageData.totalDays).toLocaleString(), icon: '📅', gradient: 'pink-red' },
              { label: 'Total Weeks Lived', value: (liveAge?.totalWeeks || ageData.totalWeeks).toLocaleString(), icon: '📊', gradient: 'purple-indigo' },
              { label: 'Total Hours Lived', value: (liveAge?.totalHours || ageData.totalHours).toLocaleString(), icon: '⏰', gradient: 'blue-cyan' },
              { label: 'Total Minutes Lived', value: (liveAge?.totalMinutes || ageData.totalMinutes).toLocaleString(), icon: '⏱️', gradient: 'green-teal' },
              { label: 'Total Seconds Lived', value: (liveAge?.totalSeconds || ageData.totalSeconds).toLocaleString(), icon: '⚡', gradient: 'yellow-orange' },
              { label: 'Days Until Next Birthday', value: liveAge?.daysToNextBirthday || ageData.daysToNextBirthday, icon: '🎂', gradient: 'pink-purple' }
            ].map((stat, index) => (
              <div key={index} className={`stat-card ${stat.gradient}`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="fun-facts-card">
            <h3 className="facts-title">✨ Amazing Facts About Your Life</h3>
            <div className="facts-grid">
              <div className="facts-column">
                <div className="fact-item">
                  <span className="fact-emoji">💖</span>
                  <span>Your heart has beaten approximately {(liveAge?.heartBeats || ageData.heartBeats).toLocaleString()} times!</span>
                </div>
                <div className="fact-item">
                  <span className="fact-emoji">🌙</span>
                  <span>You've seen about {Math.floor((liveAge?.totalDays || ageData.totalDays) / 29.5)} full moons</span>
                </div>
                <div className="fact-item">
                  <span className="fact-emoji">🌍</span>
                  <span>Earth has orbited the sun {liveAge?.years || ageData.years} times since you were born</span>
                </div>
              </div>
              <div className="facts-column">
                <div className="fact-item">
                  <span className="fact-emoji">😴</span>
                  <span>You've probably slept for about {Math.floor((liveAge?.totalHours || ageData.totalHours) / 3)} hours</span>
                </div>
                <div className="fact-item">
                  <span className="fact-emoji">🎈</span>
                  <span>You've celebrated {liveAge?.years || ageData.years} birthdays!</span>
                </div>
                <div className="fact-item">
                  <span className="fact-emoji">⭐</span>
                  <span>You're absolutely unique among 8 billion people!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const AboutPage = ({ setCurrentPage }) => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
      const selectedRating = index + 1;
      setRating(selectedRating);
    };

    // Initialize Vanilla Tilt
    useEffect(() => {
      if (window.VanillaTilt) {
        window.VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
          max: 15,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
        });
      }
    }, []);

    return (
      <div className="about-page">
        <div id="particles-js" className="particles-background"></div>

        <nav className="page-nav">
          <h2 className="nav-title">ℹ️ About Weedoo</h2>
          <div className="nav-buttons">
            <button 
              onClick={() => setCurrentPage('welcome')} 
              className="nav-btn"
              aria-label="Back to Home"
            >
              🏠
            </button>
          </div>
        </nav>

        <div className="about-container">
          <div className="about-content-wrapper">
            <div className="about-card" data-tilt>
              <div className="about-header">
                <div className="about-emoji">🚀</div>
                <h3 className="about-title">Your Ultimate Perfect Age Calculator</h3>
                <p className="about-subtitle">Discover the magic of time, how much of it you've spent, and celebrate every moment!</p>
              </div>

              <div className="about-content">
                <div className="about-section">
                  <h4 className="section-title">✨ Features</h4>
                  <ul className="feature-list">
                    <li>Very accurate age calculation even to seconds</li>
                    <li>Visually appealing interface to keep you engaged</li>
                    <li>Realistic and precise detailed data</li>
                    <li>Zodiac sign detection with detailed insights</li>
                    <li>Fun and friendly life statistics</li>
                    <li>A counter to show the remaining days until your next birthday</li>
                    <li>Also know the number of heartbeats you've had until now</li>
                    <li>Mobile and web responsive design</li>
                  </ul>
                </div>
                <div className="about-section">
                  <h4 className="section-title">🎯 Why Weedoo?</h4>
                  <ul className="feature-list">
                    <li>Most accurate calculations</li>
                    <li>Stunning visual experience</li>
                    <li>Privacy-focused to ensure your data is safe and secure</li>
                    <li>Lightning-fast performance to not keep you waiting</li>
                    <li>Regular updates and improvements</li>
                    <li>Works on all types of devices</li>
                    <li>Free forever</li>
                    <li>Made with ❤️</li>
                  </ul>
                </div>
              </div>

              <div className="about-cta">
                <button 
                  onClick={() => setCurrentPage('calculator')} 
                  className="btn-primary"
                >
                  Less go try it out
                </button>
              </div>
            </div>

            <div className="feedback-contact-card" data-tilt>
              <div className="feedback-section">
                <h3 className="feedback-title">💬 Share Your Feedback</h3>
                <p className="feedback-subtitle">Your thoughts help us make Weedoo even better!</p>
                <form
                  className="feedback-form"
                  action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSe0JJWLVdB8WgH8PgrIbznVxBdGJDKpL7imI7T6I5a1cKExLg/formResponse"
                  method="POST"
                  target="_blank"
                >
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="entry.1772819317"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="entry.255317799"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <div className="star-rating" role="radiogroup" aria-label="Rating">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < rating ? 'selected' : ''}`}
                          onClick={() => handleStarClick(i)}
                          style={{ cursor: 'pointer' }}
                          aria-label={`Rate ${i + 1} star${i + 1 === 1 ? '' : 's'}`}
                          data-testid={`star-${i}`}
                        ></i>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      name="entry.1065525991"
                      value={rating || 0}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedback">Feedback/Suggestions</label>
                    <textarea
                      id="feedback"
                      name="entry.399780919"
                      placeholder="Tell us what you think..."
                      rows="7"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary feedback-submit">
                    Submit Feedback
                  </button>
                </form>
              </div>

              <div className="gradient-divider"></div>

              <div className="contact-section">
                <div className="contact-header">
                  <div className="contact-emoji">🌟</div>
                  <h3 className="contact-title">Get in Touch</h3>
                  <p className="contact-bio">Hi, I'm Waleed! Passionate about creating magical web experiences. Reach out to collaborate or share ideas!</p>
                </div>
                <ul className="contact-list">
                  <li>
                    <a href="mailto:waleedabdullah2004@gmail.com" className="contact-link">
                      <i className="fas fa-envelope"></i> waleedabdullah2004@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/in/waleedabdullah2004" target="_blank" rel="noopener noreferrer" className="contact-link">
                      <i className="fab fa-linkedin"></i> linkedin.com/in/waleedabdullah2004
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/+971501951041" target="_blank" rel="noopener noreferrer" className="contact-link">
                      <i className="fab fa-whatsapp"></i> +971-50-1951-041
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/WaleedAbdullah2215" target="_blank" rel="noopener noreferrer" className="contact-link">
                      <i className="fab fa-github"></i> github.com/WaleedAbdullah2215
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/walled._.up" target="_blank" rel="noopener noreferrer" className="contact-link">
                      <i className="fab fa-instagram"></i> instagram.com/walled._.up
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {currentPage === 'welcome' && <WelcomePage />}
      {currentPage === 'calculator' && <CalculatorPage />}
      {currentPage === 'results' && <ResultsPage />}
      {currentPage === 'zodiac' && <ZodiacInfo />}
      {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;