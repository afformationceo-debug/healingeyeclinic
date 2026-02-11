import '@/app/globals.css';

export const metadata = {
  title: 'SEO Manager | Healing Eye Clinic',
  robots: 'noindex,nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body className="font-sans antialiased bg-[#0a0a0a] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
