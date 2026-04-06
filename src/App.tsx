import React from 'react';
import { BraidingProvider } from './context';
import Controls from './components/Controls';
import Weave from './components/Weave';
import styles from './App.module.scss';

const Braiding: React.FC = () => (
  <BraidingProvider>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Braiding Visualizer</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.controlsSection}>
          <Controls />
        </section>
        <section className={styles.weaveSection}>
          <Weave />
        </section>
      </main>
    </div>
  </BraidingProvider>
);

export default Braiding;
