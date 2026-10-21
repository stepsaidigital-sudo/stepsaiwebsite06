'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from 'lucide-react';

import { asset } from '@/lib/asset';
type Experience = {
  id: string;
  isGold?: boolean;
  rating?: string;
  quote: string;
  authorName?: string;
  authorSubtitle?: string;
  avatar?: string;
  userCount?: string;
  userLabel?: string;
  avatars?: string[];
  verified?: boolean;
};

const experiences: Experience[] = [
  {
    id: 'gold-featured',
    isGold: true,
    rating: '4.9 Rating',
    quote:
      'Easy to deploy across all channels. Clear answers and instant support around the clock — super impressed.',
    userCount: '15k+',
    userLabel: 'Trusted Users',
    avatars: [
      asset('/photos/avatars/alex.webp'),
      asset('/photos/avatars/ananya.webp'),
      asset('/photos/avatars/priya.webp'),
    ],
  },
  {
    id: 'ugolina',
    quote:
      'I was skeptical at first, but within 3 minutes I had real automated responses resolving sizing and stock questions. Deployed coverage the same day. Total game-changer.',
    authorName: 'Ugolina Buccellato',
    authorSubtitle: 'Chicago · Operations Director',
    avatar: asset('/photos/avatars/priya.webp'),
    verified: true,
  },
  {
    id: 'pamela',
    quote:
      'The process was fast, the options were clear, and I actually understood what I was deploying. No pressure, just honest help. I’ve already recommended it to other founders.',
    authorName: 'Pamela Mollica',
    authorSubtitle: 'Phoenix · Founder & CEO',
    avatar: asset('/photos/avatars/sneha.webp'),
    verified: true,
  },
  {
    id: 'maya',
    quote:
      'The order-status questions have almost disappeared from our support queue. We still get the odd one, but it’s nowhere near what it used to be. Our specialists focus on VIPs now.',
    authorName: 'Maya Patel',
    authorSubtitle: 'London · Head of E-Commerce, North & Pine',
    avatar: asset('/photos/avatars/maya.webp'),
    verified: true,
  },
  {
    id: 'sofia',
    quote:
      'Monday mornings used to be overwhelming with weekend WhatsApp queries. Now Steps AI handles 85% of delivery and sizing questions before we even open our laptops.',
    authorName: 'Sofia Alvarez',
    authorSubtitle: 'Madrid · Customer Operations, Casa Noma',
    avatar: asset('/photos/avatars/divya.webp'),
    verified: true,
  },
  {
    id: 'jonathan',
    quote:
      'Our help center was big and customers couldn’t find answers. Now they ask normally and get exact solutions in seconds. Support ticket volume dropped 52% across the board.',
    authorName: 'Jonathan Reed',
    authorSubtitle: 'San Francisco · VP Customer Success, Stacklane',
    avatar: asset('/photos/avatars/sam.webp'),
    verified: true,
  },
  {
    id: 'anika',
    quote:
      'Shoppers who talk to the sales agent are noticeably more likely to finish checkout. It answers the questions that used to make people hesitate, especially around dimensions and materials.',
    authorName: 'Anika Rao',
    authorSubtitle: 'Bengaluru · Digital Experience, Mysa Living',
    avatar: asset('/photos/avatars/ananya.webp'),
    verified: true,
  },
  {
    id: 'ryan',
    quote:
      'Inbound leads get qualified in under two minutes. By the time our account executives join the demo, they already know the company size, tech stack, and pain points.',
    authorName: 'Ryan Collins',
    authorSubtitle: 'Austin · Head of Sales, Northstar SaaS',
    avatar: asset('/photos/avatars/rohan.webp'),
    verified: true,
  },
  {
    id: 'priya',
    quote:
      'A lot of our customers shop and message us after hours. Steps AI handles most of those questions now, so we’re not coming back every morning to a backlog. For a team of six, that’s been huge.',
    authorName: 'Priya Shah',
    authorSubtitle: 'London · Founder, Aster & Row',
    avatar: asset('/photos/avatars/kavya.webp'),
    verified: true,
  },
  {
    id: 'arjun',
    quote:
      'Size, stock, shipping, and returns were half of our daily queries. Steps AI resolves them instantly, and our support team now focuses entirely on high-value shoppers.',
    authorName: 'Arjun Mehta',
    authorSubtitle: 'Mumbai · E-commerce Manager, Nivara',
    avatar: asset('/photos/avatars/arjun.webp'),
    verified: true,
  },
  {
    id: 'rachel',
    quote:
      'Our sales team has full conversation context before every discovery call. We know company size, tech stack, and pain points before we say hello.',
    authorName: 'Rachel Morgan',
    authorSubtitle: 'New York · VP Growth, LatticeFlow Labs',
    avatar: asset('/photos/avatars/anu.webp'),
    verified: true,
  },
  {
    id: 'nina',
    quote:
      'Our Instagram inbox used to get flooded during new drops. Now questions about stock, fit, and tracking get resolved automatically in seconds.',
    authorName: 'Nina Kapoor',
    authorSubtitle: 'Berlin · E-Commerce Lead, Sunday Form',
    avatar: asset('/photos/avatars/neha.webp'),
    verified: true,
  },
  {
    id: 'kevin',
    quote:
      'Prospects qualify themselves through the agent before booking a demo. Inbound meetings convert 40% higher because they arrive fully informed.',
    authorName: 'Kevin Morales',
    authorSubtitle: 'Toronto · Sales Director, RelayDesk',
    avatar: asset('/photos/avatars/dev.webp'),
    verified: true,
  },
];

export function InspiringClientExperiences() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const getStep = () => {
    if (!trackRef.current) return 340;
    const firstCard = trackRef.current.querySelector<HTMLElement>('.exp-card');
    return firstCard ? firstCard.offsetWidth + 20 : 340;
  };

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -getStep(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: getStep(), behavior: 'smooth' });
    }
  };

  // Ensure carousel starts at position 0 (Gold Featured Card visible on load)
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = 0;
    }
  }, []);

  // Dynamic auto-scrolling:
  // Starts after an initial 2.5s delay.
  // Advances smoothly card by card every 3.8s.
  // Automatically PAUSES when hovered on desktop, resumes on mouse leave.
  useEffect(() => {
    if (isPaused) return;

    const initialTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        const step = getStep();

        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 30) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step, behavior: 'smooth' });
        }
      }, 3800);

      return () => clearInterval(timer);
    }, 2500);

    return () => clearTimeout(initialTimeout);
  }, [isPaused]);

  return (
    <section
      id="stories"
      className="exp-section"
      aria-labelledby="exp-title"
    >
      {/* Ambient background waves */}
      <div className="exp-ambient-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 280" fill="none" preserveAspectRatio="none">
          <path
            d="M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,133.3C840,128,960,160,1080,170.7C1200,181,1320,171,1380,165.3L1440,160L1440,280L1380,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z"
            fill="url(#exp-wave-glow)"
          />
          <defs>
            <linearGradient id="exp-wave-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#2c9cfa" stopOpacity="0.14" />
              <stop offset="90%" stopColor="#f8b403" stopOpacity="0.12" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header Container */}
      <div className="container">
        <div className="exp-header">
          <h2 id="exp-title" className="exp-title">
            Businesses already using Steps AI.
          </h2>
          <p className="exp-subtitle">
            Join us and become our next success story
          </p>
        </div>
      </div>

      {/* Wide Desktop Viewport: fills horizontal space, eliminating blank side margins */}
      <div
        className="exp-viewport-wide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="exp-track"
          role="region"
          aria-label="Customer testimonials"
        >
          {experiences.map((item) => {
            if (item.isGold) {
              return (
                <article key={item.id} className="exp-card exp-card-gold">
                  <div className="exp-gold-stars" aria-label="5 out of 5 stars">
                    <Star size={18} fill="#111827" strokeWidth={0} />
                    <Star size={18} fill="#111827" strokeWidth={0} />
                    <Star size={18} fill="#111827" strokeWidth={0} />
                    <Star size={18} fill="#111827" strokeWidth={0} />
                    <Star size={18} fill="#111827" strokeWidth={0} />
                  </div>

                  <h3 className="exp-gold-rating">{item.rating}</h3>

                  <p className="exp-gold-quote">{item.quote}</p>

                  <div className="exp-gold-footer">
                    <div className="exp-gold-avatars" aria-hidden="true">
                      {item.avatars?.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className="exp-gold-avatar"
                          width={38}
                          height={38}
                          style={{ zIndex: 3 - i }}
                        />
                      ))}
                    </div>
                    <div className="exp-gold-users">
                      <strong>{item.userCount}</strong>
                      <span>{item.userLabel}</span>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article key={item.id} className="exp-card exp-card-white">
                <div className="exp-quote-icon" aria-hidden="true">
                  ““
                </div>

                <p className="exp-quote-text">{item.quote}</p>

                <div className="exp-author">
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt={item.authorName ?? ''}
                      className="exp-author-avatar"
                      width={46}
                      height={46}
                      loading="lazy"
                    />
                  )}
                  <div className="exp-author-info">
                    <div className="exp-author-line">
                      <strong className="exp-author-name">{item.authorName}</strong>
                      {item.verified && (
                        <CheckCircle2
                          size={14}
                          className="exp-verified-badge"
                          aria-label="Verified Customer"
                        />
                      )}
                    </div>
                    <span className="exp-author-sub">{item.authorSubtitle}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Centered Controls Container */}
      <div className="container">
        <div className="exp-controls">
          <button
            type="button"
            className="exp-btn"
            onClick={scrollLeft}
            aria-label="Previous customer story"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="exp-btn"
            onClick={scrollRight}
            aria-label="Next customer story"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Link to Full Case Studies Hub */}
        <div className="exp-footer-link">
          <Link href="/case-studies/" className="exp-see-all">
            See all customer stories &amp; results →
          </Link>
        </div>
      </div>
    </section>
  );
}
