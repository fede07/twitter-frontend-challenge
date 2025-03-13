import React, { useRef, ReactNode, UIEventHandler } from 'react';
import Loader from "../loader/Loader"
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
  loader = <Loader/>,
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
        {loading && loader}
      </div>
    </StyledInfiniteScroll>
  )
}
export default InfiniteScroll;
