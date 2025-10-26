import Head from "next/head";
import styles from "./layout.module.css";
import TopNavBar from "../components/TopNavBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Hoppa - AI-Powered Fitness App | Real-time Pose Detection</title>
        <meta
          name="description"
          content="Transform your fitness journey with Hoppa's AI-powered pose detection, gamified workouts, and personalized training. Stay fit, recover, and thrive from your mobile device."
        />
        <meta
          name="keywords"
          content="fitness app, AI pose detection, workout app, mobile fitness, exercise tracking, gamified fitness, recovery exercises, personal trainer app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hoppa Fitness" />
        <link rel="canonical" href="https://hoppa.fit" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hoppa - AI-Powered Fitness App" />
        <meta
          property="og:description"
          content="Transform your fitness journey with AI-powered pose detection, gamified workouts, and personalized training."
        />
        <meta property="og:image" content="/hero-image.jpg" />
        <meta property="og:url" content="https://hoppa.fit" />
        <meta property="og:site_name" content="Hoppa" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Hoppa - AI-Powered Fitness App" />
        <meta
          property="twitter:description"
          content="Transform your fitness journey with AI-powered pose detection and gamified workouts."
        />
        <meta property="twitter:image" content="/hero-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e83f6f" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Hoppa",
              description: "AI-powered fitness app with real-time pose detection and gamified workouts",
              applicationCategory: "HealthApplication",
              operatingSystem: "iOS, Android",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </Head>
      <TopNavBar />
      <div className={styles.mainContent}>{children}</div>
      {/* Fixed viewport bottom fade overlay */}
      <div className={styles.viewportBottomFade} aria-hidden="true" />
    </>
  );
}
