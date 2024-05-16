import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ConinUp",
  description: "A personal finance tracker for noobs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
