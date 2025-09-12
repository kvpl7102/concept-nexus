"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { startWhoAmIGame, searchConcept, getUserProfile } from '@/services/api';
import { Concept, ConceptNetEdge } from '@/lib/types';
import styles from './page.module.css';

const GAME_DURATION = 60; 
const CLUE_INTERVAL = 10; 

type GameState = 'idle' | 'playing' | 'won' | 'lost';

export default function WhoAmIPage() {
  const { user, token, isLoading: isAuthLoading } = useAuth();
  
  // Game State
  const [gameState, setGameState] = useState<GameState>('idle');
  const [conceptToGuess, setConceptToGuess] = useState<Concept | null>(null);
  const [clues, setClues] = useState<ConceptNetEdge[]>([]);
  const [revealedClues, setRevealedClues] = useState<ConceptNetEdge[]>([]);
  const [timer, setTimer] = useState(GAME_DURATION);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch and process clues when a new game starts
  useEffect(() => {
    if (gameState === 'playing' && conceptToGuess && token) {
      const fetchAndProcessClues = async () => {
        try {
          const data = await searchConcept(conceptToGuess.label, token, conceptToGuess.lang);
        
          const transformedClues = data.edges
          .filter(edge => edge.start.language === 'en' && edge.end.language === 'en') 
          .map(edge => {
            const newEdge = JSON.parse(JSON.stringify(edge)); 
            let startIsAnswer = newEdge.start.label.toLowerCase().includes(conceptToGuess.label.toLowerCase());
            let endIsAnswer = newEdge.end.label.toLowerCase().includes(conceptToGuess.label.toLowerCase());

            if (startIsAnswer) newEdge.start.label = '???';
            if (endIsAnswer) newEdge.end.label = '???';
            
            return newEdge;
          }).filter(edge => edge.start.label !== '???' || edge.end.label !== '???'); 
          
          setClues(transformedClues);

          setRevealedClues([transformedClues[0]]);
        } catch (error) {
          console.error("Failed to fetch clues", error);
          setError("Failed to fetch clues for the concept. Please try starting a new game.");
          setGameState('idle');
        }
      };
      fetchAndProcessClues();
    }
  }, [gameState, conceptToGuess, token]);

  // Handle the game timer and revealing clues
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timer === 0) {
      setGameState('lost');
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(t => t - 1);
      
      const shouldRevealClue = (GAME_DURATION - timer) % CLUE_INTERVAL === 0;

    
      if (shouldRevealClue && clues.length > revealedClues.length) {
         if(timer < GAME_DURATION){
            setRevealedClues(prev => {
                const nextClue = clues[prev.length];
                if (nextClue) {
                    return [...prev, nextClue];
                }
                return prev;
            });
         }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameState, timer, clues, revealedClues.length]);

  const handleStartGame = async () => {
    if (!token || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setGameState('playing');
    setTimer(GAME_DURATION);
    setClues([]);
    setRevealedClues([]);
    setUserGuess('');
    setScore(0);
    setConceptToGuess(null);

    try {
      const { conceptToGuess } = await startWhoAmIGame(token);
      setConceptToGuess(conceptToGuess);
    } catch (err) {
      console.error("Failed to start a new game.", err);
      setError("Sorry, we couldn't start a new game. Please try again.");
      setGameState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userGuess.trim().toLowerCase() === conceptToGuess?.label.toLowerCase()) {
      const calculatedScore = timer + (clues.length - revealedClues.length) * 5;
      setScore(calculatedScore);
      setGameState('won');
    } else {
        setUserGuess('');
        alert('Incorrect, try again!');
    }
  };

  if (isAuthLoading) return <main className={styles.container}><p>Loading...</p></main>;
  if (!user) return <main className={styles.container}><p>Please log in to play.</p></main>;

  return (
    <main className={styles.container}>
      <h1>Game: Who Am I?</h1>
      
      {gameState === 'idle' && (
        <div>
          <button onClick={handleStartGame} className={styles.button} disabled={isLoading}>
            {isLoading ? 'Starting...' : 'Start New Game'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}

      {(gameState === 'won' || gameState === 'lost') && (
        <div className={styles.gameOver}>
          <h2>{gameState === 'won' ? `You won! You scored ${score} points!` : 'Time\'s up! You lost.'}</h2>
          <p>The concept was: <strong>{conceptToGuess?.label}</strong></p>
          <button onClick={handleStartGame} className={styles.button} disabled={isLoading}>
            {isLoading ? 'Starting...' : 'Play Again'}
          </button>
        </div>
      )}

      {gameState === 'playing' && conceptToGuess && (
        <div className={styles.gameArea}>
          <div className={styles.timer}>Time Remaining: {timer}s</div>
          <h2>Guess the concept based on these clues:</h2>
          <ul className={styles.cluesList}>
            {revealedClues.length > 0 ? (
                revealedClues.map(clue => (
                <li key={clue['@id']}>
                    <strong>{clue.start.label}</strong>
                    {' '}{clue.rel.label}{' '}
                    <strong>{clue.end.label}</strong>
                </li>
                ))
            ) : (
                <li>First clue will appear in a few seconds...</li>
            )}
          </ul>
          <form onSubmit={handleGuessSubmit} className={styles.form}>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your guess..."
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Guess</button>
          </form>
        </div>
      )}
    </main>
  );
}


