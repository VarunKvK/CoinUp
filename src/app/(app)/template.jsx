import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "CoinUp",
  description: "A personal finance tracker for noobs",
};

export default async function PageTemplate({children}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        {/* <Toaster /> */}
        <main>
          <Header />
          <div className="">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
