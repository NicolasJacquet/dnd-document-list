import React from 'react';
import List from './components/list';
import style from './app.module.scss';

function App() {
  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <h1 className={style.title}>
          Yesplan
        </h1>
        <h2 className={style.subtitle}>
          Documents list
        </h2>
      </header>
      <main className={style.mainContent}>
        <List />
      </main>
    </div>
  );
}

export default App;
