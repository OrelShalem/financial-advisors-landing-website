'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Language switcher component
const LanguageSwitcher = ({ currentLang, onSwitch }: { currentLang: 'he' | 'en', onSwitch: () => void }) => (
  <button
    onClick={onSwitch}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rose-100 text-rose-800 hover:bg-rose-50 transition-colors"
  >
    {currentLang === 'he' ? 'English' : 'עברית'}
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  </button>
);

// Logo component
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-12 h-12">
      <Image
        src="/images/lmm-icon.png"
        alt="LMM Logo"
        fill
        className="object-contain"
      />
    </div>
    <div className="text-left">
      <div className="text-2xl font-playfair font-bold text-rose-800">LMM</div>
      <div className="text-sm text-rose-600">Love, Mind & Money</div>
    </div>
  </div>
);

export default function Page() {
  const [lang, setLang] = useState<'he' | 'en'>('he');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.Tally) {
            // @ts-ignore
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  const content = {
    he: {
      nav: {
        contact: 'צור קשר',
        language: 'English'
      },
      hero: {
        title: 'Love, Mind & Money',
        subtitle: 'by Oshri Shalem',
        mainQuestion: 'הדרך שלך להצלחה כלכלית',
        questions: [
          'רוצים לדעת איך לחסוך ולהרוויח יותר?',
          'רוצים תקציב מסודר בלי לוותר על החיים?',
          'חולמים על דירה משלכם?'
        ],
        stats: 'יותר מ-50 זוגות צעירים',
        statsHighlight: 'כבר בדרך להצלחה כלכלית',
        description: 'ליווי אישי, תכנון מדויק והכוונה מקצועית שיובילו אתכם ליציבות כלכלית',
        cta: 'לפגישת ייעוץ חינם'
      },
      services: {
        title: 'מה תקבלו בפגישת הייעוץ?',
        subtitle: 'הצעד הראשון לעתיד כלכלי בטוח',
        items: [
          {
            title: 'ניתוח מצב קיים',
            description: 'נבחן יחד את המצב הכלכלי הנוכחי שלכם ונזהה הזדמנויות לשיפור'
          },
          {
            title: 'תכנית פעולה מיידית',
            description: 'תקבלו כלים מעשיים שתוכלו ליישם כבר מהיום'
          },
          {
            title: 'מיפוי הזדמנויות',
            description: 'נזהה יחד אפשרויות לחיסכון והשקעה שמתאימות למצב שלכם'
          },
          {
            title: 'מענה לשאלות',
            description: 'תקבלו מענה מקצועי לכל השאלות שמטרידות אתכם'
          }
        ]
      },
      success: {
        title: 'סיפורי הצלחה',
        subtitle: 'לקוחות מספרים',
        stories: [
          {
            title: '״הגשמנו את החלום של דירה משלנו״',
            description: 'תוך שנה הצלחנו לחסוך 200,000 ₪ למקדמה'
          },
          {
            title: '״סוף סוף יש לנו שליטה בכסף״',
            description: 'למדנו לנהל תקציב חכם בלי לוותר על איכות חיים'
          }
        ]
      },
      why: {
        title: 'למה לבחור בי?',
        items: [
          {
            title: 'ניסיון מוכח',
            description: 'עזרתי ליותר מ-50 זוגות להגיע ליציבות כלכלית'
          },
          {
            title: 'גישה אישית',
            description: 'כל תכנית מותאמת במיוחד לצרכים שלכם'
          },
          {
            title: 'תוצאות מהירות',
            description: 'תראו שיפור משמעותי כבר בחודשים הראשונים'
          }
        ]
      },
      contact: {
        title: 'בואו נתחיל',
        subtitle: 'השאירו פרטים ואחזור אליכם תוך 24 שעות',
        form: {
          name: 'שם מלא',
          phone: 'טלפון',
          email: 'אימייל',
          message: 'איך אוכל לעזור?',
          submit: 'לקביעת פגישת ייעוץ חינם'
        }
      },
      footer: {
        copyright: '© 2024 כל הזכויות שמורות ל-LMM'
      }
    },
    en: {
      nav: {
        contact: 'Contact',
        language: 'עברית'
      },
      hero: {
        title: 'Love, Mind & Money',
        subtitle: 'by Oshri Shalem',
        mainQuestion: 'Your Path to Financial Success',
        questions: [
          'Want to save and earn more?',
          'Need a budget without compromising lifestyle?',
          'Dreaming of your own home?'
        ],
        stats: 'More than 50 young couples',
        statsHighlight: 'on their way to financial success',
        description: 'Personal guidance, precise planning, and professional direction leading you to financial stability',
        cta: 'Book Free Consultation'
      },
      services: {
        title: 'What You\'ll Get',
        subtitle: 'Your first step to financial security',
        items: [
          {
            title: 'Current Status Analysis',
            description: 'We\'ll examine your financial situation and identify opportunities'
          },
          {
            title: 'Immediate Action Plan',
            description: 'Get practical tools you can implement today'
          },
          {
            title: 'Opportunity Mapping',
            description: 'We\'ll identify savings and investment options suited for you'
          },
          {
            title: 'Q&A Session',
            description: 'Get professional answers to all your questions'
          }
        ]
      },
      success: {
        title: 'Success Stories',
        subtitle: 'Client Testimonials',
        stories: [
          {
            title: '"We achieved our dream of home ownership"',
            description: 'Saved $60,000 for down payment in one year'
          },
          {
            title: '"Finally in control of our money"',
            description: 'Learned smart budgeting without lifestyle compromise'
          }
        ]
      },
      why: {
        title: 'Why Choose Me?',
        items: [
          {
            title: 'Proven Experience',
            description: 'Helped over 50 couples achieve financial stability'
          },
          {
            title: 'Personal Approach',
            description: 'Each plan is tailored to your specific needs'
          },
          {
            title: 'Quick Results',
            description: 'See significant improvement in the first months'
          }
        ]
      },
      contact: {
        title: 'Let\'s Begin',
        subtitle: 'Leave your details and I\'ll get back to you within 24 hours',
        form: {
          name: 'Full Name',
          phone: 'Phone',
          email: 'Email',
          message: 'How can I help?',
          submit: 'Book Free Consultation'
        }
      },
      footer: {
        copyright: '© 2024 All rights reserved to LMM'
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        .glimmer-card {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .glimmer-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.03),
            rgba(236, 72, 153, 0.06),
            rgba(236, 72, 153, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .glimmer-pill {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 9999px;
          overflow: hidden;
        }
        
        .glimmer-pill::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.03),
            rgba(236, 72, 153, 0.06),
            rgba(236, 72, 153, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          top: 85%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 600px;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 35%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
        }

        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 { transition-delay: 0.1s; }
        .scroll-delay-2 { transition-delay: 0.2s; }
        .scroll-delay-3 { transition-delay: 0.3s; }
      `}</style>

      {/* Navigation */}
      <header className="flex items-center justify-between py-5 px-6 bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
        <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4">
          <LanguageSwitcher 
            currentLang={lang} 
            onSwitch={() => setLang(lang === 'he' ? 'en' : 'he')} 
          />
          <Button 
            variant="outline"
            size="lg"
            className="border-rose-200 text-rose-800 hover:bg-rose-50 font-medium rounded-full px-8"
            onClick={() => {
              document.getElementById('contact-form')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
              });
            }}
          >
            {content[lang].nav.contact}
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 relative bg-gradient-to-b from-rose-100/30 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-gradient-to-b from-white/95 to-white/80 z-10"></div>
            <Image 
              src="/images/photo-1.jpg"
              alt="Financial background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight fade-in text-gray-900 font-playfair">
              {content[lang].hero.title}
            </h1>
            <p className="text-2xl md:text-3xl text-rose-600 mb-12 font-medium">
              {content[lang].hero.subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-800">
              {content[lang].hero.mainQuestion}
            </h2>
            
            <div className="space-y-6 mb-12 text-xl md:text-2xl text-gray-600 fade-in delay-1">
              {content[lang].hero.questions.map((question, index) => (
                <p key={index} className="leading-relaxed">{question}</p>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 fade-in delay-2">
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                {content[lang].hero.stats}
              </p>
              <p className="text-xl md:text-2xl text-rose-600 font-bold">
                {content[lang].hero.statsHighlight}
              </p>
            </div>

            <Button 
              size="lg" 
              className="rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium px-8 md:px-12 py-6 md:py-8 text-lg md:text-xl shadow-lg shadow-rose-200/50 transition-all hover:shadow-xl hover:shadow-rose-200/50 fade-in delay-3"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                });
              }}
            >
              {content[lang].hero.cta}
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 font-playfair">
                {content[lang].services.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                {content[lang].services.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {content[lang].services.items.map((item, index) => (
                <div key={index} className="scroll-animation scroll-delay-1 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 font-rubik">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 md:py-24 px-6 bg-gradient-to-b from-white to-rose-50">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 font-playfair">
                {content[lang].success.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                {content[lang].success.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content[lang].success.stories.map((story, index) => (
                <div key={index} className="scroll-animation scroll-delay-1">
                  <div className="relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden mb-6">
                    <Image 
                      src={`/images/photo-${index + 2}.jpg`}
                      alt={`Success Story ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">
                    {story.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                <Image 
                  src="/images/photo-1.jpg"
                  alt="Financial Consulting"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900 font-playfair">
                  {content[lang].why.title}
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {content[lang].why.items.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 md:py-24 px-6 bg-gradient-to-b from-white to-rose-50">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 font-playfair">
              {content[lang].contact.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed">
              {content[lang].contact.subtitle}
            </p>
            <div className="bg-white rounded-3xl shadow-xl shadow-rose-100/20 overflow-hidden p-6 md:p-8">
              <form 
                action="https://formspree.io/f/YOUR_FORM_ID" 
                method="POST"
                className="space-y-4 md:space-y-6 text-right"
              >
                {Object.entries(content[lang].contact.form).map(([key, value]) => (
                  key !== 'submit' && (
                    <div key={key}>
                      <label htmlFor={key} className="block text-base md:text-lg font-medium text-gray-700 mb-2">
                        {value}
                      </label>
                      {key === 'message' ? (
                        <textarea
                          name={key}
                          id={key}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-colors text-gray-900"
                        />
                      ) : (
                        <input
                          type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                          name={key}
                          id={key}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-colors text-gray-900"
                        />
                      )}
                    </div>
                  )
                ))}
                <div className="text-center pt-4 md:pt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-full shadow-lg shadow-rose-200/50 transition-all hover:shadow-xl hover:shadow-rose-200/50"
                  >
                    {content[lang].contact.form.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 md:py-10 px-6 border-t border-rose-100 bg-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="text-base md:text-lg text-gray-600">
            {content[lang].footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  )
}