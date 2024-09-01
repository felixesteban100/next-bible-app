import Navbar from "@/components/navbar/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      {/* sticky top-0 z-50  */}
      <div className="bg-secondary/70 backdrop-blur-md p-2 h-fit hide_onFullScreen">
        <Navbar />
      </div>
      <main className="w-[90vw] md:w-[80vw] mx-auto overflow-hidden max-w-[1700px] pt-5 pb-10">
        {children}
      </main>
    </>
  )
}