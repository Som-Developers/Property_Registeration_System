// src/components/ui/avatar.tsx
import * as React from "react";

export function Avatar({ src, alt }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt || "Avatar"}
      className="rounded-full w-10 h-10 object-cover"
    />
  );
}

export function AvatarFallback({ name }: { name: string }) {
  return (
    <div className="rounded-full w-10 h-10 bg-gray-200 text-center flex items-center justify-center font-semibold">
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  );
}
