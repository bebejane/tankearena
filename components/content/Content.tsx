import { StructuredContent } from 'next-dato-utils/components';

export type Props = {
	id?: string;
	content: any;
	styles?: any;
	className?: string;
	blocks?: any;
};

export default function Content({ id, content, styles, blocks, className }: Props) {
	if (!content) return null;

	return (
		<div data-datocms-content-link-group>
			<StructuredContent className={className} styles={{ ...styles }} content={content} />
		</div>
	);
}
