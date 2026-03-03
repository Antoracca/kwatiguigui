"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Compass } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function AdviceHero() {
    return (
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 px-8 py-12 text-white shadow-2xl sm:px-12 sm:py-16">
            {/* Decorative background elements */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

            <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center sm:items-start text-center sm:text-left">

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                        <DotLottieReact
                            src="/images/student.lottie"
                            loop
                            autoplay
                        />
                    </div>
                    <h1 className="font-heading text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1] flex flex-wrap justify-center sm:justify-start">
                        {"Espace Coaching et Stratégie".split(" ").map((word, wordIndex, wordsArray) => {
                            // Calculate global letter offset for sequential delay
                            const previousLetters = wordsArray.slice(0, wordIndex).join("").length + wordIndex;
                            return (
                                <span key={wordIndex} className="inline-block whitespace-nowrap mr-3 sm:mr-4 last:mr-0">
                                    {Array.from(word).map((letter, letterIndex) => (
                                        <motion.span
                                            key={letterIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.1, delay: (previousLetters + letterIndex) * 0.05 }}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            );
                        })}
                    </h1>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
                    className="font-heading mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl leading-[1.2]"
                >
                    Propulsez votre carrière vers de <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">nouveaux sommets</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
                    className="mb-10 max-w-2xl text-lg text-indigo-100/80 leading-relaxed text-center sm:text-left"
                >
                    Des conseils d'experts, des astuces pour votre CV, et des guides pratiques pour exceller en entretien. Découvrez les ressources qui font la différence auprès des recruteurs.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.1, type: "spring", bounce: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <button
                        type="button"
                        className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 font-bold text-indigo-900 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
                    >
                        Explorer les guides
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <div className="flex items-center gap-6 text-sm font-medium text-indigo-200">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-800/50">
                                <Target size={14} className="text-purple-300" />
                            </div>
                            <span>Focus Emploi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-800/50">
                                <Compass size={14} className="text-purple-300" />
                            </div>
                            <span>Centrafrique</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
