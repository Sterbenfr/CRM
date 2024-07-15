import styles from '../styles/components.module.css'

interface PaginationProps {
    onPageChange: (page: number) => void
    onItemsPerPageChange: (itemsPerPage: number) => void
    totalItems: number
    itemsPerPage: number
    currentPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    onItemsPerPageChange,
    totalItems,
    itemsPerPage,
    currentPage,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const handleItemsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        onItemsPerPageChange(Number(event.target.value))
    }

    const renderPageNumbers = () => {
        const pages = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            let startPage = Math.max(currentPage - 2, 2)
            let endPage = Math.min(currentPage + 2, totalPages - 1)

            if (currentPage <= 3) {
                endPage = 5
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 4
            }

            pages.push(1) // Always include the first page

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }

            pages.push(totalPages) // Always include the last page
        }

        return pages.map(page => (
            <button
                className={styles.number}
                key={page}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={currentPage === page}
            >
                {page}
            </button>
        ))
    }

    return (
        <div className={styles.pagination}>
            <button
                className={styles.previous}
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Précédent
            </button>
            {renderPageNumbers()}
            <button
                className={styles.next}
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Suivant
            </button>
            <select
                className={styles.select}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
            >
                <option value='20'>Nombre de ligne par page : 20</option>
                <option value='50'>Nombre de ligne par page : 50</option>
                <option value='100'>Nombre de ligne par page : 100</option>
                <option value='250'>Nombre de ligne par page : 250</option>
                <option value='1000'>Nombre de ligne par page : 1000</option>
            </select>
        </div>
    )
}
