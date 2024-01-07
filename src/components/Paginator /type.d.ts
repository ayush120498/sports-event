interface IPaginatorProps {
	selectedPage: number;
	numberOfPages: number;
	selectPageHandler: (page: number) => void;
}
