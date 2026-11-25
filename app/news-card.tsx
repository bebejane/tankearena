import type { NewsItemContent } from '@/lib/content';
import styles from './news-card.module.scss';
import Content from '@/components/content/Content';

type NewsCardProps = {
	item: NewsItemContent;
	today: string;
};

export default function NewsCard({ item, today }: NewsCardProps) {
	const isEvent = item.type === 'Event';

	return (
		<article
			className={`${styles.card} ${isEvent ? styles.event : ''} ${item.image ? '' : styles.withoutImage}`}
		>
			{item.image && (
				<div className={styles.imageColumn}>
					<img
						className={styles.image}
						src={item.image.url}
						alt={item.image.alt ?? item.title}
						width={item.image.width}
						height={item.image.height}
					/>
				</div>
			)}
			<div className={styles.text}>
				<div className={styles.meta}>
					<span className={`mini ${styles.type}`}>{item.type}</span>
					{isEvent && item.endDate && (
						<span className={`mini ${styles.status}`}>
							{item.endDate >= today ? 'Kommande' : 'Avslutat'}
						</span>
					)}
				</div>
				<h3>
					<a href={item.url}>{item.title}</a>
				</h3>
				<Content content={item.intro} />
				<a className={`mini ${styles.link}`} href={item.url}>
					{isEvent ? 'Läs mer' : 'Ladda ner'}
				</a>
			</div>
		</article>
	);
}
