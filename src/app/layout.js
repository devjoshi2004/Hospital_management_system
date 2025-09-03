
import Footer from '@/layout/footer';
import "./globals.css";
import ReduxProvider from '@/redux/ReduxProvider';

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen transition-colors duration-200">
        <ReduxProvider>
        <main className="flex-grow">{children}</main>
        <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
