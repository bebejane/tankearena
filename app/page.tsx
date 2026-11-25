import { StructuredText } from 'react-datocms';
import NewsCarousel from './news-carousel';
import SiteHeader from './site-header';
import styles from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { StartDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import { NewsItemContent } from '@/lib/content';
import Content from '@/components/content/Content';

function getTodayInSweden() {
	const parts = new Intl.DateTimeFormat('sv-SE', {
		timeZone: 'Europe/Stockholm',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).formatToParts(new Date());
	const part = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((item) => item.type === type)?.value ?? '';

	return `${part('year')}-${part('month')}-${part('day')}`;
}

export default async function Home() {
	const today = getTodayInSweden();
	const { start, about, contact, allReports, allEvents } = await apiQuery(StartDocument);
	const news = [
		...allReports.map((item) => ({
			...item,
			type: 'Rapport' as const,
			endDate: null,
		})),
		...allEvents.map((item) => ({
			...item,
			type: 'Event' as const,
		})),
	] as NewsItemContent[];

	if (!start || !about || !contact) return notFound();

	return (
		<>
			<SiteHeader />
			<main className={styles.page} id='top'>
				<section className={`${styles.section} ${styles.start}`} id='start'>
					{start.image && (
						<div className={styles.imageColumn}>
							<img
								className={styles.image}
								src={start.image.url}
								alt={start.image.alt ?? start.title ?? ''}
								width={start.image.width}
								height={start.image.height}
							/>
						</div>
					)}
					<div className={styles.textColumn}>
						<h1>{start.title}</h1>
						<div className='intro'>
							<Content content={start.text} />
						</div>
					</div>
				</section>

				<section className={styles.anchorSection} id='nyheter'>
					<NewsCarousel news={news} today={today} />
				</section>

				<section className={`${styles.section} ${styles.about}`} id='om'>
					<div className={styles.textColumn}>
						<h2 className={styles.aboutTitle}>{about.title}</h2>
						<div className={styles.aboutText}>
							<Content content={about.text} />
						</div>
					</div>
					{about.image && (
						<div className={`${styles.imageColumn} ${styles.aboutImageColumn}`}>
							<img
								className={styles.image}
								src={about.image.url}
								alt={about.image.alt ?? about.title ?? ''}
								width={about.image.width}
								height={about.image.height}
							/>
						</div>
					)}
				</section>

				<section className={`${styles.section} ${styles.contact}`} id='kontakt'>
					{contact.image && (
						<div className={styles.imageColumn}>
							<img
								className={styles.contactImage}
								src={contact.image.url}
								alt={contact.image.alt ?? contact.title ?? ''}
								width={contact.image.width}
								height={contact.image.height}
							/>
						</div>
					)}
					<div className={styles.contactContent}>
						<h2>{contact.title}</h2>
						<div className={styles.contactText}>
							<Content content={contact.text} />
						</div>
					</div>
				</section>
			</main>
			<footer className={styles.footer}>
				<img className={styles.footerLogo} src='/images/logo_rgb.svg' alt='TAK' />
			</footer>
		</>
	);
}
