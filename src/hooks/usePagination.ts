import { useState } from 'react';

interface PaginationProps<T> {
	data: T[];
	itemsPerPage: number;
}

interface PaginationResult<T> {
	jump: (page: number) => void;
	currentData: () => T[];
	currentPage: number;
	maxPage: number;
}

const usePagination = <T>({ data, itemsPerPage }: PaginationProps<T>): PaginationResult<T> => {
	const [currentPage, setCurrentPage] = useState(1);
	const maxPage = Math.ceil(data.length / itemsPerPage);

	const currentData = (): T[] => {
		const begin = (currentPage - 1) * itemsPerPage;
		const end = begin + itemsPerPage;
		return data.slice(begin, end);
	};

	const jump = (page: number): void => {
		const pageNumber = Math.max(1, page);
		setCurrentPage(() => Math.min(pageNumber, maxPage));
	};

	return { jump, currentData, currentPage, maxPage };
};

export default usePagination;
