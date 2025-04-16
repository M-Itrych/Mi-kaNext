import { Warehouse, FileText, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  title: string;
  icon: 'warehouse' | 'design' | 'service';
  imageSrc: string;
  altText: string;
  navTo: string;
};

export const Card: React.FC<CardProps> = ({ title, icon, imageSrc, altText, navTo }) => {
  const getIcon = () => {
    switch (icon) {
      case 'warehouse':
        return <Warehouse size={32} />;
      case 'design':
        return <FileText size={32} />;
      case 'service':
        return <Wrench size={32} />;
      default:
        return <Warehouse size={32} />;
    }
  };

  return (
    <Link href={navTo}>
    <div className="relative w-full sm:w-80 md:w-96 h-96 sm:h-112 md:h-100 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="h-3/4 w-full relative">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 320px, 384px"
          style={{ objectFit: "cover" }}
          className="rounded-t-lg"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-[#f80] p-4 h-1/4">
        <div className="absolute -top-8 left-4 bg-white p-2 rounded-full">
          <div className="bg-[#f80] p-2 rounded-full text-white">
            {getIcon()}
          </div>
        </div>
        <h3 className="text-white text-xl font-bold mt-4">{title} d</h3>
      </div>
    </div>
    </Link>
  );
};