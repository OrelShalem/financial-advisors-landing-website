'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
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

export default function Page() {
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

  return (
    <div className="flex flex-col min-h-screen">
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
        <Link href="/" className="text-2xl md:text-3xl font-bold text-rose-800 font-rubik tracking-tight">
          אושרי שלם
        </Link>
        <nav className="flex items-center gap-4">
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
            צרי קשר
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative bg-gradient-to-b from-rose-100/30 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-gradient-to-b from-white/95 to-white/80 z-10"></div>
            <Image 
              src="/images/photo-1.jpg"
              alt="רקע כלכלי"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight fade-in text-gray-900 font-rubik leading-tight">
              מה אם נגיד לך<br />
              <span className="text-rose-600">שאפשר לחסוך ולהרוויח</span><br />
              בלי להתאמץ יותר מדי?
            </h1>
            
            <div className="space-y-8 mb-12 text-xl md:text-2xl text-gray-600 fade-in delay-1">
              <p className="leading-relaxed">
                שיהיה לך תקציב מסודר בלי לוותר על החיים הטובים?
              </p>
              <p className="leading-relaxed">
                שתוכלו לקנות דירה בלי לחכות עשר שנים?
              </p>
              <p className="leading-relaxed">
                שתוכלו לבנות עתיד כלכלי בטוח לכם ולילדים שלכם?
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 fade-in delay-2">
              <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
                השנה, עזרתי ליותר מ-50 זוגות צעירים
                <br />
                <span className="text-rose-600 font-bold">לבנות תכנית כלכלית מנצחת</span>
              </p>
              <p className="text-xl text-gray-600">
                עם ליווי אישי, תכנון מדויק והכוונה מקצועית - גם אתם יכולים להגיע ליציבות כלכלית
              </p>
            </div>

            <Button 
              size="lg" 
              className="rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium px-12 py-8 text-xl shadow-lg shadow-rose-200/50 transition-all hover:shadow-xl hover:shadow-rose-200/50 fade-in delay-3"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                });
              }}
            >
              לפגישת ייעוץ ראשונה חינם
            </Button>
          </div>
        </section>

        {/* What You'll Get Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-rubik">מה תקבלו בפגישת הייעוץ?</h2>
              <p className="text-xl text-gray-600">הצעד הראשון שלכם לעתיד כלכלי בטוח</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="scroll-animation scroll-delay-1 p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-lg">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-rubik">ניתוח מצב קיים</h3>
                <p className="text-lg text-gray-600 leading-relaxed">נבחן יחד את המצב הכלכלי הנוכחי שלכם, נזהה דפוסי התנהלות ונמפה את האתגרים והיעדים שלכם</p>
              </div>

              <div className="scroll-animation scroll-delay-2 p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-lg">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-rubik">תכנית פעולה ראשונית</h3>
                <p className="text-lg text-gray-600 leading-relaxed">תקבלו המלצות מעשיות וצעדים ראשונים שאפשר ליישם כבר מחר בבוקר לשיפור המצב הכלכלי</p>
              </div>

              <div className="scroll-animation scroll-delay-3 p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-lg">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-rubik">מיפוי הזדמנויות</h3>
                <p className="text-lg text-gray-600 leading-relaxed">נזהה יחד הזדמנויות לחיסכון, השקעה וצמיחה כלכלית שמתאימות בדיוק למצב שלכם</p>
              </div>

              <div className="scroll-animation scroll-delay-4 p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-lg">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-rubik">מענה לשאלות</h3>
                <p className="text-lg text-gray-600 leading-relaxed">תקבלו מענה מקצועי לכל השאלות שמטרידות אתכם בנושאי כלכלת המשפחה</p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-rubik">סיפורי הצלחה</h2>
              <p className="text-xl text-gray-600">זוגות שכבר בדרך להצלחה כלכלית</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="scroll-animation scroll-delay-1">
                <div className="relative h-[300px] rounded-3xl overflow-hidden mb-6">
                  <Image 
                    src="/images/photo-2.jpg"
                    alt="סיפור הצלחה 1"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">״תוך שנה הצלחנו לחסוך למקדמה לדירה״</h3>
                <p className="text-gray-600">דן ומיכל, זוג צעיר מחיפה, הצליחו לחסוך 200,000 ₪ בשנה אחת בלבד</p>
              </div>
              
              <div className="scroll-animation scroll-delay-2">
                <div className="relative h-[300px] rounded-3xl overflow-hidden mb-6">
                  <Image 
                    src="/images/photo-3.jpg"
                    alt="סיפור הצלחה 2"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">״סוף סוף יש לנו תקציב מסודר״</h3>
                <p className="text-gray-600">רועי ושירה למדו לנהל נכון את התקציב החודשי ולחסוך מבלי להתקמצן</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with Image */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-rose-50">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <Image 
                  src="/images/photo-1.jpg"
                  alt="ייעוץ כלכלי"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 font-rubik">למה לבחור בי?</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">ניסיון מוכח</h3>
                    <p className="text-gray-600">עזרתי ליותר מ-50 זוגות צעירים להגיע ליציבות כלכלית</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">גישה אישית</h3>
                    <p className="text-gray-600">כל תכנית מותאמת במיוחד לצרכים ולמטרות שלכם</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">תוצאות מהירות</h3>
                    <p className="text-gray-600">תראו שיפור משמעותי כבר בחודשים הראשונים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-24 px-6 bg-white">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-rubik">בואו נתחיל במסע</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">השאירו פרטים ואחזור אליכם תוך 24 שעות לקביעת פגישת ייעוץ ראשונה חינם</p>
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-3xl shadow-xl shadow-rose-100/20 overflow-hidden p-8">
              <form 
                action="https://formspree.io/f/YOUR_FORM_ID" 
                method="POST"
                className="space-y-6 text-right"
              >
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-colors text-gray-900"
                    placeholder="הכניסו את שמכם המלא"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                    טלפון
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-colors text-gray-900"
                    placeholder="הכניסו את מספר הטלפון שלכם"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                    אימייל
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-colors text-gray-900"
                    placeholder="הכניסו את כתובת האימייל שלכם"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                    איך אוכל לעזור לכם?
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-colors text-gray-900"
                    placeholder="ספרו לי על המצב הכלכלי שלכם והיעדים שלכם"
                  />
                </div>
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center px-12 py-4 text-xl font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-full shadow-lg shadow-rose-200/50 transition-all hover:shadow-xl hover:shadow-rose-200/50"
                  >
                    קביעת פגישת ייעוץ חינם
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-rose-100 bg-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="text-gray-600 text-lg">© {new Date().getFullYear()} אושרי שלם - ייעוץ כלכלי לזוגות צעירים</p>
        </div>
      </footer>
    </div>
  )
}