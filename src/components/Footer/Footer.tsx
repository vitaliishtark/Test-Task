// Footer.js

import React from 'react';
import styles from './Footer.module.scss';
type FooterProps = {
    className?: string
}
const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={className ? className : styles.footer}>
            <div className={styles.footerContent}>
                <p>© 2024 Pokémon Company. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
