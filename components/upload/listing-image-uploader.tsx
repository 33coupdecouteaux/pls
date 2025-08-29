"use client";
import { UploadButton } from '@uploadthing/react';
import type { AppFileRouter } from '@/app/api/uploadthing/core';

export function ListingImageUploader({ onComplete }: { onComplete: (urls: string[]) => void }) {
  return (
    <div className="space-y-2">
  <UploadButton<AppFileRouter, 'listingImages'>
        endpoint="listingImages"
        onClientUploadComplete={(res) => {
          if (!res) return;
          onComplete(res.map((r: { url: string }) => r.url));
        }}
        onUploadError={(e: Error) => {
          alert(e.message);
        }}
        appearance={{
          button: `
            relative group overflow-hidden
            bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
            text-white font-medium py-3 px-6 rounded-xl
            shadow-lg hover:shadow-xl
            transform transition-all duration-200 hover:scale-105
            border border-blue-500/20
            backdrop-blur-sm
          `,
          container: 'flex flex-col gap-4',
          allowedContent: 'text-sm text-gray-400 mt-2 text-center',
        }}
        content={{
          button({ ready }) {
            if (ready) return (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Choisir les images
              </div>
            );
            return (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Préparation...
              </div>
            );
          },
          allowedContent: "Images jusqu'à 4MB, max 12 fichiers",
        }}
      />
    </div>
  );
}
