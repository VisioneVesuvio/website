import Image from 'next/image';
import Link from 'next/link';
import { homePageContent } from '@/app/content/home';
import CinefiliaHero from '@/app/components/CinefiliaHero';
import FeaturedProgramSection from '@/app/components/FeaturedProgramSection';
import HorizontalPosterSlider from '@/app/components/HorizontalPosterSlider';
import ShopPosterStack from '@/app/components/ShopPosterStack';
import { getFeaturedProgramEvents } from '@/app/services/filmService';
import { getHomeRassegna } from '@/app/services/rassegnaService';
import { getHomeShopItems, repeatShopItems } from '@/app/services/shopService';

export default async function HomePage() {
    const shopItems = await getHomeShopItems();
    const mobileShopItems = repeatShopItems(shopItems, 9);
    const featuredEvents = await getFeaturedProgramEvents();
    const homeRassegna = await getHomeRassegna();
    const homeRassegnaImages = homeRassegna?.images?.length
        ? homeRassegna.images
        : homePageContent.rassegnePreview.images;

    return (
        <div className="home-figma-page">
            <CinefiliaHero />

            <div className="home-gradient-flow">
                <FeaturedProgramSection events={featuredEvents} />

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
                            {mobileShopItems.map((item) => (
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

                {homeRassegna && (
                    <section className="home-rassegne-section">
                        <h2 className="home-rassegne-title">{homePageContent.rassegnePreview.title}</h2>
                        <p className="home-rassegne-status">In corso</p>
                        <article className="home-rassegne-card">
                            <div className="home-rassegne-image-stack">
                                {homeRassegnaImages.map((image, index) => (
                                    <Image
                                        key={image.id ?? image.src}
                                        src={image.src}
                                        alt={image.alt}
                                        width={image.width}
                                        height={image.height}
                                        className="home-rassegne-image"
                                        style={{
                                            animationDelay: `${index * 4}s`,
                                            animationDuration: `${Math.max(homeRassegnaImages.length, 1) * 4}s`,
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="home-rassegne-copy">
                                <div className="home-rassegne-tags">
                                    {homeRassegna.tags.map((tag) => (
                                        <span key={tag} className="home-rassegne-tag">{tag}</span>
                                    ))}
                                </div>
                                <h3>{homeRassegna.title}</h3>
                                <p className="home-rassegne-subtitle">{homeRassegna.subtitle}</p>
                                <p className="home-rassegne-description">{homeRassegna.description}</p>
                                <Link href="/programmazione" className="home-rassegne-film-link">
                                    FILM...
                                </Link>
                            </div>
                        </article>
                    </section>
                )}
            </div>
        </div>
    );
}
