/// <reference types="react" />

interface IProps {
	header: string;
	observer: any;
	onClose: () => void;
}
export declare function ModalAddDefaultFilterColumn({
	header,
	observer,
	onClose,
}: IProps): JSX.Element;
export {};
