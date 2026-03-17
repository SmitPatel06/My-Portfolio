import "./globals.css";

export const metadata = {
  title: "Smit Patel | Portfolio",
  description:
    "Portfolio of Smit Patel — Computer Science graduate student focused on web development, data, and cloud systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}