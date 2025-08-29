import type { ProjectItemFragment } from "@/lib/basehub"
import { cn } from "@/lib/utils"
import { Media } from "./media"
import Image from "next/image"

interface ProjectItemProps {
  project: ProjectItemFragment
  mode: "featured" | "grid"
  className?: string
  /** Remplace le titre affiché dans le cartouche */
  overrideTitle?: string
  /** Image statique pour remplacer le premier media */
  overrideImageSrc?: string
  /** Alt spécifique pour l'image override */
  overrideImageAlt?: string
    /** Petit sous-titre en gris à droite du titre */
    overrideSubtitle?: string
  /** Stats (capacity / pricing) affichées sous le titre */
  stats?: {
    bedrooms?: number | null
    beds?: number | null
    bathrooms?: number | null
    priceMinWeekly?: number | null
    priceMaxWeekly?: number | null
  }
  /** Centre le cartouche au milieu de la cover (featured uniquement) */
  centerContent?: boolean
  /** Liens sociaux affichés au-dessus du titre */
  socialLinks?: { _title: string; link: string }[]
}

export function ProjectItem({ project, mode, className, overrideTitle, overrideImageSrc, overrideImageAlt, overrideSubtitle, stats, centerContent, socialLinks }: ProjectItemProps) {
  const firstMedia = project.media.items[0]?.media
  const displayTitle = overrideTitle ?? project._title

  const hasStats = stats && (
    (stats.bedrooms ?? 0) > 0 ||
    (stats.beds ?? 0) > 0 ||
    (stats.bathrooms ?? 0) > 0 ||
    (stats.priceMinWeekly ?? 0) > 0
  )

  return (
    <div
      className={cn(
        className,
        "group block relative overflow-hidden bg-muted rounded-[6px] transition-[border-radius] duration-300 ease-quad-out w-full cursor-pointer",
        !className?.includes("rounded") && "hover:rounded-[18px]",
        mode === "featured"
          ? "aspect-video max-h-[420px] md:max-h-[460px]"
          : "aspect-square",
      )}
    >
      {overrideImageSrc ? (
        <Image
          src={overrideImageSrc}
          alt={overrideImageAlt || displayTitle}
          fill
          className="object-cover size-full transition-transform duration-500 ease-quad-out group-hover:scale-[1.025]"
          priority={mode === "featured"}
          sizes={
            mode === "featured"
              ? "(min-width:1536px) 1100px, (min-width:1280px) 1000px, (min-width:1024px) 900px, 100vw"
              : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          }
        />
      ) : firstMedia ? (
        <Media
          media={firstMedia}
          alt={project._title}
          className="size-full object-cover transition-transform duration-500 ease-quad-out group-hover:scale-[1.025]"
          quality={mode === "featured" ? 85 : 60}
          sizes={
            mode === "featured"
              ? "(min-width:1536px) 1100px, (min-width:1280px) 1000px, (min-width:1024px) 900px, 100vw"
              : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          }
          priority={mode === "featured"}
          videoProps={{
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            className:
              "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-quad-out group-hover:scale-[1.025]",
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground">No media</span>
        </div>
      )}

      <div
        className={cn(
          "pt-4 absolute rounded-lg liquid-glass-card px-4 md:px-6 py-3 md:py-4",
          mode === "featured"
            ? centerContent
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90%,760px)] text-center"
              : "bottom-2 right-2 left-2 md:left-[unset] md:min-w-[calc(33vw-var(--gap)*2)]"
            : "bottom-2 right-2 left-2 md:opacity-0 md:group-hover:opacity-100 transition-all ease-quad-out duration-300 scale-[.98] md:translate-y-full group-hover:-translate-y-0 group-hover:scale-100 filter-blur-md group-hover:filter-blur-none",
        )}
      >
        {socialLinks && socialLinks.length > 0 && (
          <ul
            className={cn(
              "mb-4 flex gap-5 font-semibold tracking-wide",
              centerContent ? "justify-center" : "justify-start",
            )}
          >
            {socialLinks.map((s, i) => (
              <li key={s._title} className="group/link">
                <a
                  href={s.link}
                  target={s.link.startsWith("http") ? "_blank" : undefined}
                  rel={s.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs md:text-sm opacity-40 group-hover/link:opacity-100 transition-opacity duration-300 ease-quad-out"
                >
                  {s._title}
                  {i === 0 && <span aria-hidden className="text-heading opacity-0">a</span>}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div
          className={cn(
            "flex items-baseline justify-between gap-4",
            centerContent && "flex-col items-center justify-center gap-2",
          )}
        >
          <h3
            className={cn(
              "font-black group-hover:text-primary break-words",
              mode === "featured"
                ? centerContent
                  ? "text-3xl md:text-5xl leading-[1.05] w-full"
                  : "text-xl md:text-3xl leading-tight"
                : "text-base md:text-lg leading-snug",
              centerContent ? "text-center" : "text-left",
            )}
          >
            {displayTitle}
          </h3>
          {overrideSubtitle && (
            <span
              className={cn(
                "text-foreground/40 font-medium text-xs md:text-sm break-words",
                centerContent && "text-center",
              )}
            >
              {overrideSubtitle}
            </span>
          )}
          {!overrideTitle && project.category && project.category.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              <p className={cn("text-foreground/30 font-semibold text-sm md:text-base")}>{project.category[0]}</p>
              {project.category.length > 1 && (
                <span className={cn("text-foreground/10 font-semibold text-sm md:text-base")}>+{project.category.length - 1}</span>
              )}
            </div>
          )}
        </div>
        {hasStats && <StatsRow stats={stats!} />}
      </div>
    </div>
  )
}

// Petite rangée d'icônes + valeurs pour les stats
import { Bed as BedIcon, Bath as BathIcon, Euro as EuroIcon, Home as HomeIcon } from "lucide-react"

function StatsRow({ stats }: { stats: Required<ProjectItemProps>["stats"] }) {
  const capacity: { key: string; value: string; icon: React.ReactNode }[] = []
  if ((stats?.bedrooms ?? 0) > 0) capacity.push({ key: 'bedrooms', value: `${stats?.bedrooms}`, icon: <HomeIcon className="size-3.5 md:size-4" /> })
  if ((stats?.beds ?? 0) > 0) capacity.push({ key: 'beds', value: `${stats?.beds}`, icon: <BedIcon className="size-3.5 md:size-4" /> })
  if ((stats?.bathrooms ?? 0) > 0) capacity.push({ key: 'bathrooms', value: `${stats?.bathrooms}`, icon: <BathIcon className="size-3.5 md:size-4" /> })
  const price = (stats?.priceMinWeekly ?? 0) > 0 ? formatPriceRange(stats?.priceMinWeekly, stats?.priceMaxWeekly) : null
  if (capacity.length === 0 && !price) return null
  return (
    <div className="mt-2 flex items-center gap-x-4 gap-y-1 text-[10px] md:text-xs text-foreground/55 font-medium">
      {capacity.map(item => (
        <div key={item.key} className="flex items-center gap-1">
          {item.icon}
          <span>{item.value}</span>
        </div>
      ))}
      {price && (
        <div className="flex items-center gap-1 ml-auto">
          <EuroIcon className="size-3.5 md:size-4" />
          <span>{price}</span>
        </div>
      )}
    </div>
  )
}

function formatPriceRange(min?: number | null, max?: number | null) {
  if (!min) return null
  const nf = new Intl.NumberFormat("fr-FR")
  if (min && max && max > min) return `${nf.format(min)}-${nf.format(max)}€`;
  return `${nf.format(min)}€`;
}
