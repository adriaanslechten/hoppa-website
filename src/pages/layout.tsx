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
              "@type": "Organization",
              "@id": "https://hoppa.fit/#organization",
              name: "Hoppa",
              url: "https://hoppa.fit",
              logo: {
                "@type": "ImageObject",
                url: "https://hoppa.fit/logo.png",
              },
              description:
                "Hoppa is an AI-powered fitness company building mobile apps that use pose detection to provide real-time workout feedback.",
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://hoppa.fit/#website",
              name: "Hoppa",
              url: "https://hoppa.fit",
              publisher: {
                "@id": "https://hoppa.fit/#organization",
              },
              inLanguage: "en-US",
            }),
          }}
        />

        {/* Structured Data - MobileApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              "@id": "https://hoppa.fit/#app",
              name: "Hoppa",
              description:
                "AI-powered fitness app with real-time pose detection for form correction, gamified workouts, and personalized training programs.",
              applicationCategory: "HealthApplication",
              operatingSystem: "iOS 14+, Android 10+",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              author: {
                "@id": "https://hoppa.fit/#organization",
              },
              featureList: [
                "Real-time AI pose detection",
                "Automatic rep counting",
                "Form correction feedback",
                "Gamified workout campaigns",
                "Personalized training plans",
                "Recovery and mobility exercises",
              ],
            }),
          }}
        />

        {/* Structured Data - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does Hoppa's AI pose detection work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Hoppa uses on-device machine learning to analyze your body position through your phone's camera. The AI identifies 17 key body landmarks and compares your form against optimal exercise positions, providing real-time feedback without sending any video data to external servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What exercises does Hoppa support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Hoppa supports a wide range of bodyweight exercises including squats, push-ups, lunges, planks, burpees, and more. The app continuously adds new exercises and workout routines based on user feedback.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Hoppa suitable for beginners?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Hoppa is designed for all fitness levels. Beginners benefit from real-time form correction to learn proper technique, while advanced users can track performance and progress through challenging campaigns.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Hoppa work offline?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, core features work offline. The AI runs entirely on your device. An internet connection is only needed for syncing progress, accessing the community forum, and downloading new content.",
                  },
                },
              ],
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
