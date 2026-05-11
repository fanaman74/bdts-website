'use client';

import Image from 'next/image';

interface PartnerCardProps {
  name: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  imageSrc: string;
  imageAlt: string;
}

export function PartnerCard({ name, description, logoSrc, logoAlt, imageSrc, imageAlt }: PartnerCardProps) {
  return (
    <div className="group bg-white border border-light-gray rounded-lg overflow-hidden hover:shadow-lg hover:border-gold transition-all duration-300">
      {/* Image Banner */}
      <div className="relative w-full h-40 bg-gradient-to-br from-navy to-navy/60 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Logo */}
        <div className="flex justify-center mb-4 h-16">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={120}
            height={60}
            className="object-contain"
            priority={false}
          />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold text-navy text-center mb-3">{name}</h3>
        <p className="text-mid-gray text-center text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
