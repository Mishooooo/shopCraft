import "./globals.css";
import Header from "@/components/header/Header";
import { Roboto } from "next/font/google";
import Footer from "@/components/footer.js/Footer";
import SessionProviderWrapper from "@/utils/session/SessionProviderWrapper";
 import StoreProvider from "@/store/storeProvider";
import WindowOverlay from "@/components/Overlay/WindowOverlay";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ShopCraft",
  description: "ShopCraft page",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <SessionProviderWrapper>
          <body className={roboto.className}>
            <Header />
            {children}
            <Footer />
          <WindowOverlay/>
          </body>
        </SessionProviderWrapper>
      </html>
    </StoreProvider>
  );
}
