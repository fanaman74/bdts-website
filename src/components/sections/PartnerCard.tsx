'use client';

import Image from 'next/image';

interface PartnerCardProps {
  name: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
}

export function PartnerCard({ name, description, logoSrc, logoAlt }: PartnerCardProps) {
  return (
    <div className="group bg-white border border-light-gray rounded-lg p-8 hover:shadow-lg hover:border-gold transition-all duration-300">
      <div className="flex justify-center mb-6 h-24 flex-shrink-0">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={180}
          height={80}
          className="object-contain"
          priority={false}
        />
      </div>
      <h3 className="text-lg font-semibold text-navy text-center mb-3">{name}</h3>
      <p className="text-mid-gray text-center text-sm">{description}</p>
    </div>
  );
}
