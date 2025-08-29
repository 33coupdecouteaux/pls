"use client";
import { trpc } from '@/lib/trpcClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusIcon, HomeIcon, EyeIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const listingsQuery = trpc.listing.list.useQuery();
  const listings = listingsQuery.data || [];
  
  const stats = {
    total: listings.length,
    published: listings.filter(l => l.status === 'published').length,
    draft: listings.filter(l => l.status === 'draft').length,
    withImages: listings.filter(l => l.imageUrls && l.imageUrls.length > 0).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord WelkomHOME
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create-listing">
            <PlusIcon className="w-4 h-4 mr-2" />
            Nouveau listing
          </Link>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Propriétés dans votre portfolio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiés</CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
            <p className="text-xs text-muted-foreground">
              Visibles publiquement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brouillons</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
            <p className="text-xs text-muted-foreground">
              En cours de rédaction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avec photos</CardTitle>
            <div className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-2 w-2 bg-green-600 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.withImages}</div>
            <p className="text-xs text-muted-foreground">
              Listings avec images
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Listings */}
      {stats.total > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Listings récents</CardTitle>
            <CardDescription>
              Vos dernières propriétés ajoutées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listings.slice(0, 5).map((listing) => (
                <div key={listing.id} className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                    {listing.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={listing.coverImageUrl} 
                        alt={listing.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HomeIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">
                      {listing.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {listing.location || 'Lieu non spécifié'}
                    </p>
                  </div>
                  <Badge variant={listing.status === 'published' ? 'default' : 'secondary'}>
                    {listing.status === 'published' ? 'Publié' : 'Brouillon'}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/listings">
                  Voir tous les listings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Empty State */
        <Card>
          <CardContent className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle className="mb-2">Commencez votre aventure immobilière</CardTitle>
              <CardDescription className="mb-6">
                Créez votre première annonce pour commencer à gérer votre portfolio
              </CardDescription>
              <Button asChild>
                <Link href="/dashboard/create-listing">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Créer votre première annonce
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
