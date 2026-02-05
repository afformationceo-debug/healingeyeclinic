"use client";

import { MapPin, Phone, Clock } from "lucide-react";

export default function Location() {
    return (
        <section className="py-32 bg-black text-white border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Info */}
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-6">Location</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12">Visit Us</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-black transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Address</h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        서울특별시 강남구 강남대로 470 808타워 10-11층<br />
                                        (신논현역 6번 출구 도보 1분)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Contact</h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        02-566-1222<br />
                                        kakao @healingeye
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Hours</h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        평일: 09:30 - 18:30 (휴게시간 13:00 - 14:00)<br />
                                        금요일: 09:30 - 21:00 (야간진료)<br />
                                        토요일: 09:30 - 16:00<br />
                                        <span className="text-primary/70 text-sm">일요일 / 공휴일 휴진</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Visual (Abstract/Placeholder) */}
                    <div className="aspect-square bg-neutral-900 rounded-[3rem] overflow-hidden relative border border-white/10 group">
                        {/* Placeholder for real map API or static image */}
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/127.0276,37.4979,15,0/800x800@2x?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity bg-neutral-800" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute" />
                            <div className="w-4 h-4 bg-primary rounded-full relative z-10 box-content border-4 border-black" />
                        </div>
                        <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur px-6 py-3 rounded-xl border border-white/10">
                            <span className="text-white font-bold">신논현역 6번 출구</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
