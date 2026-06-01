// app/contatti/page.js
import Image from 'next/image';
import Link from 'next/link';
import { contactPageContent, getContactBlocks, getContactSocialLinks } from '@/app/content/contacts';
import HorizontalPosterSlider from '@/app/components/HorizontalPosterSlider';

export const metadata = {
    title: 'Contatti - Visione Vesuvio',
    description: 'Mettiti in contatto con l\'associazione Visione Vesuvio.',
};

export default function ContattiPage() {
    const contactBlocks = getContactBlocks();
    const socialLinks = getContactSocialLinks();
    return (
        <div className="contact-page">
            <section className="contact-page-header">
                <h1 className="contact-page-title">{contactPageContent.title}</h1>
                <p className="contact-page-intro">{contactPageContent.intro}</p>
            </section>

            <section className="contact-page-slider-shell">
                <HorizontalPosterSlider
                    items={contactPageContent.sliderItems}
                    ariaLabel={contactPageContent.sliderAriaLabel}
                />
            </section>

            <section className="contact-page-grid">
                {contactBlocks.map((block) => (
                    <div key={block.id} className="contact-page-block">
                        <h2 className="contact-page-block-title">{block.title}</h2>

                        {block.type === 'association' && (
                            <>
                                <div className="contact-logo-container">
                                    <Image
                                        src={contactPageContent.logo.src}
                                        alt={contactPageContent.logo.alt}
                                        width={contactPageContent.logo.width}
                                        height={contactPageContent.logo.height}
                                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                    />
                                </div>
                                <p className="contact-info-text">P.IVA {block.pIva}</p>
                            </>
                        )}

                        {block.type === 'email' && (
                            <a href={`mailto:${block.value}`} className="contact-email-address">
                                {block.value}
                            </a>
                        )}
                    </div>
                ))}

                <div className="contact-page-block">
                    <h2 className="contact-page-block-title">Social</h2>
                    <div className="contact-page-links">
                        {socialLinks.map((link) => (
                            <Link key={link.id} href={link.href} target="_blank" rel="noreferrer" className="contact-page-link">
                                {link.platform === 'instagram' ? 'Instagram' : link.platform === 'facebook' ? 'Facebook' : 'X'}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
