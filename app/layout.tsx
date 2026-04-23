import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "./theme-provider";
// import { MobileTapFix } from "./mobile-tap-fix";
import { Yeseva_One, Outfit } from 'next/font/google';

const yesevaOne = Yeseva_One({
  weight: "400", // Yeseva One only has 400
  subsets: ["latin"],
  variable: "--font-yeseva-one", // optional CSS variable
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${yesevaOne.variable} ${outfit.variable}`}>
      <body>
        <Providers>
          <ThemeProvider>
            {/* <MobileTapFix /> */}
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
