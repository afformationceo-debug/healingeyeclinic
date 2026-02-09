"use client";

import { MapPin, Phone, Clock } from "lucide-react";

export default function Location() {
    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-black text-white border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Info */}
                    <div>
                        <span className="text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase block mb-4 sm:mb-6 text-sm sm:text-base">Location</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 sm:mb-10 md:mb-12">Visit Us</h2>

                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-start gap-4 sm:gap-6 group">
                                <div className="p-3 sm:p-4 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                                    <MapPin size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Address</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                                        서울특별시 강남구 강남대로 470 808타워 10-11층<br />
                                        (신논현역 6번 출구 도보 1분)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 sm:gap-6 group">
                                <div className="p-3 sm:p-4 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                                    <Phone size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Contact</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                                        02-566-1222<br />
                                        kakao @healingeye
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 sm:gap-6 group">
                                <div className="p-3 sm:p-4 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                                    <Clock size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Hours</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                                        평일: 09:30 - 18:30 (휴게시간 13:00 - 14:00)<br />
                                        금요일: 09:30 - 21:00 (야간진료)<br />
                                        토요일: 09:30 - 16:00<br />
                                        <span className="text-primary/70 text-xs sm:text-sm">일요일 / 공휴일 휴진</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Maps Embed */}
                    <div className="aspect-square bg-neutral-900 rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden relative border border-white/10">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.151229073344!2d127.0250471!3d37.504351199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e215e52105%3A0x899f64deccd60c27!2z7Z6Q66eB7JWI6rO8IEhFQUxJTkfnnLznp5Eg6Z-T5ZyL55y856eRIOmfk-Wci-i_keimlumbt-WwhCBzbWlsZSDpm7flsIQg44OS44O844Oq44Oz44Kw55y856eR!5e0!3m2!1sko!2skr!4v1770650017736!5m2!1sko!2skr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
