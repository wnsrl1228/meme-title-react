// formatDate 함수 정의
function chatTimeFormat(dateString) {
    // Date 객체로 변환
    const date = new Date(dateString);
    
    // 날짜와 시간의 각 요소 추출
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // 오전/오후 결정
    const period = hours >= 12 ? '오후' : '오전';
    
    // 12시간제 시간 포맷 변환 (12시간제를 사용하지 않는 경우)
    const displayHours = hours % 12 || 12;
    
    // 분이 10 미만일 때 앞에 0 추가
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    // 포맷된 문자열 반환
    return `${period} ${displayHours}:${displayMinutes}`;
}

export default chatTimeFormat;