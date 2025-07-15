'use client';

import { useState, useEffect } from 'react';
import WelcomePage, { Pet as PetType, availablePets } from './components/WelcomePage';
import GamePage from './components/GamePage';

export default function TamagotchiGame() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'game'>('welcome');
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null);
  const [petStats, setPetStats] = useState<{[petId: string]: any}>({});

  // Initialize stats for all pets
  useEffect(() => {
    const initialStats: {[petId: string]: any} = {};
    availablePets.forEach(pet => {
      initialStats[pet.id] = {
        hunger: 50,
        happiness: 50,
        health: 100,
        lastFed: Date.now()
      };
    });
    setPetStats(initialStats);
  }, []);

  // Handle pet selection from welcome page
  const handleSelectPet = (pet: PetType) => {
    setSelectedPet(pet);
    setCurrentPage('game');
  };

  // Handle going back to pet selection
  const handleBackToSelection = () => {
    setCurrentPage('welcome');
    setSelectedPet(null);
  };

  // Get current pet's stats
  const getCurrentPetStats = () => {
    if (!selectedPet) return { hunger: 50, happiness: 50, health: 100, lastFed: Date.now() };
    return petStats[selectedPet.id] || { hunger: 50, happiness: 50, health: 100, lastFed: Date.now() };
  };

  // Update current pet's stats
  const updateCurrentPetStats = (updateFn: (prev: any) => any) => {
    if (!selectedPet) return;
    setPetStats(prev => ({
      ...prev,
      [selectedPet.id]: updateFn(prev[selectedPet.id] || { hunger: 50, happiness: 50, health: 100, lastFed: Date.now() })
    }));
  };

  // Auto-decay stats over time for all pets
  useEffect(() => {
    // Development mode: Faster intervals for testing (comment out for production)
    const DEV_MODE = false; // Set to true to test decay quickly
    
    const hungerTime = DEV_MODE ? 5000 : 60000; // 5 seconds vs 1 minute
    const happinessTime = DEV_MODE ? 5000 : 60000; // 5 seconds vs 1 minute  
    const healthTime = DEV_MODE ? 10000 : 300000; // 10 seconds vs 5 minutes

    // Hunger decreases by 1 every minute (minimum 5) for all pets
    const hungerInterval = setInterval(() => {
      setPetStats(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(petId => {
          updated[petId] = {
            ...updated[petId],
            hunger: Math.max(5, updated[petId].hunger - 1)
          };
        });
        return updated;
      });
    }, hungerTime);

    // Happiness decreases by 2 every minute (minimum 20) for all pets
    const happinessInterval = setInterval(() => {
      setPetStats(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(petId => {
          updated[petId] = {
            ...updated[petId],
            happiness: Math.max(20, updated[petId].happiness - 2)
          };
        });
        return updated;
      });
    }, happinessTime);

    // Health decreases by 1 every 5 minutes (minimum 30) for all pets
    const healthInterval = setInterval(() => {
      setPetStats(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(petId => {
          updated[petId] = {
            ...updated[petId],
            health: Math.max(30, updated[petId].health - 1)
          };
        });
        return updated;
      });
    }, healthTime);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(hungerInterval);
      clearInterval(happinessInterval);
      clearInterval(healthInterval);
    };
  }, []);

  // Render current page
  if (currentPage === 'welcome') {
    return <WelcomePage onSelectPet={handleSelectPet} />;
  }

  if (currentPage === 'game' && selectedPet) {
    return (
      <GamePage
        selectedPet={selectedPet}
        onBackToSelection={handleBackToSelection}
        petStats={getCurrentPetStats()}
        onUpdateStats={updateCurrentPetStats}
      />
    );
  }

  // Fallback (shouldn't happen)
  return <WelcomePage onSelectPet={handleSelectPet} />;
}
