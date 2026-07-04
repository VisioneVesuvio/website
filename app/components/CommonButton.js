import Link from 'next/link';

export default function CommonButton({
    href,
    children,
    className = '',
    type = 'button',
    external = false,
    ...props
}) {
    const classes = `site-button ${className}`.trim();

    if (href && external) {
        return (
            <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
                {children}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
}
