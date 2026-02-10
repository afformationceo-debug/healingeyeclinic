"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function AgingProcess() {
    const t = useTranslations('Cataract.AgingProcess');
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    // Faster scroll response — tighter ranges
    const cloudOpacity = useTransform(scrollYProgress, [0.22, 0.38], [0, 1]);
    const lightOpacity = useTransform(scrollYProgress, [0.22, 0.38], [1, 0.02]);
    const healedOpacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
    const cloudScale = useTransform(scrollYProgress, [0.22, 0.38], [0.2, 1]);
    const retinaGlow = useTransform(scrollYProgress, [0.22, 0.38], [0.85, 0.02]);
    const retinaHealGlow = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
    const particleSpread = useTransform(scrollYProgress, [0.25, 0.38], [0, 1]);

    return (
        <section ref={targetRef} className="py-32 bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }} />

            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-16">
                {/* Left: Text Content */}
                <div className="w-full md:w-1/2">
                    <span className="text-primary font-bold tracking-[0.2em] sm:tracking-widest uppercase mb-3 sm:mb-4 block text-xs sm:text-sm">{t('sectionTitle')}</span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
                        {t('headline')} <br />
                        <span className="text-neutral-500">{t('headlineHighlight')}</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed mb-3 sm:mb-4 md:mb-6">
                        {t('description1')}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed">
                        {t('description2')}
                    </p>
                </div>

                {/* Right: 3D Eye Cross-Section */}
                <div className="w-full md:w-1/2 relative h-[500px] sm:h-[550px] md:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#060610] border border-white/[0.06]"
                     style={{ boxShadow: '0 0 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)' }}>

                    {/* Ambient glow */}
                    <motion.div
                        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-[55%] w-[320px] sm:w-[350px] md:w-[380px] h-[320px] sm:h-[350px] md:h-[380px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 65%)',
                            opacity: lightOpacity,
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-[55%] w-[320px] sm:w-[350px] md:w-[380px] h-[320px] sm:h-[350px] md:h-[380px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 60%)',
                            opacity: healedOpacity,
                        }}
                    />

                    <svg viewBox="0 0 500 460" className="w-full h-full scale-110 sm:scale-100 md:scale-100">
                        <defs>
                            {/* ── 3D Gradients ── */}

                            {/* Sclera: 3D spherical shading */}
                            <radialGradient id="ag-sclera-3d" cx="40%" cy="35%" r="60%">
                                <stop offset="0%" stopColor="#2a2a3a" stopOpacity="0.5" />
                                <stop offset="60%" stopColor="#161622" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#0a0a14" stopOpacity="1" />
                            </radialGradient>

                            {/* Sclera rim light (edge highlight for 3D depth) */}
                            <linearGradient id="ag-rim-top" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="ag-rim-bottom" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#475569" stopOpacity="0" />
                                <stop offset="100%" stopColor="#64748b" stopOpacity="0.2" />
                            </linearGradient>

                            {/* Cornea: 3D glass dome */}
                            <linearGradient id="ag-cornea-3d" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.6" />
                                <stop offset="40%" stopColor="#a5b4fc" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
                            </linearGradient>

                            {/* Iris: 3D muscle ring */}
                            <radialGradient id="ag-iris-3d" cx="30%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#4a8ab5" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#2d6a8f" stopOpacity="0.85" />
                                <stop offset="100%" stopColor="#1a3d5c" stopOpacity="0.8" />
                            </radialGradient>

                            {/* Lens: multi-layer 3D crystal body */}
                            <radialGradient id="ag-lens-3d" cx="38%" cy="32%" r="62%">
                                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
                                <stop offset="20%" stopColor="#bae6fd" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.15" />
                                <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.04" />
                            </radialGradient>

                            {/* Lens: anterior capsule (front surface) */}
                            <linearGradient id="ag-lens-anterior" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.05" />
                            </linearGradient>

                            {/* Lens: primary specular (top-left key light) */}
                            <radialGradient id="ag-lens-spec1" cx="28%" cy="22%" r="35%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </radialGradient>

                            {/* Lens: secondary specular (bottom-right fill light) */}
                            <radialGradient id="ag-lens-spec2" cx="70%" cy="72%" r="30%">
                                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
                            </radialGradient>

                            {/* Lens: fresnel rim glow */}
                            <radialGradient id="ag-lens-rim" cx="50%" cy="50%" r="50%">
                                <stop offset="75%" stopColor="#60a5fa" stopOpacity="0" />
                                <stop offset="90%" stopColor="#60a5fa" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
                            </radialGradient>

                            {/* Lens: nucleus (inner core, slightly denser) */}
                            <radialGradient id="ag-lens-nucleus" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.12" />
                                <stop offset="60%" stopColor="#bfdbfe" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                            </radialGradient>

                            {/* Lens shadow filter (softer, more realistic) */}
                            <filter id="ag-lens-shadow" x="-40%" y="-40%" width="180%" height="180%">
                                <feDropShadow dx="2" dy="3" stdDeviation="5" floodColor="#0c1222" floodOpacity="0.5" />
                            </filter>

                            {/* Lens: subtle inner refraction */}
                            <filter id="ag-lens-refract" x="-10%" y="-10%" width="120%" height="120%">
                                <feGaussianBlur stdDeviation="1.5" />
                            </filter>

                            {/* Cataract cloud: 3D foggy mass */}
                            <radialGradient id="ag-cloud-3d" cx="40%" cy="35%" r="55%">
                                <stop offset="0%" stopColor="#f5f5f5" stopOpacity="0.95" />
                                <stop offset="25%" stopColor="#e5e5e5" stopOpacity="0.9" />
                                <stop offset="55%" stopColor="#b0b0b8" stopOpacity="0.75" />
                                <stop offset="100%" stopColor="#6b6b7a" stopOpacity="0.4" />
                            </radialGradient>

                            {/* Vitreous body: 3D depth */}
                            <radialGradient id="ag-vitreous-3d" cx="55%" cy="45%" r="60%">
                                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#060610" stopOpacity="0.7" />
                            </radialGradient>

                            {/* Retina: 3D curved surface */}
                            <linearGradient id="ag-retina-3d" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#d97706" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
                            </linearGradient>

                            {/* Light gradients */}
                            <linearGradient id="ag-light-normal" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
                                <stop offset="12%" stopColor="#93c5fd" stopOpacity="0.7" />
                                <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.9" />
                                <stop offset="88%" stopColor="#93c5fd" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                            </linearGradient>

                            <linearGradient id="ag-light-healed" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                                <stop offset="12%" stopColor="#fcd34d" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#fde68a" stopOpacity="1" />
                                <stop offset="88%" stopColor="#fcd34d" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                            </linearGradient>

                            {/* IOL gold lens */}
                            <radialGradient id="ag-iol-3d" cx="35%" cy="30%" r="65%">
                                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.03" />
                            </radialGradient>

                            {/* ── Filters ── */}
                            <filter id="ag-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id="ag-strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="10" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id="ag-cloud-blur" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3.5" />
                            </filter>

                            {/* 3D drop shadow */}
                            <filter id="ag-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
                                <feDropShadow dx="3" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
                            </filter>

                            {/* Inner shadow for depth */}
                            <filter id="ag-inner-shadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feGaussianBlur stdDeviation="4" result="shadow" />
                                <feOffset dx="2" dy="2" result="offset" />
                                <feComposite in="SourceGraphic" in2="offset" operator="over" />
                            </filter>
                        </defs>

                        {/* ═══════════════════════════════════════ */}
                        {/*   3D ANATOMICAL EYE CROSS-SECTION       */}
                        {/* ═══════════════════════════════════════ */}

                        <g transform="translate(0, -10)">

                            {/* ── Sclera: 3D outer shell with rim lighting ── */}
                            <ellipse
                                cx="250" cy="210"
                                rx="192" ry="128"
                                fill="url(#ag-sclera-3d)"
                            />
                            {/* Top rim light */}
                            <ellipse
                                cx="250" cy="210"
                                rx="192" ry="128"
                                fill="none"
                                stroke="url(#ag-rim-top)"
                                strokeWidth="2"
                            />
                            {/* Outer edge for depth */}
                            <ellipse
                                cx="250" cy="210"
                                rx="194" ry="130"
                                fill="none"
                                stroke="#1e293b"
                                strokeWidth="1"
                                opacity="0.5"
                            />

                            {/* ── Vitreous body (3D depth) ── */}
                            <ellipse
                                cx="280" cy="210"
                                rx="155" ry="105"
                                fill="url(#ag-vitreous-3d)"
                            />

                            {/* ── Choroid layer (reddish inner lining for 3D depth) ── */}
                            <path
                                d="M 340,115 Q 435,210 340,305"
                                fill="none"
                                stroke="#7c2d12"
                                strokeWidth="5"
                                strokeLinecap="round"
                                opacity="0.25"
                            />

                            {/* ── Retina (3D curved surface with gradient) ── */}
                            <motion.path
                                d="M 350,118 Q 435,210 350,302"
                                fill="none"
                                stroke="url(#ag-retina-3d)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                style={{ opacity: retinaGlow }}
                                filter="url(#ag-soft-glow)"
                            />
                            <motion.path
                                d="M 350,118 Q 435,210 350,302"
                                fill="none"
                                stroke="#fbbf24"
                                strokeWidth="5"
                                strokeLinecap="round"
                                style={{ opacity: retinaHealGlow }}
                                filter="url(#ag-strong-glow)"
                            />

                            {/* Retina surface texture (3D depth lines) */}
                            {[135, 158, 182, 210, 238, 262, 285].map((y, i) => (
                                <motion.line
                                    key={`retina-${i}`}
                                    x1="382" y1={y}
                                    x2={398 + Math.sin(i * 0.7) * 10} y2={y}
                                    stroke="#f59e0b"
                                    strokeWidth={1.2 - Math.abs(i - 3) * 0.1}
                                    strokeLinecap="round"
                                    style={{ opacity: retinaGlow }}
                                />
                            ))}

                            {/* ── Light Rays (5 rays with refraction path) ── */}
                            {[
                                { y1: 168, y2: 178, to: 210 },
                                { y1: 188, y2: 194, to: 210 },
                                { y1: 210, y2: 210, to: 210 },
                                { y1: 232, y2: 226, to: 210 },
                                { y1: 252, y2: 242, to: 210 },
                            ].map((ray, i) => (
                                <g key={`ray-${i}`}>
                                    {/* Blue light — normal state */}
                                    <motion.line
                                        x1="25" y1={ray.y1}
                                        x2="152" y2={ray.y1}
                                        stroke="url(#ag-light-normal)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        style={{ opacity: lightOpacity }}
                                    />
                                    <motion.line
                                        x1="152" y1={ray.y1}
                                        x2="238" y2={ray.y2}
                                        stroke="#93c5fd"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        style={{ opacity: lightOpacity }}
                                        opacity={0.55}
                                    />
                                    <motion.line
                                        x1="238" y1={ray.y2}
                                        x2="388" y2={ray.to}
                                        stroke="#93c5fd"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        style={{ opacity: lightOpacity }}
                                        opacity={0.35}
                                    />

                                    {/* Gold light — healed state */}
                                    <motion.line
                                        x1="25" y1={ray.y1}
                                        x2="152" y2={ray.y1}
                                        stroke="url(#ag-light-healed)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        filter="url(#ag-soft-glow)"
                                        style={{ opacity: healedOpacity }}
                                    />
                                    <motion.line
                                        x1="152" y1={ray.y1}
                                        x2="238" y2={ray.y2}
                                        stroke="#fcd34d"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        style={{ opacity: healedOpacity }}
                                        opacity={0.65}
                                    />
                                    <motion.line
                                        x1="238" y1={ray.y2}
                                        x2="388" y2={ray.to}
                                        stroke="#fcd34d"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        filter="url(#ag-soft-glow)"
                                        style={{ opacity: healedOpacity }}
                                        opacity={0.45}
                                    />
                                </g>
                            ))}

                            {/* ── Cornea: 3D glass dome with specular ── */}
                            <path
                                d="M 128,128 Q 85,210 128,292"
                                fill="none"
                                stroke="url(#ag-cornea-3d)"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            {/* Cornea specular highlight (3D glass reflection) */}
                            <path
                                d="M 118,160 Q 100,195 108,220"
                                fill="none"
                                stroke="#e0e7ff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                opacity="0.35"
                            />
                            {/* Cornea inner edge */}
                            <path
                                d="M 133,142 Q 95,210 133,278"
                                fill="none"
                                stroke="#818cf8"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                opacity="0.2"
                            />

                            {/* ── Iris: 3D muscle ring with depth ── */}
                            {/* Top iris with 3D thickness */}
                            <path
                                d="M 143,143 Q 155,115 178,127"
                                fill="none"
                                stroke="url(#ag-iris-3d)"
                                strokeWidth="10"
                                strokeLinecap="round"
                            />
                            {/* Top iris highlight */}
                            <path
                                d="M 146,140 Q 156,118 175,128"
                                fill="none"
                                stroke="#7dd3fc"
                                strokeWidth="1"
                                strokeLinecap="round"
                                opacity="0.2"
                            />
                            {/* Bottom iris with 3D thickness */}
                            <path
                                d="M 143,277 Q 155,305 178,293"
                                fill="none"
                                stroke="url(#ag-iris-3d)"
                                strokeWidth="10"
                                strokeLinecap="round"
                            />
                            {/* Iris radial fibers (3D texture) */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <g key={`iris-fiber-${i}`} opacity={0.3 + i * 0.05}>
                                    <line
                                        x1={146 + i * 5} y1={146 - i * 1.5}
                                        x2={150 + i * 7} y2={130 - i * 0.5}
                                        stroke="#5ba8d4"
                                        strokeWidth="0.8"
                                    />
                                    <line
                                        x1={146 + i * 5} y1={274 + i * 1.5}
                                        x2={150 + i * 7} y2={290 + i * 0.5}
                                        stroke="#5ba8d4"
                                        strokeWidth="0.8"
                                    />
                                </g>
                            ))}

                            {/* ── Pupil: 3D deep black opening ── */}
                            <ellipse
                                cx="165" cy="210"
                                rx="20" ry="58"
                                fill="#020208"
                            />
                            {/* Pupil edge gradient for depth */}
                            <ellipse
                                cx="165" cy="210"
                                rx="20" ry="58"
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth="2"
                                opacity="0.6"
                            />

                            {/* ── Lens: Premium 3D crystalline body ── */}

                            {/* Layer 1: Shadow foundation */}
                            <ellipse
                                cx="200" cy="210"
                                rx="40" ry="65"
                                fill="url(#ag-lens-3d)"
                                filter="url(#ag-lens-shadow)"
                            />

                            {/* Layer 2: Fresnel rim glow (edge refraction) */}
                            <ellipse
                                cx="200" cy="210"
                                rx="40" ry="65"
                                fill="url(#ag-lens-rim)"
                            />

                            {/* Layer 3: Posterior capsule (outer edge) */}
                            <ellipse
                                cx="200" cy="210"
                                rx="40" ry="65"
                                fill="none"
                                stroke="#60a5fa"
                                strokeWidth="1.8"
                                opacity="0.35"
                            />
                            {/* Anterior capsule (inner edge, slightly offset for depth) */}
                            <ellipse
                                cx="199" cy="209"
                                rx="38" ry="63"
                                fill="none"
                                stroke="#93c5fd"
                                strokeWidth="0.6"
                                opacity="0.2"
                            />

                            {/* Layer 4: Nucleus (inner core, denser center) */}
                            <ellipse
                                cx="200" cy="210"
                                rx="26" ry="42"
                                fill="url(#ag-lens-nucleus)"
                            />

                            {/* Layer 5: Lens fiber lamellae (concentric growth rings) */}
                            {[0.85, 0.65, 0.45].map((scale, i) => (
                                <ellipse
                                    key={`fiber-${i}`}
                                    cx="200" cy="210"
                                    rx={38 * scale} ry={63 * scale}
                                    fill="none"
                                    stroke="#93c5fd"
                                    strokeWidth="0.3"
                                    opacity={0.08 + i * 0.03}
                                    strokeDasharray={`${3 + i} ${6 + i * 2}`}
                                />
                            ))}

                            {/* Layer 6: Primary specular highlight (key light, top-left) */}
                            <ellipse
                                cx="188" cy="185"
                                rx="18" ry="30"
                                fill="url(#ag-lens-spec1)"
                            />

                            {/* Layer 7: Secondary specular (fill light, bottom-right) */}
                            <ellipse
                                cx="212" cy="235"
                                rx="10" ry="16"
                                fill="url(#ag-lens-spec2)"
                            />

                            {/* Layer 8: Tiny caustic pinpoint (sharp glass reflection) */}
                            <circle
                                cx="186" cy="178"
                                r="2.5"
                                fill="#ffffff"
                                opacity="0.35"
                            />
                            <circle
                                cx="190" cy="183"
                                r="1"
                                fill="#ffffff"
                                opacity="0.5"
                            />

                            {/* ── Cataract Clouding: 3D foggy protein deposits ── */}
                            <motion.g style={{ opacity: cloudOpacity }}>
                                {/* Main cloud mass with 3D gradient */}
                                <motion.ellipse
                                    cx="200" cy="210"
                                    rx="36" ry="60"
                                    fill="url(#ag-cloud-3d)"
                                    style={{ scale: cloudScale }}
                                    filter="url(#ag-cloud-blur)"
                                />

                                {/* 3D protein deposit clusters */}
                                {[
                                    { cx: 188, cy: 186, r: 9 },
                                    { cx: 212, cy: 198, r: 11 },
                                    { cx: 194, cy: 228, r: 10 },
                                    { cx: 206, cy: 212, r: 13 },
                                    { cx: 185, cy: 208, r: 8 },
                                    { cx: 215, cy: 232, r: 7 },
                                    { cx: 196, cy: 192, r: 6 },
                                    { cx: 208, cy: 202, r: 9 },
                                    { cx: 200, cy: 218, r: 7 },
                                    { cx: 192, cy: 240, r: 5 },
                                ].map((p, i) => (
                                    <motion.circle
                                        key={`cloud-${i}`}
                                        cx={p.cx}
                                        cy={p.cy}
                                        r={p.r}
                                        fill={i % 2 === 0 ? "#d4d4d8" : "#c4c4cc"}
                                        opacity={0.25 + (i % 4) * 0.12}
                                        filter="url(#ag-cloud-blur)"
                                        style={{ scale: particleSpread }}
                                    />
                                ))}

                                {/* Dense center with 3D highlight */}
                                <motion.ellipse
                                    cx="200" cy="208"
                                    rx="20" ry="32"
                                    fill="#e8e8ec"
                                    opacity={0.65}
                                    filter="url(#ag-cloud-blur)"
                                    style={{ scale: cloudScale }}
                                />
                                {/* Top highlight on cloud (3D curvature) */}
                                <motion.ellipse
                                    cx="195" cy="195"
                                    rx="10" ry="15"
                                    fill="#ffffff"
                                    opacity={0.2}
                                    filter="url(#ag-cloud-blur)"
                                    style={{ scale: cloudScale }}
                                />
                            </motion.g>

                            {/* ── Healed IOL: 3D premium lens ── */}
                            <motion.g style={{ opacity: healedOpacity }}>
                                {/* IOL body */}
                                <ellipse
                                    cx="200" cy="210"
                                    rx="38" ry="62"
                                    fill="url(#ag-iol-3d)"
                                    filter="url(#ag-depth-shadow)"
                                />
                                {/* IOL edge ring */}
                                <ellipse
                                    cx="200" cy="210"
                                    rx="38" ry="62"
                                    fill="none"
                                    stroke="#fbbf24"
                                    strokeWidth="2.5"
                                    filter="url(#ag-soft-glow)"
                                />
                                {/* IOL specular highlight */}
                                <ellipse
                                    cx="190" cy="190"
                                    rx="14" ry="24"
                                    fill="#fde68a"
                                    opacity={0.12}
                                    filter="url(#ag-soft-glow)"
                                />
                                {/* IOL haptics (3D arms) */}
                                <line x1="200" y1="146" x2="200" y2="128" stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
                                <line x1="200" y1="274" x2="200" y2="292" stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
                                <circle cx="200" cy="126" r="2" fill="#fbbf24" opacity="0.5" />
                                <circle cx="200" cy="294" r="2" fill="#fbbf24" opacity="0.5" />
                            </motion.g>

                            {/* ── Optic Nerve: 3D cable ── */}
                            <ellipse cx="415" cy="210" rx="8" ry="18" fill="#1e293b" />
                            <line x1="415" y1="210" x2="475" y2="210" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                            <line x1="415" y1="210" x2="475" y2="210" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                            <line x1="418" y1="206" x2="470" y2="206" stroke="#64748b" strokeWidth="0.5" opacity="0.3" />

                            {/* ── 국문 해부학 라벨 ── */}
                            <g opacity="0.55">
                                <line x1="108" y1="133" x2="78" y2="98" stroke="#64748b" strokeWidth="0.5" />
                                <circle cx="78" cy="98" r="1.5" fill="#64748b" opacity="0.5" />
                                <text x="78" y="92" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">{t('labels.cornea')}</text>
                            </g>
                            <g opacity="0.55">
                                <line x1="155" y1="128" x2="155" y2="95" stroke="#64748b" strokeWidth="0.5" />
                                <circle cx="155" cy="95" r="1.5" fill="#64748b" opacity="0.5" />
                                <text x="155" y="89" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">{t('labels.iris')}</text>
                            </g>
                            <g opacity="0.55">
                                <line x1="200" y1="142" x2="200" y2="75" stroke="#64748b" strokeWidth="0.5" />
                                <circle cx="200" cy="75" r="1.5" fill="#64748b" opacity="0.5" />
                                <text x="200" y="69" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">{t('labels.lens')}</text>
                            </g>
                            <g opacity="0.55">
                                <line x1="398" y1="152" x2="425" y2="118" stroke="#64748b" strokeWidth="0.5" />
                                <circle cx="425" cy="118" r="1.5" fill="#64748b" opacity="0.5" />
                                <text x="425" y="112" textAnchor="start" fill="#94a3b8" fontSize="9" fontFamily="monospace">{t('labels.retina')}</text>
                            </g>
                            <g opacity="0.4">
                                <text x="458" y="200" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">{t('labels.opticNerve')}</text>
                            </g>
                        </g>

                        {/* ── 단계 표시 (하단) ── */}
                        <g>
                            <line x1="160" y1="440" x2="340" y2="440" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

                            <circle cx="160" cy="440" r="6" fill="#111827" />
                            <motion.circle cx="160" cy="440" r="5" fill="#60a5fa" style={{ opacity: lightOpacity }} />

                            <circle cx="250" cy="440" r="6" fill="#111827" />
                            <motion.circle cx="250" cy="440" r="5" fill="#a1a1aa" style={{ opacity: cloudOpacity }} />

                            <circle cx="340" cy="440" r="6" fill="#111827" />
                            <motion.circle cx="340" cy="440" r="5" fill="#fbbf24" style={{ opacity: healedOpacity }} />

                            <text x="160" y="456" textAnchor="middle" fill="#334155" fontSize="7" fontFamily="monospace">{t('labels.normal')}</text>
                            <text x="250" y="456" textAnchor="middle" fill="#334155" fontSize="7" fontFamily="monospace">{t('labels.cataract')}</text>
                            <text x="340" y="456" textAnchor="middle" fill="#334155" fontSize="7" fontFamily="monospace">{t('labels.afterSurgery')}</text>
                        </g>
                    </svg>

                    {/* Section label */}
                    <div className="absolute top-4 sm:top-5 right-4 sm:right-6 z-20 pointer-events-none">
                        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-white/20 font-mono uppercase">{t('sectionLabel')}</span>
                    </div>

                    {/* Ambient heal glow */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at 40% 45%, rgba(251,191,36,0.1) 0%, transparent 55%)',
                            opacity: healedOpacity,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
