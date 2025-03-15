import React, { useRef, ReactNode, UIEventHandler } from 'react';
import {StyledInfiniteScroll} from "./StyledInfiniteScroll"

interface InfiniteScrollProps {
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  loader?: ReactNode;
  threshold?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 400,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll: UIEventHandler<HTMLDivElement> = () => {
    if (!containerRef.current || !hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollHeight - scrollTop - clientHeight <= threshold) {
      onLoadMore();
    }
  }

  return (
    <StyledInfiniteScroll>
      <div ref={containerRef} onScroll={handleScroll}>
        {children}
      </div>
    </StyledInfiniteScroll>
  )
}
export default InfiniteScroll;
