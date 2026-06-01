import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, Share2, BookmarkPlus, Calendar, ChevronRight } from "lucide-react";
import { ARTICLES } from "@/lib/mocks/advice-data";
import ReactMarkdown from "react-markdown";

type Params = Promise<{ id: string }>;

export default async function ArticlePage({ params }: { params: Params }) {
    const resolvedParams = await params;
    const article = ARTICLES.find((a) => a.id === resolvedParams.id);

    if (!article) {
        notFound();
    }

    // Related articles (random 2 from same category or fallback)
    const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 2);
    if (related.length < 2) {
        const backup = ARTICLES.filter((a) => a.id !== article.id && !related.find(r => r.id === a.id));
        while (related.length < 2 && backup.length > 0) {
            related.push(backup.shift()!);
        }
    }

    return (
        <div className="pb-20">

            {/* ── Breadcrumbs & Back ── */}
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/dashboard/advice"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
                >
                    <ArrowLeft size={16} />
                    Retour aux conseils
                </Link>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <Link href="/dashboard/advice" className="hover:text-neutral-600 dark:hover:text-neutral-300">Conseil Carrière</Link>
                    <ChevronRight size={12} />
                    <span className="text-indigo-600 dark:text-indigo-400">{article.category}</span>
                </div>
            </div>

            <div className="mx-auto max-w-4xl">

                {/* ── Hero Image ── */}
                <div className="relative mb-10 h-[40vh] min-h-[300px] w-full overflow-hidden rounded-[2rem] shadow-xl">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                        <span className="mb-4 inline-block rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                            {article.category}
                        </span>
                        <h1 className="font-heading text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                            {article.title}
                        </h1>
                    </div>
                </div>

                {/* ── Meta Bar ── */}
                <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                    <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white dark:ring-neutral-800">
                            {/* @ts-ignore - The mock data assumes article format matches our Article interface which we extended with author in the data file. */}
                            <Image src={article.author?.avatarUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&q=80"} alt={article.author?.name || "Auteur"} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                {article.author?.name || "Équipe Kussala"}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {article.author?.role || "Expert RH"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.publishedAt || "Aujourd'hui"}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime} min lecture</span>
                        <span className="flex items-center gap-1.5"><Eye size={14} /> {article.views} vues</span>
                    </div>
                </div>

                {/* ── Main Content & Sidebar ── */}
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start">

                    <article className="prose prose-neutral prose-indigo max-w-none flex-1 lg:prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-h2:text-indigo-900 dark:prose-h2:text-indigo-400 prose-a:text-indigo-600 prose-img:rounded-2xl">
                        {/* If content exists use ReactMarkdown, otherwise fallback to excerpt */}
                        {/* @ts-ignore */}
                        {article.content ? (
                            // @ts-ignore
                            <ReactMarkdown>{article.content}</ReactMarkdown>
                        ) : (
                            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                                {article.excerpt}
                            </p>
                        )}

                        <hr className="my-12 border-neutral-200 dark:border-neutral-800" />

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-500">Avez-vous trouvé cet article utile ?</span>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                                    <BookmarkPlus size={16} /> Sauvegarder
                                </button>
                                <button className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                                    <Share2 size={16} /> Partager
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* ── Right Sidebar (Related) ── */}
                    <aside className="w-full shrink-0 space-y-6 lg:w-80">
                        <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Sur le même sujet
                        </h3>
                        <div className="space-y-4">
                            {related.map(r => (
                                <Link key={r.id} href={`/dashboard/advice/article/${r.id}`} className="group flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-900/50">
                                    <div className="relative h-32 w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                        <Image src={r.imageUrl} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <h4 className="font-heading text-sm font-bold text-neutral-800 transition-colors group-hover:text-indigo-600 dark:text-neutral-200 dark:group-hover:text-indigo-400 line-clamp-2">
                                        {r.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/30">
                            <h4 className="mb-2 font-heading text-lg font-bold text-indigo-900 dark:text-indigo-300">
                                Ne ratez plus aucune astuce
                            </h4>
                            <p className="mb-4 text-sm text-indigo-800/70 dark:text-indigo-400/70">
                                Abonnez-vous pour recevoir un conseil carrière par semaine, directement dans votre boîte mail.
                            </p>
                            <div className="flex flex-col gap-2">
                                <input type="email" placeholder="Votre adresse email" className="w-full rounded-xl border border-white/50 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400 dark:border-neutral-800 dark:bg-neutral-900" />
                                <button className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700">S'abonner</button>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
