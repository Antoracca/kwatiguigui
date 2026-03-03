"use client";

import { Play, Clock } from "lucide-react";
import Image from "next/image";

export interface VideoClass {
    id: string;
    title: string;
    speaker: string;
    role: string;
    duration: string;
    thumbnailUrl: string;
}

interface VideoCardProps {
    video: VideoClass;
}

export function VideoCard({ video }: VideoCardProps) {
    return (
        <div className="group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:shadow-xl hover:shadow-rose-500/10 dark:border-neutral-800 dark:bg-neutral-900 sm:w-80">

            {/* Thumbnail Container */}
            <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-rose-500/90">
                        <Play className="ml-1 fill-white text-white" size={24} />
                    </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    <Clock size={12} />
                    {video.duration}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-4">
                <h3 className="mb-1 font-heading text-base font-bold leading-tight text-neutral-900 transition-colors group-hover:text-rose-600 dark:text-neutral-100 dark:group-hover:text-rose-400 line-clamp-2">
                    {video.title}
                </h3>

                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Avec <span className="font-bold text-neutral-700 dark:text-neutral-300">{video.speaker}</span>
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                    {video.role}
                </p>
            </div>

            <a href={`/dashboard/advice/video/${video.id}`} className="absolute inset-0 z-10">
                <span className="sr-only">Lire la vidéo</span>
            </a>
        </div>
    );
}
