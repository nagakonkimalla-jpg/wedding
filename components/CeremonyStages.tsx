"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

interface Stage {
    name: string;
    telugu: string;
    description: string;
    image: string;
}

const stages: Stage[] = [
    {
        name: "Gowri Puja",
        telugu: "గౌరీ పూజ",
        description: "The bride worships Goddess Gowri (Parvati), seeking blessings for a happy and prosperous married life.",
        image: "/assets/images/pelli/stages/gowri_puja.png",
    },
    {
        name: "Kashi Yatra",
        telugu: "కాశీ యాత్ర",
        description: "A playful ritual where the groom pretends to leave for Kashi, only to be lovingly persuaded by the bride's father to stay and marry.",
        image: "/assets/images/pelli/stages/kashi_yatra.png",
    },
    {
        name: "Jeelakarra Bellam",
        telugu: "జీలకర్ర బెల్లం",
        description: "The couple places a sacred paste of cumin and jaggery on each other's heads — a uniquely Telugu moment that seals the bond.",
        image: "/assets/images/pelli/stages/jeelakarra_bellam.png",
    },
    {
        name: "Kanyadaanam",
        telugu: "కన్యాదానం",
        description: "The bride's parents formally give her hand to the groom, with holy water poured over their joined hands.",
        image: "/assets/images/pelli/stages/kanyadaanam.png",
    },
    {
        name: "Mangalya Dharanam",
        telugu: "మాంగల్య ధారణ",
        description: "The most sacred moment — the groom ties the mangalsutra around the bride's neck, symbolizing their eternal union.",
        image: "/assets/images/pelli/stages/mangalya_dharanam.png",
    },
    {
        name: "Talambralu",
        telugu: "తలంబ్రాలు",
        description: "The couple joyfully showers each other with turmeric-colored rice, a playful moment symbolizing prosperity and togetherness.",
        image: "/assets/images/pelli/stages/talambralu.png",
    },
    {
        name: "Sapthapadi",
        telugu: "సప్తపది",
        description: "Seven sacred steps taken together around the holy fire, each step representing a lifelong vow to one another.",
        image: "/assets/images/pelli/stages/sapthapadi.png",
    },
    {
        name: "Arundhati Darshanam",
        telugu: "అరుంధతీ దర్శనం",
        description: "The groom shows the bride the Arundhati star — a celestial symbol of devotion and the ideal of married life.",
        image: "/assets/images/pelli/stages/arundhati_darshanam.png",
    },
    {
        name: "Aashirvaadam",
        telugu: "ఆశీర్వాదం",
        description: "Elders bless the newlywed couple, showering them with love, wisdom, and prayers for a blessed journey ahead.",
        image: "/assets/images/pelli/stages/aashirvaadam.png",
    },
    {
        name: "Appaginthalu",
        telugu: "అప్పగింతలు",
        description: "The emotional send-off — the bride's family lovingly bids farewell as she begins her new life with the groom.",
        image: "/assets/images/pelli/stages/appaginthalu.png",
    },
];

export default function CeremonyStages() {
    return (
        <section className="py-8 sm:py-12 px-0 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <AnimatedSection direction="fade">
                    <div className="text-center mb-8 sm:mb-12 px-5 sm:px-0">
                        <p className="text-xs font-body tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(74, 28, 28, 0.5)' }}>
                            The Sacred Journey
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-[#8B1A1A] mb-3">
                            Wedding Ceremony
                        </h2>
                        <p className="text-sm sm:text-base font-body text-[#3D2B1F]/70 max-w-lg mx-auto leading-relaxed">
                            A Telugu wedding is a beautiful tapestry of sacred rituals, each carrying deep meaning and centuries of tradition.
                        </p>
                    </div>
                </AnimatedSection>

                {/* Mobile: horizontal scroll | Desktop: grid */}
                {/* Mobile scroll strip */}
                <div className="md:hidden overflow-x-auto scrollbar-hide -mx-0 px-4 pb-4"
                    style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                    <div className="flex gap-3" style={{ width: 'max-content' }}>
                        {stages.map((stage, index) => (
                            <div
                                key={stage.name}
                                className="group bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[#D4A017]/10 shadow-sm flex flex-col items-center text-center"
                                style={{ width: '160px', flexShrink: 0, scrollSnapAlign: 'start' }}
                            >
                                <span className="text-[10px] font-body font-bold tracking-widest text-[#D4A017]/60 mb-1.5">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="relative w-24 h-24 flex-shrink-0 mb-2">
                                    <Image
                                        src={stage.image}
                                        alt={stage.name}
                                        fill
                                        className="object-contain"
                                        sizes="96px"
                                    />
                                </div>
                                <h3 className="text-sm font-heading text-[#8B1A1A] leading-tight mb-0.5">
                                    {stage.name}
                                </h3>
                                <p className="text-[11px] font-body text-[#D4A017] mb-1.5" style={{ fontStyle: "italic" }}>
                                    {stage.telugu}
                                </p>
                                <p className="text-[11px] font-body text-[#3D2B1F]/60 leading-snug">
                                    {stage.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* Swipe hint */}
                    <p className="text-center text-[10px] text-[#3D2B1F]/30 mt-2 font-body">
                        Swipe to explore →
                    </p>
                </div>

                {/* Desktop grid */}
                <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 px-0">
                    {stages.map((stage, index) => (
                        <AnimatedSection
                            key={stage.name}
                            direction="up"
                            delay={index * 40}
                        >
                            <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[#D4A017]/10 shadow-sm hover:shadow-md hover:border-[#D4A017]/25 transition-all duration-300 h-full flex flex-col items-center text-center">
                                <span className="text-[10px] font-body font-bold tracking-widest text-[#D4A017]/60 mb-2">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="relative w-24 h-24 flex-shrink-0 mb-3">
                                    <Image
                                        src={stage.image}
                                        alt={stage.name}
                                        fill
                                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                                        sizes="96px"
                                    />
                                </div>
                                <h3 className="text-base font-heading text-[#8B1A1A] leading-tight mb-0.5">
                                    {stage.name}
                                </h3>
                                <p className="text-[11px] font-body text-[#D4A017] mb-2" style={{ fontStyle: "italic" }}>
                                    {stage.telugu}
                                </p>
                                <p className="text-xs font-body text-[#3D2B1F]/60 leading-snug">
                                    {stage.description}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
