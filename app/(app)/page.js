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
    const homeRassegnaCover = homeRassegna?.images?.[0]
        ?? homeRassegna?.poster
        ?? homePageContent.rassegnePreview.images[0];

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
                        <article className="rassegne-list-row home-rassegne-list-row">
                            <div className="rassegne-list-image">
                                <Image
                                    src={homeRassegnaCover.src}
                                    alt={homeRassegnaCover.alt}
                                    width={homeRassegnaCover.width}
                                    height={homeRassegnaCover.height}
                                    className="rassegne-list-image-asset"
                                />
                            </div>

                            <div className="rassegne-list-copy">
                                <div className="rassegne-list-topline">
                                    <div className="rassegne-list-tags">
                                        {homeRassegna.tags.map((tag) => (
                                            <span key={tag} className="rassegne-list-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="rassegne-list-title">{homeRassegna.title}</h3>
                                <p className="rassegne-list-subtitle">{homeRassegna.subtitle}</p>
                                <p className="rassegne-list-description">{homeRassegna.description}</p>
                                {homeRassegna.lineup && (
                                    <p className="rassegne-list-lineup">{homeRassegna.lineup}</p>
                                )}
                                {homeRassegna.venue && (
                                    <p className="rassegne-list-venue">{homeRassegna.venue}</p>
                                )}

                                <Link href="/programmazione" className="rassegne-list-film-link">
                                    FILM -&gt;
                                </Link>
                            </div>
                        </article>
                    </section>
                )}
            </div>
        </div>
    );
}
