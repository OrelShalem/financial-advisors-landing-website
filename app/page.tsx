'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Heebo, Rubik } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'

const heebo = Heebo({ 
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
})

const rubik = Rubik({
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  weight: ['400', '500', '700'],
})

// Language switcher component
const LanguageSwitcher = ({ currentLang, onSwitch }: { currentLang: 'he' | 'en', onSwitch: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onSwitch}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white backdrop-blur-sm border border-amber-200 text-amber-800 hover:bg-amber-50 transition-colors"
  >
    {currentLang === 'he' ? 'English' : 'עברית'}
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  </motion.button>
);

// Navigation links component
const NavLinks = ({ lang, sections }: { lang: 'he' | 'en', sections: { id: string, label: string }[] }) => (
  <div className="hidden md:flex items-center gap-2 md:gap-4">
    {sections.map((section, index) => (
      <motion.button
        key={section.id}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index }}
        whileHover={{ scale: 1.05, color: '#B45309' }}
        onClick={() => {
          document.getElementById(section.id)?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }}
        className="px-3 py-2 text-amber-800 hover:text-amber-600 font-medium transition-colors text-sm md:text-base"
      >
        {section.label}
      </motion.button>
    ))}
  </div>
);

// Mobile navigation menu
const MobileNavMenu = ({ lang, sections }: { lang: 'he' | 'en', sections: { id: string, label: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-amber-800"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl p-4 z-50 border-t border-amber-100"
          >
            <div className="flex flex-col space-y-3">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 * index }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-amber-800 hover:bg-amber-50 font-medium transition-colors rounded-lg text-right"
                >
                  {section.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Logo component
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="url(#goldGradient)" strokeWidth="4" fill="transparent" />
        <path d="M25 70V40H35V70M40 70V30H50V70M55 70V20H65L75 35V70" fill="url(#goldGradient)" />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d485" />
            <stop offset="50%" stopColor="#d4a83b" />
            <stop offset="100%" stopColor="#c49320" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="text-right">
      <div className="text-xl font-bold gold-gradient">אושרי שלם</div>
      <div className="text-sm text-amber-600">ייעוץ כלכלי</div>
    </div>
  </div>
);

export default function Page() {
  const [lang, setLang] = useState<'he' | 'en'>('he');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  // Time countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        title: 'אושרי שלם',
        subtitle: 'ייעוץ כלכלי',
        mainQuestion: 'האם הכסף שלכם נמצא במקומות הנכונים?',
        subQuestion: 'אם לא, הגעתם למקום הנכון.',
        description: 'תכנית הליווי היחידה להשקעה פסיבית שנותנת גם ידע וגם פרקטיקה בליווי צמוד ואחריה לא צריך שום קורס או סדנה אחרת, זו התחנה האחרונה שלכם, באחריות.',
        cta: 'בוא נצא לדרך',
        nextProgram: 'מחזור חדש לתכנית הליווי!',
        timeRemaining: 'הזמן שנשאר לתחילתו:',
        days: 'ימים',
        hours: 'שעות',
        minutes: 'דקות',
        seconds: 'שניות',
        earlyRegistration: 'רישום מוקדם עם הטבה עד סוף החודש.',
        programInfo: [
          'התוכנית הבאה מתחילה ב-18 למאי (18/5/2025).',
          'מפגשים קבוצתיים אחת לשבוע בימי א׳ בשעה 19:30 עד 21:30 בזום.'
        ],
        personalMeetings: 'מפגשים אישיים הם בתיאום מול המלווה שלכם.',
        spotsLeft: 'נותרו רק עוד 9 מקומות למחזור הבא!',
        reserveSpot: 'שמור לי מקום!',
        stats: 'יותר מ-50 זוגות צעירים',
        statsHighlight: 'כבר בדרך להצלחה כלכלית'
      },
      intro: {
        title: 'לפני שמתחילים,',
        subtitle: 'כמה מילים על התכנית:',
        description: 'תוכנית הליווי שלי היא תכנית ליווי אישית לבניית תיק השקעות פסיבי – שמתאימה בדיוק למי שרוצה להתחיל להשקיע בצורה חכמה, בלי לרדוף אחרי גרפים, ובלי להפוך את זה למשרה מלאה. במהלך 6 מפגשים אונליין, תקבלו ליווי צמוד, כלים פרקטיים ודגש על התאמה אישית – כולל תמיכה שוטפת, מענה לשאלות, קבצים מוכנים לעבודה, והכי חשוב – שיטה מוכחת שהולכת איתכם יד ביד כדי לנצל את היתרונות של שוק ההון בנחת ובלי חרדות לאורך שנים.',
        cta: 'בוא נתחיל!'
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
        copyright: '© 2024 כל הזכויות שמורות לאושרי שלם - ייעוץ כלכלי'
      },
      problems: {
        title: 'מרגישים שאתם מוכנים להשקיע – אבל משהו עוצר אתכם?',
        subtitle: 'אולי זה עודף המידע ברשת, אולי הפחד לעשות החלטה גדולה עם הכסף, ואולי התחושה שאתם פשוט לא יודעים מאיפה להתחיל.',
        feelings: {
          title: 'אז אם התחושות האלה מרגישות מוכרות:',
          items: [
            'אתם רוצים להשקיע אבל מוצפים במידע ולא יודעים למי להאמין.',
            'יש לכם כסף שיושב בעו"ש ואתם יודעים שהוא צריך לעבוד בשבילכם.',
            'מרגישים שכולם משקיעים ורק אתם נשארים מאחור.',
            'חוששים שההשקעה תדרוש ממכם יותר מדי זמן או תהיה מסובכת מדי.',
            'מתלבטים אם אפשר בכלל להתחיל עם סכום קטן.'
          ]
        },
        solution: {
          title: 'הגעתם למקום הנכון!',
          items: [
            'תכנית הליווי תלמד אתכם איך להשקיע נכון, בצורה פשוטה ובלי לחץ.',
            'נבנה יחד תיק השקעות שעובד בשבילכם – עם מינימום זמן ומקסימום תוצאות.',
            'תקבלו תמיכה מלאה וליווי אישי – אתם לא לבד בתהליך.',
            'מינימום התעסקות – כמה דקות בחודש בלבד.',
            'תכנון פיננסי – לא רק השקעות, אלא יצירת ביטחון כלכלי, שמאפשר לישון טוב בלילה.'
          ]
        },
        cta: 'בוא נצא לדרך!'
      },
      whyMe: {
        title: 'יש עשרות קורסים וסדנאות ברשת,',
        subtitle: 'אז למה דווקא התכנית שלי?',
        items: [
          {
            title: 'השיטה עובדת',
            description: 'גם בתקופות טובות וגם בתקופות פחות טובות בשוק, האסטרטגיה שלנו מוכיחה את עצמה לאורך זמן.'
          },
          {
            title: 'ליווי אישי',
            description: 'מעבר למפגשים הקבוצתיים, אתם מקבלים מפגשי ייעוץ אישיים, בהם נבנה יחד את התיק שמתאים לכם בהתאמה מלאה.'
          },
          {
            title: 'תוצאות מוכחות',
            description: 'למעלה מ-300 בוגרים כבר בנו תיקי השקעות מצליחים ומשיגים תשואות מרשימות במינימום זמן ומאמץ.'
          },
          {
            title: 'תמיכה מתמשכת',
            description: 'גם אחרי סיום התכנית, אתם ממשיכים לקבל תמיכה, עדכונים ומענה לשאלות - אנחנו איתכם לאורך כל הדרך.'
          }
        ]
      },
    },
    en: {
      nav: {
        contact: 'Contact',
        language: 'עברית'
      },
      hero: {
        title: 'Oshri Shalem',
        subtitle: 'Financial Consulting',
        mainQuestion: 'Is Your Money in the Right Places?',
        subQuestion: 'If not, you\'ve come to the right place.',
        description: 'The only passive investment guidance program that provides both knowledge and practice with close support, after which you won\'t need any other course or workshop. This is your final destination, guaranteed.',
        cta: 'Let\'s Get Started',
        nextProgram: 'New Cohort for the Guidance Program!',
        timeRemaining: 'Time until it begins:',
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
        earlyRegistration: 'Early registration with a special discount until the end of the month.',
        programInfo: [
          'The next program starts on May 18th (18/5/2025).',
          'Group meetings once a week on Sundays from 7:30 PM to 9:30 PM via Zoom.'
        ],
        personalMeetings: 'Personal meetings are scheduled with your mentor.',
        spotsLeft: 'Only 9 spots left for the next cohort!',
        reserveSpot: 'Reserve My Spot!',
        stats: 'More than 50 young couples',
        statsHighlight: 'on their way to financial success'
      },
      intro: {
        title: 'Before We Begin,',
        subtitle: 'A Few Words About the Program:',
        description: 'My guidance program is a personal coaching program for building a passive investment portfolio – perfect for those who want to start investing smartly, without chasing graphs, and without turning it into a full-time job. During 6 online meetings, you\'ll receive close guidance, practical tools, and a focus on personalization – including ongoing support, answers to questions, ready-to-use files, and most importantly – a proven method that walks with you hand in hand to utilize the advantages of the stock market calmly and without anxiety for years to come.',
        cta: 'Let\'s Begin!'
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
        copyright: '© 2024 All rights reserved to Oshri Shalem - Financial Consulting'
      },
      problems: {
        title: 'Feel Ready to Invest – But Something\'s Holding You Back?',
        subtitle: 'Maybe it\'s information overload, fear of making big financial decisions, or simply not knowing where to start.',
        feelings: {
          title: 'If these feelings sound familiar:',
          items: [
            'You want to invest but are overwhelmed with information and don\'t know who to trust.',
            'You have money sitting in your account, and you know it should be working for you.',
            'It feels like everyone is investing except you.',
            'You\'re concerned that investing will demand too much of your time or be too complicated.',
            'You\'re wondering if you can start with a small amount.'
          ]
        },
        solution: {
          title: 'You\'ve Come to the Right Place!',
          items: [
            'The guidance program will teach you how to invest correctly, simply, and without pressure.',
            'We\'ll build an investment portfolio that works for you – with minimum time and maximum results.',
            'You\'ll receive full support and personal guidance – you\'re not alone in the process.',
            'Minimum involvement – just a few minutes per month.',
            'Financial planning – not just investments, but creating financial security that lets you sleep well at night.'
          ]
        },
        cta: 'Let\'s Get Started!'
      },
      whyMe: {
        title: 'There Are Dozens of Courses and Workshops Online,',
        subtitle: 'So Why Choose My Program?',
        items: [
          {
            title: 'The Method Works',
            description: 'In both good times and challenging market periods, our strategy proves itself over time.'
          },
          {
            title: 'Personal Guidance',
            description: 'Beyond group meetings, you receive personal consultation sessions where we build a portfolio that fully matches your needs.'
          },
          {
            title: 'Proven Results',
            description: 'Over 300 graduates have already built successful investment portfolios and are achieving impressive returns with minimum time and effort.'
          },
          {
            title: 'Ongoing Support',
            description: 'Even after completing the program, you continue to receive support, updates, and answers to questions - we\'re with you all the way.'
          }
        ]
      },
    }
  };

  const navSections = {
    he: [
      { id: 'services', label: 'שירותים' },
      { id: 'success-stories', label: 'סיפורי הצלחה' },
      { id: 'why-choose', label: 'למה לבחור בי' },
      { id: 'contact-form', label: 'צור קשר' }
    ],
    en: [
      { id: 'services', label: 'Services' },
      { id: 'success-stories', label: 'Success Stories' },
      { id: 'why-choose', label: 'Why Choose Me' },
      { id: 'contact-form', label: 'Contact' }
    ]
  };

  return (
    <div className={`flex flex-col min-h-screen ${heebo.className}`} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .scale-up {
          animation: scaleUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        .float {
          animation: float 6s ease-in-out infinite;
        }

        .pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
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
            rgba(245, 158, 11, 0.1),
            rgba(245, 158, 11, 0.2),
            rgba(245, 158, 11, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .gold-gradient {
          background: linear-gradient(135deg, #f59e0b, #92400e, #f59e0b);
          background-size: 200% 200%;
          animation: shimmer 10s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .gold-border {
          position: relative;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .gold-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(245, 158, 11, 0.5),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
          border-radius: inherit;
          z-index: -1;
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
            rgba(245, 158, 11, 0.15) 0%,
            rgba(245, 158, 11, 0.05) 35%,
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
        
        .massive-heading {
          font-size: clamp(2.5rem, 8vw, 6rem);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        
        .section-heading {
          font-size: clamp(2rem, 6vw, 4rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        
        .highlight-box {
          display: inline-block;
          position: relative;
          z-index: 1;
        }
        
        .highlight-box::after {
          content: '';
          position: absolute;
          bottom: 0.1em;
          left: -0.25em;
          right: -0.25em;
          height: 0.3em;
          background-color: rgba(245, 158, 11, 0.2);
          z-index: -1;
          transform: skew(-12deg);
        }

        .parallax-bg {
          transform: translateY(calc(var(--scroll-y) * -0.1px));
          will-change: transform;
        }

        .ticker-tape {
          animation: ticker 15s linear infinite;
          white-space: nowrap;
        }
        
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .time-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          min-width: 80px;
          border-radius: 8px;
          background: linear-gradient(135deg, #f8e3b5, #b68c35);
          color: white;
          font-weight: bold;
          box-shadow: 0 10px 25px -10px rgba(182, 140, 53, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backdropFilter: scrollY > 50 ? 'blur(8px)' : 'none' }}
        className={`flex items-center justify-between py-5 px-6 sticky top-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/80 shadow-lg' : 'bg-transparent'
        }`}
      >
        <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <MobileNavMenu lang={lang} sections={navSections[lang]} />
          <NavLinks lang={lang} sections={navSections[lang]} />
          <LanguageSwitcher 
            currentLang={lang} 
            onSwitch={() => setLang(lang === 'he' ? 'en' : 'he')} 
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline"
              size="lg"
              className="border-amber-300 text-amber-800 hover:bg-amber-50 font-medium rounded-full px-8"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                });
              }}
            >
              {content[lang].nav.contact}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-12 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-white">
          <div className="absolute inset-0 overflow-hidden parallax-bg" style={{'--scroll-y': scrollY} as any}>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/90"></div>
          </div>
          
          <div className="absolute top-1/4 left-[20%] w-32 h-32 bg-amber-300/10 rounded-full blur-2xl float"></div>
          <div className="absolute bottom-1/3 right-[15%] w-40 h-40 bg-amber-200/20 rounded-full blur-3xl pulse"></div>
          
          <div className="max-w-6xl mx-auto w-full z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Image Column */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="order-2 md:order-1"
              >
                <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/images/photo-1.jpg"
                    alt="Financial Consultant"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
                </div>
              </motion.div>
              
              {/* Text Column */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="order-1 md:order-2"
              >
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-xl md:text-2xl text-amber-600 mb-4 font-medium"
                >
                  {content[lang].hero.subtitle}
                </motion.p>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-5xl md:text-6xl font-bold mb-6 gold-gradient"
                >
                  {content[lang].hero.title}
                </motion.h1>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
                >
                  {content[lang].hero.mainQuestion}
                </motion.h2>
                
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-2xl md:text-3xl font-bold mb-6 text-amber-700"
                >
                  {content[lang].hero.subQuestion}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-lg md:text-xl text-gray-600 mb-8"
                >
                  {content[lang].hero.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-10"
                >
                  <Button 
                    size="lg" 
                    className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-10 py-8 text-xl shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 transition-all"
                    onClick={() => {
                      document.getElementById('contact-form')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }}
                  >
                    {content[lang].hero.cta}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
                {content[lang].hero.nextProgram}
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                {content[lang].hero.timeRemaining}
              </p>
              
              <div className="flex justify-center gap-4 md:gap-8 mb-10">
                <div className="time-box">
                  <span className="text-2xl md:text-4xl">{timeLeft.days}</span>
                  <span className="text-xs md:text-sm mt-1">{content[lang].hero.days}</span>
                </div>
                <div className="time-box">
                  <span className="text-2xl md:text-4xl">{timeLeft.hours}</span>
                  <span className="text-xs md:text-sm mt-1">{content[lang].hero.hours}</span>
                </div>
                <div className="time-box">
                  <span className="text-2xl md:text-4xl">{timeLeft.minutes}</span>
                  <span className="text-xs md:text-sm mt-1">{content[lang].hero.minutes}</span>
                </div>
                <div className="time-box">
                  <span className="text-2xl md:text-4xl">{timeLeft.seconds}</span>
                  <span className="text-xs md:text-sm mt-1">{content[lang].hero.seconds}</span>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-amber-600 font-medium mb-6">
                {content[lang].hero.earlyRegistration}
              </p>
              
              <div className="text-md md:text-lg text-gray-600 mb-8">
                {content[lang].hero.programInfo.map((item, index) => (
                  <p key={index} className="mb-2">* {item}</p>
                ))}
                <p className="mt-4 text-sm md:text-base italic">* {content[lang].hero.personalMeetings}</p>
              </div>
              
              <div className="px-5 py-3 bg-amber-50 rounded-lg inline-block mb-8">
                <p className="text-lg md:text-xl font-bold text-amber-800">
                  {content[lang].hero.spotsLeft}
                </p>
              </div>
              
              <div>
                <Button 
                  size="lg" 
                  className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-10 py-6 text-xl shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 transition-all"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    });
                  }}
                >
                  {content[lang].hero.reserveSpot}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Intro Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-amber-50 to-amber-100/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
                {content[lang].intro.title}
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 gold-gradient">
                {content[lang].intro.subtitle}
              </h3>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                {content[lang].intro.description}
              </p>
              <Button 
                size="lg" 
                className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-10 py-5 text-lg shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 transition-all"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {content[lang].intro.cta}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-amber-50 to-amber-100/50">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="section-heading mb-4 gold-gradient">
                {content[lang].hero.stats}
              </p>
              <p className="text-2xl md:text-3xl text-amber-600 font-bold">
                {content[lang].hero.statsHighlight}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Problems & Solutions Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                {content[lang].problems.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {content[lang].problems.subtitle}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-amber-50 rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6 text-amber-800">
                  {content[lang].problems.feelings.title}
                </h3>
                <ul className="space-y-4">
                  {content[lang].problems.feelings.items.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex items-start"
                    >
                      <div className="bg-amber-400 rounded-full w-5 h-5 mt-1 flex-shrink-0"></div>
                      <p className="text-lg text-gray-700 ms-4">{item}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gradient-to-br from-amber-100 to-white rounded-2xl p-8 shadow-lg border border-amber-200"
              >
                <h3 className="text-2xl font-bold mb-6 gold-gradient">
                  {content[lang].problems.solution.title}
                </h3>
                <ul className="space-y-4">
                  {content[lang].problems.solution.items.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex items-start"
                    >
                      <svg className="w-5 h-5 mt-1 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-lg text-gray-700 ms-4">{item}</p>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mt-8 text-center"
                >
                  <Button 
                    className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-8 py-4 text-lg shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 transition-all"
                    onClick={() => {
                      document.getElementById('contact-form')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }}
                  >
                    {content[lang].problems.cta}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why My Program Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
                {content[lang].whyMe.title}
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 gold-gradient">
                {content[lang].whyMe.subtitle}
              </h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content[lang].whyMe.items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white rounded-xl p-8 shadow-xl gold-border"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                    {index === 0 && <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l3 3V10l-3 3m0 0l-3-3m3 3V4m6 16l-3-3V4m0 0l3 3m-3-3v12"></path>
                    </svg>}
                    {index === 1 && <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>}
                    {index === 2 && <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>}
                    {index === 3 && <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-28 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="section-heading mb-6 gold-gradient">
                {content[lang].services.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                {content[lang].services.subtitle}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {content[lang].services.items.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                  className="shadow-lg gold-border rounded-xl p-8 bg-white"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                      <span className="text-2xl font-bold text-amber-600">{index + 1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section id="success-stories" className="py-20 md:py-28 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="section-heading mb-6 gold-gradient">
                {content[lang].success.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                {content[lang].success.subtitle}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {content[lang].success.stories.map((story, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6 group shadow-xl"
                  >
                    <Image 
                      src={`/images/photo-${index + 2}.jpg`}
                      alt={`Success Story ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-8">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                          {story.title}
                        </h3>
                        <p className="text-lg md:text-xl text-white/90">
                          {story.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section id="why-choose" className="py-20 md:py-28 px-6 bg-white overflow-hidden">
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute -left-24 -top-24 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl"></div>
            <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-amber-50/50 blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="section-heading mb-12 gold-gradient">
                  {content[lang].why.title}
                </h2>
                <div className="space-y-8">
                  {content[lang].why.items.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="border-r-4 border-amber-400 pr-6 hover:pr-8 transition-all duration-300"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl transform md:rotate-3"
              >
                <Image 
                  src="/images/photo-1.jpg"
                  alt="Financial Consulting"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-800/30 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 md:py-28 px-6 bg-gradient-to-b from-amber-50 to-white">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="section-heading mb-6 gold-gradient">
              {content[lang].contact.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              {content[lang].contact.subtitle}
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden gold-border"
            >
              <form 
                action="https://formspree.io/f/YOUR_FORM_ID" 
                method="POST"
                className="p-8 md:p-12 space-y-6 text-right"
              >
                {Object.entries(content[lang].contact.form).map(([key, value], index) => (
                  key !== 'submit' && (
                    <motion.div 
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <label htmlFor={key} className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                        {value}
                      </label>
                      {key === 'message' ? (
                        <textarea
                          name={key}
                          id={key}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition-colors text-gray-900"
                        />
                      ) : (
                        <input
                          type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                          name={key}
                          id={key}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition-colors text-gray-900"
                        />
                      )}
                    </motion.div>
                  )
                ))}
                <motion.div 
                  className="text-center pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4), 0 8px 10px -6px rgba(245, 158, 11, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="inline-flex justify-center items-center px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-full shadow-xl shadow-amber-200/50 transition-all"
                  >
                    {content[lang].contact.form.submit}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-amber-100 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            {content[lang].footer.copyright}
          </motion.p>
        </div>
      </footer>
    </div>
  )
}