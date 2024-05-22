import { PaginationContainer, PageButton } from '../common/PaginationStyles';

const Pagination = ({ pageNumbers, currentPage, onPageChange }) => {
    return (
        <PaginationContainer>
            {pageNumbers.map((number) => (
                <PageButton
                    key={number}
                    active={number === currentPage}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </PageButton>
            ))}
            <span></span>
        </PaginationContainer>
    );
};

export default Pagination;