'use client';

import Image from 'next/image';

interface PartnerCardProps {
  name: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

export function PartnerCard({ name, description, logoSrc, logoAlt, imageSrc, imageAlt, href = '#' }: PartnerCardProps) {
  return (
    <a href={href} className="group relative overflow-hidden flex flex-col w-full max-w-[360px] mx-auto aspect-[3/4] cursor-pointer bg-white border border-border rounded-xl hover:shadow-md transition-shadow duration-300 block">
      {/* Full-bleed image covering entire card */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 360px"
      />

      {/* Dark gradient overlay — image fades into darkness toward the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/85 via-40% to-transparent to-70%" />

      {/* Logo — top */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 h-12 w-24 bg-white/90 backdrop-blur-md rounded-lg flex items-center justify-center px-3">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={120}
          height={60}
          className="object-contain max-h-8"
          priority={false}
        />
      </div>

      {/* Content pinned to the bottom, sitting on the gradient */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col">
        {/* Title */}
        <h3 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-white leading-tight mb-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-white/75 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* White pill CTA */}
        <div className="w-full bg-white rounded-full py-3.5 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
          <span className="font-bold text-gray-900 text-base">Learn More</span>
        </div>
      </div>
    </a>
  );
}
