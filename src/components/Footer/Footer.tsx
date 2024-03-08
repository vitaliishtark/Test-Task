import React from 'react';
import styles from './Footer.module.scss';

type FooterProps = {
    className?: string
}
const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={className ? className : styles.footer}>
            <div className={styles.footerContent}>
                <p>This project was created as a testing task. All rights are reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
