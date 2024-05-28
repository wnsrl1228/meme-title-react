import { useState, useEffect, useRef} from 'react';

// 스크롤 페이징을 위한 커스텀 훅
const useScrollPagination = (fetchData, isLast, sort='createdAt') => {
  const [loading, setLoading] = useState(false); // 데이터를 불러오는 중인지 여부
  const [page, setPage] = useState(0); // 페이지 번호 상태
  const pageRef = useRef(null); // 페이지 끝을 나타내는 ref
  const throttleTimeout = useRef(null); // 스로틀링을 위한 타임아웃 참조

  useEffect(() => {
    // sort가 변경될 때 페이지 번호 초기화
    setPage(0);
  }, [sort]);
  
  useEffect(() => {
    const node = pageRef.current;

    const loadMore = async () => {
      setLoading(true);
      // 페이지 번호를 증가시키고 새로운 데이터를 불러오는 API 호출
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, sort);
      setLoading(false);
    };

    // 스로틀링 함수
    const throttleLoadMore = () => {
      // 이미 타임아웃이 예약된 경우 무시
      if (throttleTimeout.current) return;

      throttleTimeout.current = setTimeout(() => {
        loadMore();
        throttleTimeout.current = null;
      }, 500); // 0.5초(500밀리초) 후에 loadMore 함수를 호출
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !isLast) {
        throttleLoadMore();
      }
    }, { threshold: 1 });

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [loading, isLast, fetchData, page, sort]); // fetchData 함수가 변경될 때마다 useEffect 실행


  return pageRef; // 페이지 끝을 나타내는 ref 반환
};

export default useScrollPagination;