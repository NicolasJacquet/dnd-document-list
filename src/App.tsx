import React from 'react';
import List from './components/list';
import style from './app.module.scss';

function App() {
  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <h1 className={style.title}>
          Documents list
        </h1>
      </header>
      <main className={style.mainContent}>
        <List />
      </main>
    </div>
  );
}

export default App;
