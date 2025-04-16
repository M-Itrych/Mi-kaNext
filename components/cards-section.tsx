import { Card } from "./card"

export const CardsSection = () => {
    const cardsData = [
        {
          title: "Hurtownia Instalacyjna",
          icon: "warehouse" as const,
          imageSrc: "/hurtownia.jpg",
          altText: "Warehouse workers organizing packages",
          navTo: "/hurtownia"
        },
        {
          title: "Biuro Projektowe",
          icon: "design" as const,
          imageSrc: "/projekty.jpg",
          altText: "Design office with house model",
            navTo: "/projekty"
        },
        {
          title: "Serwis",
          icon: "service" as const,
          imageSrc: "/serwis.jpg",
          altText: "Service technician with wrench",
          navTo: "/serwis"
        }
      ];
    return (
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-20 px-4 py-8">
            {cardsData.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    )
}