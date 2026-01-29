import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import "@/app/globals.css"; // Ensure absolute import or adjust path
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GlobalMessenger from "@/components/ui/GlobalMessenger";

export const metadata = {
    title: "힐링안과 | Healing Eye Premium",
    description: "Healing Eye Clinic - Premium Vision Correction",
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className="dark">
            {/* Font is applied via globals.css :root variables mapping to font-sans */}
            <body className={`font-sans antialiased selection:bg-primary selection:text-primary-foreground cursor-auto md:cursor-none`}>
                <NextIntlClientProvider messages={messages}>
                    <CustomCursor />
                    <GlobalMessenger />
                    <SmoothScroll>
                        <Navbar />
                        <main className="min-h-screen">
                            {children}
                        </main>
                        <Footer />
                    </SmoothScroll>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
