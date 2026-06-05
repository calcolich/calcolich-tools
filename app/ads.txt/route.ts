const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
const publisherId = adsenseClientId.replace(/^ca-/, "");

export function GET() {
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# Add NEXT_PUBLIC_ADSENSE_CLIENT_ID in Vercel to enable ads.txt\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
