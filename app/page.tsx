
'use client';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const [objectif, setObjectif] = useState('');
  const [situation, setSituation] = useState('');
  const [taches, setTaches] = useState([]);
  const [progression, setProgression] = useState(0);
  const [jourRestant, setJourRestant] = useState(100);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('objectifApp'));
    if (savedData) {
      setObjectif(savedData.objectif || '');
      setSituation(savedData.situation || '');
      setTaches(savedData.taches || []);
      setProgression(savedData.progression || 0);
      setJourRestant(savedData.jourRestant || 100);
    }
  }, []);

  useEffect(() => {
    const dataToSave = { objectif, situation, taches, progression, jourRestant };
    localStorage.setItem('objectifApp', JSON.stringify(dataToSave));
  }, [objectif, situation, taches, progression, jourRestant]);

  const handleSubmit = () => {
    if (!objectif || !situation) return alert("Remplis tous les champs !");
    const nouvellesTaches = [
      `Lire un article sur ${objectif}`,
      `Faire une action concrète liée à ${objectif}`,
      `Écrire 3 idées pour progresser dans ${objectif}`,
    ];
    setTaches(nouvellesTaches);
    setProgression(10);
    setJourRestant(jourRestant - 1);
  };

  const validerTache = (index) => {
    const nouvellesTaches = [...taches];
    nouvellesTaches[index] = `✅ ${nouvellesTaches[index]}`;
    setTaches(nouvellesTaches);
    setProgression(progression + 10);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>🎯 Mon Objectif</h1>
      <input
        type="text"
        placeholder="Quel est ton objectif ?"
        value={objectif}
        onChange={(e) => setObjectif(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Quelle est ta situation actuelle ?"
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleSubmit} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}>
        Lancer l'IA
      </button>

      {taches.length > 0 && (
        <div style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h2>📋 Tâches du jour</h2>
          <ul>
            {taches.map((tache, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {tache.startsWith("✅") ? (
                  <span style={{ color: 'green' }}>{tache}</span>
                ) : (
                  <button onClick={() => validerTache(index)}>{tache}</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>⏳ Jours restants estimés : <strong>{jourRestant}</strong></div>
      <div>🚀 Progression : {progression}%</div>
    </div>
  );
}
