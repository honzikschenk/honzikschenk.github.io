import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

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

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  style,
  priority = false,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmMGYwZjAiLz4KPHN2ZyB4PSIzNSIgeT0iMzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjY2NjIj4KPHBhdGggZD0iTTIxIDEzdjEwSDN2LTZIMXYtNWMwLTEuMTAzLjg5Ny0yIDItMmg0djJoOHYtMmg0YzEuMTAzIDAgMiAuODk3IDIgMnYxem0tOSAzYzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0tNS0zYzAtMi4yMTEgMS43ODktNCA0LTRzNCAuNzg5IDQgNC0xLjc4OSA0LTQgNGMtMi4yMTEgMC00LTEuNzg5LTQtNHoiLz4KPC9zdmc+Cjwvc3ZnPg==",
  sizes,
  quality = 85,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLImageElement>(null);

  // Convert to WebP if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc) return originalSrc;
    
    // Check if it's already a WebP or if it's an external URL
    if (originalSrc.includes('.webp') || originalSrc.startsWith('http')) {
      return originalSrc;
    }
    
    // For local images, try to use WebP version
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpSrc;
  };

  useEffect(() => {
    const img = new Image();
    
    const handleLoad = () => {
      setIsLoaded(true);
      setIsError(false);
      setCurrentSrc(src);
      onLoad?.();
    };

    const handleError = () => {
      // If WebP fails, fallback to original
      if (src.includes('.webp')) {
        const fallbackSrc = src.replace('.webp', '.jpg');
        img.src = fallbackSrc;
        return;
      }
      
      setIsError(true);
      onError?.();
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    
    // Use optimized src or fallback to original
    const optimizedSrc = getOptimizedSrc(src);
    img.src = optimizedSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(imgElement);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        ref={imgRef}
        src={priority ? currentSrc : placeholder}
        data-src={priority ? undefined : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setIsError(true);
          onError?.();
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !isError && (
        <motion.div
          className="absolute inset-0 bg-gray-200 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
        </motion.div>
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-gray-400">⚠️</div>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OptimizedImage;
