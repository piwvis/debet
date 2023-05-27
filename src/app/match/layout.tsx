"use client";

export default function MatchLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center items-center m-auto pt-10">
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
