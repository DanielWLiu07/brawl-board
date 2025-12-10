"use client";

import { Users, Sparkles, Infinity } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const features = [
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Developed a real-time collaborative whiteboard using Next.js with WebSocket connections and MongoDB database, supporting strategy planning for 3+ popular games with live team coordination.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Sparkles,
    title: "Extensive Game Assets",
    description: "Implemented drag-and-drop interface with 1000+ game assets including heroes, maps, and tactical elements.",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Infinity,
    title: "Unlimited Possibilities",
    description: "Deployed full-stack application on Vercel with AWS backend and Clerk authentication, supporting persistent storage and seamless data synchronization for unlimited whiteboard possibilities.",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featuresRef.current) return;

    const featureCards = featuresRef.current.querySelectorAll(".feature-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              featureCards,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(featuresRef.current);
  }, []);

  return (
    <section ref={featuresRef} className="snap-start min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full">
        <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center handwriting-font underline decoration-blue-600">
          Features
        </h3>
        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card bg-white/90 backdrop-blur-sm border-2 border-gray-300 rounded-xl p-8 paper-shadow-lg hover:shadow-2xl transition-all">
              <div className="flex items-start gap-6">
                <div className={`${feature.bgColor} p-4 rounded-lg paper-shadow`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3 handwriting-font">
                    {feature.title}
                  </h4>
                  <p className="text-lg text-gray-700 handwriting-font leading-relaxed">
                    {feature.description.split(/(<span className="font-bold">.*?<\/span>)/g).map((part, i) => {
                      if (part.includes('font-bold')) {
                        const text = part.match(/>([^<]+)</)?.[1] || '';
                        return <span key={i} className="font-bold">{text}</span>;
                      }
                      return part;
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
