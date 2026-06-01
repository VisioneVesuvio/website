import Image from 'next/image';

export default function HorizontalPosterSlider({
    items = [],
    ariaLabel,
    className = '',
    repeatCount = 2,
}) {
    const repeatedItems = Array.from({ length: repeatCount }, (_, repeatIndex) =>
        items.map((item) => ({ ...item, renderKey: `${item.id}-${repeatIndex}` })),
    ).flat();

    return (
        <div className={`home-horizontal-slider ${className}`.trim()} aria-label={ariaLabel}>
            <div className="home-horizontal-slider-track">
                {repeatedItems.map((item) => (
                    <div key={item.renderKey} className="home-horizontal-slider-item">
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="home-horizontal-slider-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
