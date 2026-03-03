"use client";

import { useState } from "react";
import { BookmarkPlus, BookmarkCheck, Clock, Eye } from "lucide-react";
import Image from "next/image";

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    views: string;
    imageUrl: string;
    isNew?: boolean;
}

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:shadow-xl hover:shadow-indigo-500/5 dark:border-neutral-800 dark:bg-neutral-900">

            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Top Badges */}
                <div className="absolute left-3 flex top-3 right-3 justify-between items-start">
                    <div className="flex flex-col gap-2 relative z-10">
                        <span className="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 backdrop-blur-md dark:bg-neutral-900/90 dark:text-indigo-400">
                            {article.category}
                        </span>
                        {article.isNew && (
                            <span className="inline-flex rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm self-start">
                                Nouveau
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSaved(!isSaved);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-600 backdrop-blur-md transition-all hover:bg-indigo-50 hover:text-indigo-600 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:text-indigo-400 z-10"
                    >
                        {isSaved ? (
                            <BookmarkCheck size={16} className="text-indigo-600 dark:text-indigo-400" />
                        ) : (
                            <BookmarkPlus size={16} />
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-heading text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-neutral-100 dark:group-hover:text-indigo-400 line-clamp-2">
                    {article.title}
                </h3>

                <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 flex-1">
                    {article.excerpt}
                </p>

                {/* Footer Meta */}
                <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {article.readTime} min lecture
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {article.views}
                        </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-indigo-400">
                        Lire l'article &rarr;
                    </span>
                </div>
            </div>

            {/* Absolute Link Over entire card */}
            <a href={`/dashboard/advice/article/${article.id}`} className="absolute inset-0 z-0">
                <span className="sr-only">Lire l'article</span>
            </a>
        </div>
    );
}
