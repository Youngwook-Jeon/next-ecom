export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>ContactLayout</div>
      {children}
    </div>
  );
}
