import React, { useMemo, useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

interface OptimizedImageRendererProps extends Omit<OptimizedImageProps, "src" | "quality"> {
  primarySrc: string;
  fallbackSrc: string;
}

const OptimizedImageRenderer: React.FC<OptimizedImageRendererProps> = ({
  primarySrc,
  fallbackSrc,
  alt,
  className = "",
  style,
  priority = false,
  placeholder,
  sizes,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(primarySrc || placeholder);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <img
        src={currentSrc || placeholder}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          if (currentSrc !== fallbackSrc && fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            return;
          }

          setIsError(true);
          onError?.();
        }}
      />

      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#09192e]">
          <div className="animate-pulse">
            <div className="h-8 w-8 rounded-full bg-primary/35"></div>
          </div>
        </div>
      )}

      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#09192e]">
          <div className="text-center text-slate-300">
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  style,
  priority = false,
  placeholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwZTE5MmMiLz4KPC9zdmc+",
  sizes,
  quality = 85,
  onLoad,
  onError,
}) => {
  const optimizedSrc = useMemo(() => {
    if (!src || src.startsWith("http") || src.endsWith(".webp")) {
      return src;
    }

    return src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  }, [src]);
  const resolvedSrc = optimizedSrc || placeholder;

  void quality;

  return (
    <OptimizedImageRenderer
      key={`${resolvedSrc}-${src}-${placeholder}`}
      primarySrc={resolvedSrc}
      fallbackSrc={src}
      alt={alt}
      className={className}
      style={style}
      priority={priority}
      placeholder={placeholder}
      sizes={sizes}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default OptimizedImage;
