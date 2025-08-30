"use client";
import { useMemo, useState } from "react";
import { ProjectItem } from '@/components/landing/project-item';
import type { ProjectItemFragment } from '@/lib/basehub';

interface Listing {
  id: string;
  title: string;
  location?: string | null;
  cityQuarter?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  beds?: number | null;
  priceMinWeekly?: number | null;
  priceMaxWeekly?: number | null;
  coverImageUrl?: string | null;
  imageUrls?: string[] | null;
  features?: string[] | null;
  description?: string | null;
  status: string;
}

interface ListingsBrowserProps {
  listings: Listing[];
  projectItems: ProjectItemFragment[]; // mapped server fragments
}

export function ListingsBrowser({ listings, projectItems }: ListingsBrowserProps) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minBedrooms, setMinBedrooms] = useState<string>("");

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (search) {
        const s = search.toLowerCase();
        if (!(`${l.title}`.toLowerCase().includes(s) || `${l.location || ''}`.toLowerCase().includes(s) || `${l.cityQuarter || ''}`.toLowerCase().includes(s))) return false;
      }
      if (minBedrooms) {
        const mb = parseInt(minBedrooms, 10) || 0;
        if ((l.bedrooms || 0) < mb) return false;
      }
      if (minPrice) {
        const p = parseInt(minPrice, 10) || 0;
        if ((l.priceMinWeekly || 0) < p) return false;
      }
      if (maxPrice) {
        const p = parseInt(maxPrice, 10) || 0;
        if ((l.priceMinWeekly || 0) > p) return false;
      }
      return true;
    });
  }, [listings, search, minPrice, maxPrice, minBedrooms]);

  return (
    <div>
      <div className="mb-8 rounded-xl border bg-white px-4 py-4 md:py-5 flex flex-col gap-4 md:gap-3 md:flex-row md:items-end md:flex-wrap shadow-sm">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-semibold tracking-wide uppercase text-neutral-500 mb-1">Recherche</label>
          <input
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            placeholder="Titre ou localisation"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="w-28">
          <label className="block text-[11px] font-semibold tracking-wide uppercase text-neutral-500 mb-1">Min €</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e)=> setMinPrice(e.target.value)}
            className="w-full rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            min={0}
          />
        </div>
        <div className="w-28">
          <label className="block text-[11px] font-semibold tracking-wide uppercase text-neutral-500 mb-1">Max €</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e)=> setMaxPrice(e.target.value)}
            className="w-full rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            min={0}
          />
        </div>
        <div className="w-32">
          <label className="block text-[11px] font-semibold tracking-wide uppercase text-neutral-500 mb-1">Chambres ≥</label>
          <input
            type="number"
            value={minBedrooms}
            onChange={(e)=> setMinBedrooms(e.target.value)}
            className="w-full rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
            min={0}
          />
        </div>
        <div className="ml-auto text-[11px] font-medium text-neutral-500 self-center">
          {filtered.length} / {listings.length} biens
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10'>
        {filtered.map((l) => {
          const idx = listings.findIndex(x => x.id === l.id);
            const p = projectItems[idx];
            if (!p) return null;
            return (
              <div key={p._slug || l.id} className='p-1 sm:p-2'>
                <ProjectItem
                  project={p}
                  mode='grid'
                  className='rounded-xl'
                  overrideTitle={l.title}
                  overrideSubtitle={l.cityQuarter || l.location || undefined}
                  overrideImageSrc={l.coverImageUrl || l.imageUrls?.[0]}
                  overrideImageAlt={l.title}
                  stats={{
                    bedrooms: l.bedrooms,
                    beds: l.beds,
                    bathrooms: l.bathrooms,
                    priceMinWeekly: l.priceMinWeekly,
                    priceMaxWeekly: l.priceMaxWeekly,
                  }}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
