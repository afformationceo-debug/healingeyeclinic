export default function Footer() {
    // const t = useTranslations('Common');
    return (
        <footer className="bg-background border-t border-white/10 py-12 sm:py-16 md:py-20 mt-12 sm:mt-16 md:mt-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-14 md:mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                            Healing Eye<span className="text-primary">.</span>
                        </h2>
                        <p className="text-muted-foreground max-w-md leading-relaxed text-sm sm:text-base">
                            Experience the new standard of vision correction.
                            Premium service, state-of-the-art technology, and a brand new life for your eyes.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 sm:mb-6 text-white text-base sm:text-lg">Contact</h3>
                        <ul className="space-y-3 sm:space-y-4 text-muted-foreground text-sm">
                            <li className="leading-relaxed">서울특별시 강남구 강남대로 470<br className="sm:hidden" /> 808타워 10-11층<br /><span className="text-xs text-muted-foreground/70">(신논현역 6번 출구 도보 1분)</span></li>
                            <li>
                                <a href="tel:+8225661222" className="hover:text-white transition-colors active:text-primary">
                                    02-566-1222
                                </a>
                            </li>
                            <li>
                                <span className="hover:text-white transition-colors">
                                    kakao @healingeye
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 sm:mb-6 text-white text-base sm:text-lg">Hours</h3>
                        <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm">
                            <li className="flex justify-between gap-4">
                                <span>Mon - Thu</span>
                                <span className="text-right">09:30 - 18:30</span>
                            </li>
                            <li className="text-xs text-muted-foreground/70 -mt-1 pl-4">휴게시간 13:00 - 14:00</li>
                            <li className="flex justify-between gap-4">
                                <span>Fri <span className="text-primary/80 text-xs">(야간진료)</span></span>
                                <span className="text-right">09:30 - 21:00</span>
                            </li>
                            <li className="flex justify-between gap-4">
                                <span>Sat</span>
                                <span className="text-right">09:30 - 16:00</span>
                            </li>
                            <li className="flex justify-between gap-4">
                                <span className="text-red-400">Sun / Holiday</span>
                                <span className="text-right">Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <p className="text-center md:text-left">
                        &copy; {new Date().getFullYear()} Healing Eye Clinic. All rights reserved.
                    </p>
                    <div className="flex gap-4 sm:gap-6">
                        <a href="#" className="hover:text-white transition-colors active:text-primary py-2">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors active:text-primary py-2">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
