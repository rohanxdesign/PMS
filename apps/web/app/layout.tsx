import "./globals.css";
import { LeadsProvider } from "./context/LeadsContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: 'white'}}>
        <LeadsProvider>
          {children}
        </LeadsProvider>
      </body>
    </html>
  );
}
