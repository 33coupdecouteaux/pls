"use client";
import { trpc } from '@/lib/trpcClient';
import { useState } from 'react';
import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/server/trpc/appRouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusIcon, EditIcon, TrashIcon, HomeIcon, SaveIcon, XIcon } from 'lucide-react';
import { LISTING_FEATURES } from '@/lib/listingFeatures';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';

type Listings = inferRouterOutputs<AppRouter>['listing']['list'];
type Listing = Listings[number];

interface EditData {
  title: string;
  description?: string;
  location?: string;
  cityQuarter?: string;
  fullAddress?: string;
  features?: string[];
  status?: 'draft' | 'published';
  bedrooms?: number;
  bathrooms?: number;
  beds?: number;
  priceMinWeekly?: number;
  priceMaxWeekly?: number;
}

export default function ListingsPage() {
  const listQuery = trpc.listing.list.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.listing.delete.useMutation({
    onSuccess: () => utils.listing.list.invalidate()
  });
  const updateMutation = trpc.listing.update.useMutation({
    onSuccess: () => {
      setEditId(null);
      utils.listing.list.invalidate();
    }
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditData>({ title: '', description: '', location: '', cityQuarter: '', fullAddress: '', features: [], status: 'draft', bedrooms: 0, bathrooms: 0, beds: 0 });
  const [pendingDelete, setPendingDelete] = useState<Listing | null>(null);

  const listings = listQuery.data || [];

  const toggleStatus = (listing: Listing) => {
    const newStatus = listing.status === 'published' ? 'draft' : 'published';
    updateMutation.mutate({ id: listing.id, status: newStatus });
  };

  const startEdit = (listing: Listing) => {
    setEditId(listing.id);
    setEditData({
      title: listing.title,
      description: listing.description || '',
      location: listing.location || '',
      cityQuarter: listing.cityQuarter || '',
      fullAddress: listing.fullAddress || '',
      features: listing.features || [],
  status: listing.status as 'draft' | 'published',
  bedrooms: listing.bedrooms || 0,
  bathrooms: listing.bathrooms || 0,
  beds: listing.beds || 0,
  priceMinWeekly: listing.priceMinWeekly || undefined,
  priceMaxWeekly: listing.priceMaxWeekly || undefined
    });
  };

  const saveEdit = () => {
    if (!editId) return;
    updateMutation.mutate({ 
      id: editId, 
      ...editData,
      features: editData.features as any
    });
  };

  const cancelEdit = () => {
    setEditId(null);
  setEditData({ title: '', description: '', location: '', cityQuarter: '', fullAddress: '', features: [], status: 'draft', bedrooms: 0, bathrooms: 0, beds: 0 });
  };

  const toggleFeature = (feature: string) => {
    setEditData(prev => ({
      ...prev,
      features: prev.features?.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...(prev.features || []), feature]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Mes Listings</h1>
          <p className="text-muted-foreground">
            Gérez vos propriétés et annonces
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create-listing">
            <PlusIcon className="w-4 h-4 mr-2" />
            Nouveau listing
          </Link>
        </Button>
      </div>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les listings ({listings.length})</CardTitle>
          <CardDescription>
            Vue d'ensemble de vos propriétés
          </CardDescription>
        </CardHeader>
        <CardContent>
          {listQuery.isLoading && <p>Chargement...</p>}
          {listings.length === 0 && !listQuery.isLoading && (
            <div className="text-center py-12">
              <HomeIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun listing pour le moment.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/create-listing">Créer votre premier listing</Link>
              </Button>
            </div>
          )}
          
          {listings.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead>Titre & Description</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Caractéristiques</TableHead>
                  <TableHead>Capacité & Prix</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((l: Listing) => {
                  const isEditing = editId === l.id;
                  return (
                    <TableRow key={l.id} className={isEditing ? "bg-muted/30" : ""}>
                      <TableCell>
                        <div className="w-16 h-12 bg-muted rounded overflow-hidden">
                          {l.coverImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={l.coverImageUrl} 
                              alt={l.title} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <HomeIcon className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {isEditing ? (
                          <div className="space-y-2">
                            <Input
                              value={editData.title}
                              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Titre"
                              className="w-full"
                            />
                            <Textarea
                              value={editData.description || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Description"
                              rows={2}
                              className="w-full"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium truncate">{l.title}</p>
                            {l.description && (
                              <p className="text-xs text-muted-foreground truncate mt-1">
                                {l.description}
                              </p>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {isEditing ? (
                          <div className="space-y-2">
                            <Input
                              value={editData.location || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                              placeholder="Ville"
                              className="w-full"
                            />
                            <Input
                              value={editData.cityQuarter || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, cityQuarter: e.target.value }))}
                              placeholder="Quartier"
                              className="w-full"
                            />
                            <Input
                              value={editData.fullAddress || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, fullAddress: e.target.value }))}
                              placeholder="Adresse complète"
                              className="w-full"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm">{l.location || '—'}</p>
                            {l.cityQuarter && (
                              <p className="text-xs text-muted-foreground">{l.cityQuarter}</p>
                            )}
                            {l.fullAddress && (
                              <p className="text-xs text-muted-foreground truncate">{l.fullAddress}</p>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={l.status === 'published' ? 'default' : 'secondary'}>
                            {l.status === 'published' ? 'Publié' : 'Brouillon'}
                          </Badge>
                          {!isEditing && (
                            <Switch
                              checked={l.status === 'published'}
                              onCheckedChange={() => toggleStatus(l)}
                              disabled={updateMutation.status === 'pending'}
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {isEditing ? (
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {LISTING_FEATURES.slice(0, 8).map(feature => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${l.id}-${feature}`}
                                  checked={editData.features?.includes(feature)}
                                  onCheckedChange={() => toggleFeature(feature)}
                                />
                                <Label htmlFor={`${l.id}-${feature}`} className="text-xs">
                                  {feature.replace(/_/g, ' ')}
                                </Label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {l.features?.slice(0, 3).map(feature => (
                              <Badge key={feature} variant="outline" className="text-[10px] px-1 py-0">
                                {feature.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                            {l.features && l.features.length > 3 && (
                              <Badge variant="outline" className="text-[10px] px-1 py-0">
                                +{l.features.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {isEditing ? (
                          <div className="space-y-3 w-52">
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label htmlFor={`bedrooms-${l.id}`}>Ch</Label>
                                <Input
                                  id={`bedrooms-${l.id}`}
                                  type="number"
                                  min={0}
                                  value={editData.bedrooms ?? 0}
                                  onChange={e=> setEditData(p=> ({...p, bedrooms: parseInt(e.target.value || '0',10)}))}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`bathrooms-${l.id}`}>Sdb</Label>
                                <Input
                                  id={`bathrooms-${l.id}`}
                                  type="number"
                                  min={0}
                                  value={editData.bathrooms ?? 0}
                                  onChange={e=> setEditData(p=> ({...p, bathrooms: parseInt(e.target.value || '0',10)}))}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`beds-${l.id}`}>Lits</Label>
                                <Input
                                  id={`beds-${l.id}`}
                                  type="number"
                                  min={0}
                                  value={editData.beds ?? 0}
                                  onChange={e=> setEditData(p=> ({...p, beds: parseInt(e.target.value || '0',10)}))}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor={`priceMin-${l.id}`}>Min €/sem</Label>
                                <Input
                                  id={`priceMin-${l.id}`}
                                  type="number"
                                  min={0}
                                  value={editData.priceMinWeekly ?? ''}
                                  onChange={e=> setEditData(p=> ({...p, priceMinWeekly: e.target.value === '' ? undefined : parseInt(e.target.value,10)}))}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`priceMax-${l.id}`}>Max €/sem</Label>
                                <Input
                                  id={`priceMax-${l.id}`}
                                  type="number"
                                  min={0}
                                  value={editData.priceMaxWeekly ?? ''}
                                  onChange={e=> setEditData(p=> ({...p, priceMaxWeekly: e.target.value === '' ? undefined : parseInt(e.target.value,10)}))}
                                />
                              </div>
                            </div>
                            {editData.priceMinWeekly != null && editData.priceMaxWeekly != null && editData.priceMinWeekly > editData.priceMaxWeekly && (
                              <p className="text-[10px] text-destructive">Min {'>'} Max</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground space-y-1 w-52">
                            <div className="flex gap-3">
                              {l.bedrooms != null && l.bedrooms > 0 && <span>{l.bedrooms} ch</span>}
                              {l.bathrooms != null && l.bathrooms > 0 && <span>{l.bathrooms} sdb</span>}
                              {l.beds != null && l.beds > 0 && <span>{l.beds} lits</span>}
                            </div>
                            {(l.priceMinWeekly || l.priceMaxWeekly) && (
                              <div>
                                <span>
                                  {formatPriceDisplay(l.priceMinWeekly, l.priceMaxWeekly)}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(l.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {isEditing ? (
                            <>
                              <Button 
                                size="sm" 
                                onClick={saveEdit}
                                disabled={updateMutation.status === 'pending'}
                              >
                                <SaveIcon className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={cancelEdit}
                              >
                                <XIcon className="w-3 h-3" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEdit(l)}
                              >
                                <EditIcon className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setPendingDelete(l)}
                              >
                                <TrashIcon className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!pendingDelete} onOpenChange={(o)=> !o && setPendingDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le listing ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Confirmez la suppression de « {pendingDelete?.title} ».
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline' onClick={()=> setPendingDelete(null)}>Annuler</Button>
            </DialogClose>
            <Button variant='destructive' onClick={() => { if(pendingDelete){ deleteMutation.mutate({ id: pendingDelete.id }); setPendingDelete(null);} }} disabled={deleteMutation.status==='pending'}>
              {deleteMutation.status==='pending' ? 'Suppression...' : 'Confirmer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function formatPriceDisplay(min?: number | null, max?: number | null) {
  if (min && max) return `${new Intl.NumberFormat('fr-FR').format(min)} - ${new Intl.NumberFormat('fr-FR').format(max)}€ /sem`;
  if (min) return `${new Intl.NumberFormat('fr-FR').format(min)}€ /sem`;
  if (max) return `jusqu'à ${new Intl.NumberFormat('fr-FR').format(max)}€ /sem`;
  return '';
}
