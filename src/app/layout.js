
import Footer from '@/layout/footer';
import "./globals.css";
import ReduxProvider from '@/redux/ReduxProvider';
import Script from 'next/script';

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen transition-colors duration-200">
        <ReduxProvider>
        <main className="flex-grow">{children}</main>
        <Footer />
        </ReduxProvider>
        <Script
          src="https://www.unpkg.com/@heyform-inc/embed@latest/dist/index.umd.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
