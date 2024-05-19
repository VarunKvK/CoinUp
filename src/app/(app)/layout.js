import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "CoinUp",
  description: "A personal finance tracker for noobs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster />
          <div className="">{children}</div>
      </body>
    </html>
  );
}
