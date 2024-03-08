import React from 'react'
import styles from './Pagination.module.scss'

type PaginationType = {
    clasName?: string,
    pagesCount?: number,
}

export const Pagination: React.FC<PaginationType> = ({ clasName, pagesCount }) => {
    return (
        <div className={clasName ? clasName : styles.pagination}>
            {pagesCount}
        </div>
    )
};
