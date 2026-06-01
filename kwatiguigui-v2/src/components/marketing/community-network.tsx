import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const networkProfiles = [
  {
    name: 'Moussa Diagne',
    role: 'Développeur Fullstack',
    img: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&auto=format&fit=crop',
    country: '🇸🇳 Sénégal',
  },
  {
    name: 'Amina Bello',
    role: 'Product Manager',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=200&auto=format&fit=crop',
    country: '🇨🇲 Cameroun',
  },
  {
    name: 'Jean-Marc Yongo',
    role: 'Ingénieur DevOps',
    img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=200&auto=format&fit=crop',
    country: '🇨🇫 RCA',
  },
  {
    name: 'Fatou Ndiaye',
    role: 'Designer UX/UI',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop',
    country: '🇨🇮 Côte d\'Ivoire',
  },
  {
    name: 'Koffi Kouassi',
    role: 'Expert SEO',
    img: 'https://images.unsplash.com/photo-1507038772120-7efa7235efc2?q=80&w=200&auto=format&fit=crop',
    country: '🇹🇬 Togo',
  },
  {
    name: 'Chantal Olinga',
    role: 'Directrice RH',
    img: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=200&auto=format&fit=crop',
    country: '🇬🇦 Gabon',
  },
  {
    name: 'Eric Nguema',
    role: 'Analyste Financier',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    country: '🇨🇬 Congo',
  },
  {
    name: 'Mariam Sy',
    role: 'Chef de Projet',
    img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop',
    country: '🇲🇱 Mali',
  },
  {
    name: 'Alain Ndong',
    role: 'Architecte Cloud',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    country: '🇨🇩 RDC',
  },
];

function ProfileCard({ img, name, role, country }: (typeof networkProfiles)[number]) {
  return (
    <Card className="w-56 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-primary-100 dark:border-primary-900/50 hover:border-primary-500 transition-colors shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-primary-200">
            <AvatarImage src={img} alt={name} className="object-cover" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 leading-tight">
              {name}
            </figcaption>
            <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">{role}</p>
            <span className="text-[10px] text-neutral-400 mt-1">{country}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CommunityNetwork() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-neutral-950 py-10 lg:py-28">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,49,137,0.05),transparent_50%)]"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8">
          
          {/* Left Content (CTA) */}
          <div className="flex-1 w-full text-center lg:text-left space-y-6 lg:max-w-xl z-20">
            
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Rejoignez notre <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">réseau mondial</span>
            </h2>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0">
              Faites partie de la communauté Kussala. Élargissez votre réseau, trouvez des missions exclusives et propulsez votre carrière avec les meilleurs talents d'Afrique.
            </p>
            
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild className="h-14 px-8 text-base font-bold rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-xl shadow-primary-500/20">
                <Link href="/register">Créer mon compte</Link>
              </Button>
            </div>
          </div>

          {/* Right Content (3D Marquee) */}
          <div className="flex-1 w-full lg:w-1/2 relative flex h-[180px] sm:h-[300px] lg:h-[800px] items-center justify-center overflow-hidden [perspective:800px] -my-4 lg:-my-24 z-10 scale-125 sm:scale-100">
            <div
              className="flex flex-row items-center gap-4"
              style={{
                transform:
                  'translateX(0px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-15deg) rotateZ(10deg)',
              }}
            >
              {/* Vertical Marquee (downwards) */}
              <Marquee vertical pauseOnHover repeat={4} className="[--duration:35s]">
                {networkProfiles.slice(0, 3).map((profile) => (
                  <ProfileCard key={profile.name} {...profile} />
                ))}
              </Marquee>
              
              {/* Vertical Marquee (upwards) */}
              <Marquee vertical pauseOnHover reverse repeat={4} className="[--duration:45s]">
                {networkProfiles.slice(3, 6).map((profile) => (
                  <ProfileCard key={profile.name} {...profile} />
                ))}
              </Marquee>
              
              {/* Vertical Marquee (downwards) */}
              <Marquee vertical pauseOnHover repeat={4} className="[--duration:40s] hidden sm:flex">
                {networkProfiles.slice(6, 9).map((profile) => (
                  <ProfileCard key={profile.name} {...profile} />
                ))}
              </Marquee>
            </div>
            
            {/* Gradient Overlays for smooth fading */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white dark:from-neutral-950 z-10"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-neutral-950 z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-neutral-950 z-10 lg:hidden"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-neutral-950 z-10 lg:hidden"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
