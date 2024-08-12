import Image from "next/image";
import backgroundCharacters from '@/assets/background_characters.jpg';
import background_image from '@/assets/background.jpg';


export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            //
            // className="min-h-screen w-full flex justify-center items-center bg-[url('../assets/background_characters.jpg')] bg-no-repeat bg-cover bg-center bg-fixed backdrop-blur-lg"
            className="relative min-h-screen w-full flex justify-center items-center "
        >
            <Image
                // src="https://christianpublishinghouse.co/wp-content/uploads/2023/12/Biblical-Archaeology-and-In-Athens-Paul-preaches-to-the-philosophers-on-Mars-Hill-HEADER-1200x675-02.jpg"
                // src={backgroundCharacters}
                src={background_image}
                alt="background_characters"
                width={800}
                height={800}
                className="absolute h-full w-full blur-sm object-cover"
            />
            <div className="w-full h-full absolute bg-background/50" />
            <div className="z-50">
                {children}
            </div>
        </div>
    )
}