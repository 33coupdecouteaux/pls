import { appRouter } from '@/server/trpc/appRouter';
import { createContext } from '@/server/trpc/context';
import { ProjectItem } from '@/components/landing/project-item';
import { ListingsBrowser } from '@/components/listings-browser';
import type { ProjectItemFragment } from '@/lib/basehub';

export const dynamic = 'force-dynamic';

// Adapter pour transformer un listing en ProjectItemFragment minimal
function listingToProjectItem(listing: {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  features: string[] | null;
  coverImageUrl: string | null;
  imageUrls: string[] | null;
}): ProjectItemFragment {
  return {
    _title: listing.title,
    _slug: listing.id,
    description: { json: [], text: listing.description || '' },
    year: null,
    location: listing.location,
    client: { json: [], text: '' },
    category: listing.features || [],
    opengraphImage: listing.coverImageUrl
      ? { url: listing.coverImageUrl, width: 1200, height: 630 }
      : null,
    mainImage: listing.coverImageUrl
      ? { url: listing.coverImageUrl, alt: listing.title }
      : null,
    gallery: (listing.imageUrls && listing.imageUrls.length > 0
      ? listing.imageUrls.map((url: string) => ({ url, alt: listing.title }))
      : null),
    media: {
      items: (listing.imageUrls && listing.imageUrls.length > 0
        ? listing.imageUrls
        : listing.coverImageUrl
          ? [listing.coverImageUrl]
          : []).map((url: string) => ({
            media: {
              __typename: 'BlockImage',
              url,
              alt: listing.title,
              width: 1600,
              height: 1200,
              blurDataURL: url,
            },
          })),
    },
  } as unknown as ProjectItemFragment;
}

export default async function NosBiensPage() {
  const ctx = await createContext();
  const caller = appRouter.createCaller(ctx);
  const listings = await caller.listing.list();

  // déjà filtré published au niveau du router, fallback si besoin
  const published = (listings || []).filter(l => l.status === 'published');
  const projectItems = published.map(listingToProjectItem);

  return (
    <main className='px-sides mb-24'>
      <div className='max-w-6xl mx-auto'>
        {/* Social links moved higher than the text */}
        <div className='pt-10 lg:pt-16 lg:pl-4 xl:pl-8 max-lg:hidden'>
          <ul className='flex flex-col'>
            {[
              { label: 'HOME', href: '/' },
              { label: 'BLOG', href: '/blog' },
              { label: 'JOIN US', href: '/join-us' },
              { label: '@INSTAGRAM', href: 'https://instagram.com' },
            ].map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className='text-subtitle font-semibold text-neutral-900 hover:text-neutral-500 transition-colors duration-300 ease-quad-out'
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                  {i === 0 && (
                    <span aria-hidden className='text-heading text-transparent'>a</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {projectItems.length > 0 ? (
          <section className='pt-6'>
            {/* Titre principal au-dessus de la cover */}
            <h1 className='text-heading font-black font-libertinus leading-tight text-3xl md:text-5xl xl:text-6xl tracking-tight text-center text-neutral-900 mb-8 md:mb-12'>
              Découvrez nos biens d'exception
            </h1>
            
            {/* Cover sans le titre overlay */}
            <div className='relative mb-10 rounded-2xl overflow-hidden shadow-sm'>
              <ProjectItem
                project={projectItems[0]}
                mode='featured'
                className='rounded-2xl'
                overrideTitle={'Les Issambres,'}
                overrideSubtitle={'French Riviera'}
                overrideImageSrc={'/plage.png'}
                overrideImageAlt={'Plage Les Issambres French Riviera'}
              />
            </div>
            <div className='flex items-center justify-center mb-8 md:mb-10'>
              <div className='h-px w-48 md:w-72 bg-neutral-300 rounded-full' />
            </div>
            <ListingsBrowser listings={published} projectItems={projectItems} />
          </section>
        ) : (
          <div className='py-24 text-center text-neutral-500'>Aucun bien publié pour le moment.</div>
        )}
      </div>
      
    </main>
  );
}
