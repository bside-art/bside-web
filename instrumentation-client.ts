import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://e59b17ae22dfce1683065c13368134cf@o4511094294511616.ingest.us.sentry.io/4511228261498880",

  enabled: process.env.NODE_ENV === "production",
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? process.env.NODE_ENV,

  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

  enableLogs: true,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
