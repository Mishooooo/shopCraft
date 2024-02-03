"use client";

import ErrorPage from "@/components/error/ErrorPage";
import Footer from "@/components/footer.js/Footer";
import Header from "@/components/header/Header";
import StoreProvider from "@/store/storeProvider";
import SessionProviderWrapper from "@/utils/session/SessionProviderWrapper";

export const dynamic = "force-dynamic";


export default function Error({ error, reset }) {
  return (
    <StoreProvider>
      <html lang="en">
        <SessionProviderWrapper>
          <body>
            <Header />
            <ErrorPage error={error} reset={reset} />
            <Footer />
          </body>
        </SessionProviderWrapper>
      </html>
    </StoreProvider>
  );
}
