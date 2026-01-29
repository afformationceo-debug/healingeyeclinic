export default function Footer() {
    // const t = useTranslations('Common');
    return (
        <footer className="bg-background border-t border-white/10 py-20 mt-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="font-serif text-3xl font-bold mb-6">Healing Eye<span className="text-primary">.</span></h2>
                        <p className="text-muted-foreground max-w-md leading-relaxed">
                            Experience the new standard of vision correction.
                            Premium service, state-of-the-art technology, and a brand new life for your eyes.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-white">Contact</h3>
                        <ul className="space-y-4 text-muted-foreground text-sm">
                            <li>Gangnam-gu, Seoul, Korea</li>
                            <li>+82 2-1234-5678</li>
                            <li>contact@healingeye.co.kr</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-white">Hours</h3>
                        <ul className="space-y-4 text-muted-foreground text-sm">
                            <li className="flex justify-between"><span>Mon - Fri</span> <span>09:30 - 18:30</span></li>
                            <li className="flex justify-between"><span>Sat</span> <span>09:30 - 16:00</span></li>
                            <li className="flex justify-between"><span className="text-red-400">Sun / Holiday</span> <span>Closed</span></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Healing Eye Clinic. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
