import Image from 'next/image';
import Link from 'next/link';
import { homePageContent } from '@/app/content/home';
import FeaturedProgramSection from '@/app/components/FeaturedProgramSection';
import HorizontalPosterSlider from '@/app/components/HorizontalPosterSlider';
import ShopPosterStack from '@/app/components/ShopPosterStack';

export default function HomePage() {
    const shopItems = homePageContent.shopShowcase.items;

    return (
        <div className="home-figma-page">
            <section className="home-display-board">
                <div className="home-display-board-inner">
                    <Image
                        src={homePageContent.displayBoard.heroImage.src}
                        alt={homePageContent.displayBoard.heroImage.alt}
                        width={homePageContent.displayBoard.heroImage.width}
                        height={homePageContent.displayBoard.heroImage.height}
                        className="home-display-board-image"
                        priority
                    />
                </div>
                <div className="home-display-board-mobile-links">
                    <Link href="/programmazione" className="home-display-board-mobile-link">
                        Programmazione
                    </Link>
                    <Link href="/store" className="home-display-board-mobile-link">
                        Shop
                    </Link>
                </div>
            </section>

            <div className="home-gradient-flow">
                <FeaturedProgramSection />

                <section className="home-manifesto-section">
                    <h2 className="home-manifesto-title">{homePageContent.manifesto.title}</h2>
                    <HorizontalPosterSlider
                        items={homePageContent.horizontalSlider.items}
                        ariaLabel={homePageContent.horizontalSlider.ariaLabel}
                    />
                </section>

                <section className="home-shop-section">
                    <h2 className="home-shop-title">{homePageContent.shopShowcase.title}</h2>
                    <div className="home-shop-desktop-stack">
                        <ShopPosterStack items={shopItems} />
                    </div>
                    <div className="home-shop-mobile-scroller">
                        <div className="home-shop-mobile-track">
                            {shopItems.map((item) => (
                                <article key={`${item.id}-mobile`} className="home-shop-mobile-card">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={item.width}
                                        height={item.height}
                                        className="home-shop-mobile-image"
                                    />
                                    <button type="button" className="home-shop-mobile-plus" aria-label={`Apri ${item.alt}`}>
                                        +
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>
                    <Link href={homePageContent.shopShowcase.cta.href} className="home-shop-link">
                        {homePageContent.shopShowcase.cta.label} -&gt;
                    </Link>
                </section>

                <section className="home-rassegne-section">
                    <h2 className="home-rassegne-title">{homePageContent.rassegnePreview.title}</h2>
                    <p className="home-rassegne-status">{homePageContent.rassegnePreview.status}</p>
                    <article className="home-rassegne-card">
                        <div className="home-rassegne-image-stack">
                            {homePageContent.rassegnePreview.images.map((image, index) => (
                                <Image
                                    key={image.id}
                                    src={image.src}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                    className={`home-rassegne-image home-rassegne-image-${index + 1}`}
                                />
                            ))}
                        </div>
                        <div className="home-rassegne-copy">
                            <div className="home-rassegne-tags">
                                {homePageContent.rassegnePreview.tags.map((tag) => (
                                    <span key={tag} className="home-rassegne-tag">{tag}</span>
                                ))}
                            </div>
                            <h3>{homePageContent.rassegnePreview.heading}</h3>
                            <p className="home-rassegne-subtitle">{homePageContent.rassegnePreview.subtitle}</p>
                            <p className="home-rassegne-description">{homePageContent.rassegnePreview.description}</p>
                            <Link href="/rassegne" className="home-rassegne-ticket-link">
                                Biglietti
                            </Link>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
}
