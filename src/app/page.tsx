import Link from 'next/link';
import { SharedButtonDemo } from '../components/SharedButtonDemo';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Aqui é MFE da <Link href="/">HOME!</Link> :D
        </h1>
        <span> testando aqui</span>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voltar para o outro projeto do mfe
          </a>
          <SharedButtonDemo />
        </div>
      </main>
      <footer className={styles.footer}>
        <span> testando aqui</span>
      </footer>
    </div>
  );
}
