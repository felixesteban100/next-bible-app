import Navbar from "@/components/navbar/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-secondary/70 backdrop-blur-md p-2 sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="w-[90vw] md:w-[80vw] mx-auto overflow-hidden max-w-[1700px]">
        <div
          className={`mx-auto mb-10 mt-5`}
        >
          <div
            className="flex justify-between items-center w-full mb-5"
          >
          </div>
          <div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}