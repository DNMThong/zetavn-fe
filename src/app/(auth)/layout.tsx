import "@/assets/scss/core.scss";
import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import { Providers } from "@/redux/provider";
import AuthRoute from "./../../components/route/AuthRoute";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Zetavn",
  description: "Zetavn",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  icons: {
    icon: "favicon.png",
  },
};

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link
          href="https://cdn.jsdelivr.net/npm/fontisto@v3.0.4/css/fontisto/fontisto-brands.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.2.96/css/materialdesignicons.min.css"
          rel="stylesheet"></link>
      </head>
      <body className={`${roboto.className}`}>
        <Providers>
          <AuthRoute>
            <div className="signup-wrapper">{children}</div>
          </AuthRoute>
        </Providers>
      </body>
    </html>
  );
}
