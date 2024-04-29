// formatDateDiff 함수 정의
function formatDateDiff(createdAtString) {
    // Date 객체로 변환
    const createdAtDate = new Date(createdAtString);

    // 현재 날짜와의 차이 계산
    const currentDate = new Date();
    const timeDiff = currentDate - createdAtDate; // 밀리초 단위의 차이

    // 밀리초를 분 단위로 변환
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    // 분 단위를 시간, 일, 주 등으로 변환하여 반환
    if (minutesDiff < 60) {
        return `${minutesDiff} 분 전`;
    } else if (minutesDiff < 24 * 60) {
        return `${Math.floor(minutesDiff / 60)} 시간 전`;
    } else if (minutesDiff < 7 * 24 * 60) {
        return `${Math.floor(minutesDiff / (24 * 60))} 일 전`;
    } else {
        return `${Math.floor(minutesDiff / (7 * 24 * 60))} 주 전`;
    }
}
export default formatDateDiff