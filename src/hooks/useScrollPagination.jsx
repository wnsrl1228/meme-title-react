import { useState, useEffect, useRef } from 'react';

// 스크롤 페이징을 위한 커스텀 훅
const useScrollPagination = (fetchData, isLast) => {
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부
  const [page, setPage] = useState(0); // 페이지 번호 상태
  const pageRef = useRef(null); // 페이지 끝을 나타내는 ref
  const throttleTimeout = useRef(null); // 스로틀링을 위한 타임아웃 참조
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !isLast) {
        throttleLoadMore();
      }
    }, { threshold: 1 });

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, [loading, isLast, fetchData]); // fetchData 함수가 변경될 때마다 useEffect 실행

  const loadMore = async () => {
    setLoading(true);
    // 페이지 번호를 증가시키고 새로운 데이터를 불러오는 API 호출
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
    setLoading(false);
  };

  // 스로틀링 함수
  const throttleLoadMore = () => {
    // 이미 타임아웃이 예약된 경우 무시
    if (throttleTimeout.current) return;

    // 0.5초 후에 loadMore 함수 호출
    throttleTimeout.current = setTimeout(() => {
      loadMore();
      throttleTimeout.current = null;
    }, 500); // 0.5초(500밀리초) 후에 loadMore 함수를 호출
  };

  return pageRef; // 페이지 끝을 나타내는 ref 반환
};

export default useScrollPagination;