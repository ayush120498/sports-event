interface IErrorComponent extends JSX.IntrinsicAttributes {
	onClick: () => void;
	message?: string;
	buttonText?: string;
}
