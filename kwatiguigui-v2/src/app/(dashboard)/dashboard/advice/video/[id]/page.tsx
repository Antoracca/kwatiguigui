import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, PlayCircle, Download, FileText, ChevronRight } from "lucide-react";
import { VIDEOS } from "@/lib/mocks/advice-data";

type Params = Promise<{ id: string }>;

export default async function VideoPage({ params }: { params: Params }) {
    const resolvedParams = await params;
    const video = VIDEOS.find((v) => v.id === resolvedParams.id);

    if (!video) {
        notFound();
    }

    // Related videos
    const related = VIDEOS.filter((v) => v.id !== video.id).slice(0, 3);

    return (
        <div className="pb-20">

            {/* ── Breadcrumbs & Back ── */}
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/dashboard/advice"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400"
                >
                    <ArrowLeft size={16} />
                    Retour aux conseils
                </Link>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <Link href="/dashboard/advice" className="hover:text-neutral-600 dark:hover:text-neutral-300">Masterclasses</Link>
                    <ChevronRight size={12} />
                    <span className="text-rose-600 dark:text-rose-400">Vidéo</span>
                </div>
            </div>

            <div className="mx-auto max-w-5xl">

                {/* ── Video Player Area ── */}
                <div className="mb-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-black shadow-2xl dark:border-neutral-800">
                    <div className="relative aspect-video w-full bg-neutral-900 border-none outline-none">
                        <iframe
                            width="100%"
                            height="100%"
                            src={video.videoUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full object-cover"
                        ></iframe>
                    </div>
                </div>

                {/* ── Content Grid ── */}
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start">

                    <div className="flex-1 space-y-8">
                        <div>
                            <div className="mb-4 flex items-center gap-4">
                                <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-700 dark:bg-rose-900/40 dark:text-rose-400">
                                    Masterclass
                                </span>
                                <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                                    <Clock size={16} /> {video.duration}
                                </span>
                            </div>

                            <h1 className="font-heading text-3xl font-black leading-tight text-neutral-900 dark:text-white sm:text-4xl">
                                {video.title}
                            </h1>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                            <div className="flex items-center gap-4">
                                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-white dark:ring-neutral-800 shadow-sm">
                                    <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" alt={video.speaker} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                        Présenté par {video.speaker}
                                    </p>
                                    <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
                                        {video.role}
                                    </p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-neutral-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                                <Share2 size={16} /> Partager
                            </button>
                        </div>

                        <div className="prose prose-neutral prose-rose max-w-none dark:prose-invert">
                            <h3 className="font-heading text-xl font-bold">À propos de cette Masterclass</h3>
                            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                                {video.description}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6 dark:border-rose-900/20 dark:bg-rose-950/10">
                            <h3 className="mb-4 font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">Ressources téléchargeables</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <button className="flex items-center justify-between w-full sm:w-auto gap-4 rounded-xl border border-rose-200 bg-white p-4 shadow-sm transition hover:border-rose-300 dark:border-rose-800/50 dark:bg-neutral-900 dark:hover:border-rose-700">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-rose-500" size={24} />
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Support de présentation</p>
                                            <p className="text-xs text-neutral-500">PDF - 2.4 MB</p>
                                        </div>
                                    </div>
                                    <Download size={18} className="text-neutral-400" />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* ── Right Sidebar (Related Videos) ── */}
                    <aside className="w-full shrink-0 space-y-6 lg:w-80">
                        <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Voir aussi
                        </h3>
                        <div className="space-y-4">
                            {related.map(r => (
                                <Link key={r.id} href={`/dashboard/advice/video/${r.id}`} className="group flex flex-col gap-3 rounded-2xl p-2 transition hover:bg-neutral-50 dark:hover:bg-neutral-900">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                        <Image src={r.thumbnailUrl} alt={r.title} fill className="object-cover opacity-90 transition-opacity group-hover:opacity-100" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                                            <PlayCircle className="fill-white/80 text-black/50 transition-transform group-hover:scale-110" size={32} />
                                        </div>
                                        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                            {r.duration}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-heading text-sm font-bold text-neutral-800 transition-colors group-hover:text-rose-600 dark:text-neutral-200 dark:group-hover:text-rose-400 line-clamp-2">
                                            {r.title}
                                        </h4>
                                        <p className="mt-1 text-xs text-neutral-500">{r.speaker}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
