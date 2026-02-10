import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('Footer');
    return (
        <footer className="bg-background border-t border-white/10 py-12 sm:py-16 md:py-20 mt-12 sm:mt-16 md:mt-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-14 md:mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                            {t('brandName')}<span className="text-primary">.</span>
                        </h2>
                        <p className="text-muted-foreground max-w-md leading-relaxed text-sm sm:text-base whitespace-pre-line">
                            {t('tagline')}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 sm:mb-6 text-white text-base sm:text-lg">{t('contact.title')}</h3>
                        <ul className="space-y-3 sm:space-y-4 text-muted-foreground text-sm">
                            <li className="leading-relaxed">{t('contact.address')}<br /><span className="text-xs text-muted-foreground/70">{t('contact.addressSub')}</span></li>
                            <li>
                                <a href="tel:+8225661222" className="hover:text-white transition-colors active:text-primary">
                                    {t('contact.phone')}
                                </a>
                            </li>
                            <li>
                                <span className="hover:text-white transition-colors">
                                    {t('contact.kakao')}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 sm:mb-6 text-white text-base sm:text-lg">{t('hours.title')}</h3>
                        <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm">
                            <li className="flex justify-between gap-4">
                                <span>{t('hours.weekday')}</span>
                                <span className="text-right">{t('hours.weekdayTime')}</span>
                            </li>
                            <li className="text-xs text-muted-foreground/70 -mt-1 pl-4">{t('hours.lunchBreak')}</li>
                            <li className="flex justify-between gap-4">
                                <span>{t('hours.friday')} <span className="text-primary/80 text-xs">{t('hours.fridayLabel')}</span></span>
                                <span className="text-right">{t('hours.fridayTime')}</span>
                            </li>
                            <li className="flex justify-between gap-4">
                                <span>{t('hours.saturday')}</span>
                                <span className="text-right">{t('hours.saturdayTime')}</span>
                            </li>
                            <li className="flex justify-between gap-4">
                                <span className="text-red-400">{t('hours.closed')}</span>
                                <span className="text-right">{t('hours.closedStatus')}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <p className="text-center md:text-left">
                        &copy; {new Date().getFullYear()} {t('copyright')}
                    </p>
                    <div className="flex gap-4 sm:gap-6">
                        <a href="#" className="hover:text-white transition-colors active:text-primary py-2">
                            {t('privacyPolicy')}
                        </a>
                        <a href="#" className="hover:text-white transition-colors active:text-primary py-2">
                            {t('termsOfService')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
