"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpcClient';
import { LISTING_FEATURES } from '@/lib/listingFeatures';
import { ListingImageUploader } from '@/components/upload/listing-image-uploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HomeIcon, MapPinIcon, ImageIcon, StarIcon, SaveIcon, EyeIcon } from 'lucide-react';

interface FormState {
  title: string;
  description: string;
  location: string;
  cityQuarter: string;
  fullAddress: string;
  status: 'draft' | 'published';
  features: string[];
  imageUrls: string[];
  coverImageUrl?: string;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  priceMinWeekly?: number;
  priceMaxWeekly?: number;
}

const initial: FormState = {
  title: '',
  description: '',
  location: '',
  cityQuarter: '',
  fullAddress: '',
  status: 'draft',
  features: [],
  imageUrls: [],
  bedrooms: 0,
  bathrooms: 0,
  beds: 0
};

export default function CreateListingPage() {
  const [form, setForm] = useState<FormState>(initial);
  const router = useRouter();
  const utils = trpc.useUtils();
  const create = trpc.listing.create.useMutation({
    onSuccess: () => { utils.listing.list.invalidate(); router.push('/dashboard/listings'); }
  });

  const toggleFeature = (f: string) => setForm(s => ({
    ...s,
    features: s.features.includes(f) ? s.features.filter(x=>x!==f) : [...s.features, f]
  }));

  const removeImage = (url: string) => setForm(s => {
    const next = s.imageUrls.filter(u=>u!==url);
    return { ...s, imageUrls: next, coverImageUrl: s.coverImageUrl===url? next[0]: s.coverImageUrl };
  });
  const setCover = (url: string) => setForm(s => ({ ...s, coverImageUrl: url }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate({
      title: form.title,
      description: form.description || undefined,
      location: form.location || undefined,
      cityQuarter: form.cityQuarter || undefined,
      fullAddress: form.fullAddress || undefined,
      status: form.status,
      features: form.features as any,
      imageUrls: form.imageUrls,
  coverImageUrl: form.coverImageUrl,
  bedrooms: form.bedrooms,
  bathrooms: form.bathrooms,
  beds: form.beds,
  priceMinWeekly: form.priceMinWeekly,
  priceMaxWeekly: form.priceMaxWeekly
    });
  };

  const saveDraft = () => {
    const draftData = { ...form, status: 'draft' as const };
    create.mutate({
      title: draftData.title,
      description: draftData.description || undefined,
      location: draftData.location || undefined,
      cityQuarter: draftData.cityQuarter || undefined,
      fullAddress: draftData.fullAddress || undefined,
      status: draftData.status,
      features: draftData.features as any,
      imageUrls: draftData.imageUrls,
  coverImageUrl: draftData.coverImageUrl,
  bedrooms: draftData.bedrooms,
  bathrooms: draftData.bathrooms,
  beds: draftData.beds,
  priceMinWeekly: draftData.priceMinWeekly,
  priceMaxWeekly: draftData.priceMaxWeekly
    });
  };

  const isFormValid = form.title.trim().length >= 3;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HomeIcon className="w-8 h-8" />
            Créer un nouveau listing
          </h1>
          <p className="text-muted-foreground mt-1">
            Ajoutez une nouvelle propriété à votre portfolio
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {form.status === 'published' ? 'Publié' : 'Brouillon'}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={submit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5" />
                  Informations de base
                </CardTitle>
                <CardDescription>
                  Les détails essentiels de votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de l'annonce *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={e=>setForm(s=>({...s,title:e.target.value}))}
                    placeholder="Ex: Magnifique appartement avec vue sur mer"
                    required
                  />
                  {form.title.length > 0 && form.title.length < 3 && (
                    <p className="text-sm text-destructive">Le titre doit contenir au moins 3 caractères</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={e=>setForm(s=>({...s,description:e.target.value}))}
                    placeholder="Décrivez votre propriété en détail..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut de publication</Label>
                  <Select value={form.status} onValueChange={(value: 'draft' | 'published') => setForm(s=>({...s,status:value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  Localisation
                </CardTitle>
                <CardDescription>
                  Où se trouve votre propriété ?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ville</Label>
                    <Input
                      id="location"
                      value={form.location}
                      onChange={e=>setForm(s=>({...s,location:e.target.value}))}
                      placeholder="Ex: Nice, Cannes, Monaco..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cityQuarter">Quartier</Label>
                    <Input
                      id="cityQuarter"
                      value={form.cityQuarter}
                      onChange={e=>setForm(s=>({...s,cityQuarter:e.target.value}))}
                      placeholder="Ex: Vieux-Nice, Croisette..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullAddress">Adresse complète</Label>
                  <Input
                    id="fullAddress"
                    value={form.fullAddress}
                    onChange={e=>setForm(s=>({...s,fullAddress:e.target.value}))}
                    placeholder="Ex: 123 Rue de la République"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5" />
                  Caractéristiques
                </CardTitle>
                <CardDescription>
                  Sélectionnez les équipements et caractéristiques de votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {LISTING_FEATURES.map(f => {
                    const active = form.features.includes(f);
                    return (
                      <div key={f} className="flex items-center space-x-2">
                        <Checkbox
                          id={f}
                          checked={active}
                          onCheckedChange={() => toggleFeature(f)}
                        />
                        <Label
                          htmlFor={f}
                          className="text-sm font-normal capitalize cursor-pointer"
                        >
                          {f.replace(/_/g, ' ')}
                        </Label>
                      </div>
                    );
                  })}
                </div>
                {form.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Caractéristiques sélectionnées:</p>
                    <div className="flex flex-wrap gap-1">
                      {form.features.map(f => (
                        <Badge key={f} variant="secondary" className="text-xs">
                          {f.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5" />
                  Capacité & Pièces
                </CardTitle>
                <CardDescription>
                  Renseignez le nombre de chambres, salles de bain et lits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Chambres</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min={0}
                      value={form.bedrooms}
                      onChange={e=> setForm(s=> ({...s, bedrooms: parseInt(e.target.value || '0',10)}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Salles de bain</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min={0}
                      value={form.bathrooms}
                      onChange={e=> setForm(s=> ({...s, bathrooms: parseInt(e.target.value || '0',10)}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beds">Lits</Label>
                    <Input
                      id="beds"
                      type="number"
                      min={0}
                      value={form.beds}
                      onChange={e=> setForm(s=> ({...s, beds: parseInt(e.target.value || '0',10)}))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5" />
                  Tarifs (par semaine)
                </CardTitle>
                <CardDescription>
                  Indiquez une fourchette de prix hebdomadaire (en euros)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priceMinWeekly">Prix min (€/semaine)</Label>
                    <Input
                      id="priceMinWeekly"
                      type="number"
                      min={0}
                      value={form.priceMinWeekly ?? ''}
                      onChange={e=> setForm(s=> ({...s, priceMinWeekly: e.target.value === '' ? undefined : parseInt(e.target.value,10)}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceMaxWeekly">Prix max (€/semaine)</Label>
                    <Input
                      id="priceMaxWeekly"
                      type="number"
                      min={0}
                      value={form.priceMaxWeekly ?? ''}
                      onChange={e=> setForm(s=> ({...s, priceMaxWeekly: e.target.value === '' ? undefined : parseInt(e.target.value,10)}))}
                    />
                  </div>
                </div>
                {form.priceMinWeekly != null && form.priceMaxWeekly != null && form.priceMinWeekly > form.priceMaxWeekly && (
                  <p className="text-xs text-destructive mt-2">Le prix minimum ne peut pas être supérieur au prix maximum.</p>
                )}
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Photos
              </CardTitle>
              <CardDescription>
                Ajoutez jusqu'à 12 photos ({form.imageUrls.length}/12)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ListingImageUploader onComplete={(urls)=> setForm(s=> {
                const merged = Array.from(new Set([...s.imageUrls, ...urls]));
                return { ...s, imageUrls: merged, coverImageUrl: s.coverImageUrl || merged[0] };
              })} />
              
              {form.imageUrls.length > 0 && (
                <div className="space-y-3">
                  <Separator />
                  <div className="grid grid-cols-2 gap-2">
                    {form.imageUrls.map(u => {
                      const isCover = u === form.coverImageUrl;
                      return (
                        <div key={u} className="relative group">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden border-2 border-transparent data-[cover=true]:border-primary" data-cover={isCover}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={u} alt="img" className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col justify-between p-2">
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => removeImage(u)}
                                className="h-6 w-6 p-0"
                              >
                                ×
                              </Button>
                            </div>
                            <div className="flex justify-center">
                              {!isCover ? (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setCover(u)}
                                  className="text-xs"
                                >
                                  Définir comme couverture
                                </Button>
                              ) : (
                                <Badge className="text-xs">Photo de couverture</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Aperçu</CardTitle>
              <CardDescription>
                Comment votre annonce apparaîtra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {form.coverImageUrl && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.coverImageUrl} alt="cover" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-semibold truncate">
                  {form.title || "Titre de l'annonce"}
                </h3>
                {form.location && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPinIcon className="w-3 h-3" />
                    {form.location}
                    {form.cityQuarter && `, ${form.cityQuarter}`}
                  </p>
                )}
                {(form.bedrooms || form.bathrooms || form.beds) && (
                  <p className="text-xs text-muted-foreground mt-1 flex gap-3">
                    {form.bedrooms > 0 && <span>{form.bedrooms} ch</span>}
                    {form.bathrooms > 0 && <span>{form.bathrooms} sdb</span>}
                    {form.beds > 0 && <span>{form.beds} lits</span>}
                  </p>
                )}
                {form.description && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                    {form.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={submit}
                  disabled={!isFormValid || create.status === 'pending'}
                  className="w-full"
                  size="lg"
                >
                  {create.status === 'pending' ? (
                    'Création en cours...'
                  ) : form.status === 'published' ? (
                    <>
                      <EyeIcon className="w-4 h-4 mr-2" />
                      Publier le listing
                    </>
                  ) : (
                    <>
                      <SaveIcon className="w-4 h-4 mr-2" />
                      Créer le listing
                    </>
                  )}
                </Button>
                
                {form.status === 'published' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={saveDraft}
                    disabled={!isFormValid || create.status === 'pending'}
                    className="w-full"
                  >
                    <SaveIcon className="w-4 h-4 mr-2" />
                    Sauver en brouillon
                  </Button>
                )}
                
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.back()}
                  className="w-full"
                >
                  Annuler
                </Button>
              </div>
              
              {create.error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">
                    Erreur: {create.error.message}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
