import { useState, useEffect } from 'react';
import { Pet as PetType } from './WelcomePage';
import Pet from './Pet';
import FoodPanel from './FoodPanel';
import PlayPanel from './PlayPanel';
import StatsPanel from './StatsPanel';

interface GamePageProps {
  selectedPet: PetType;
  onBackToSelection: () => void;
  petStats: any;
  onUpdateStats: (updateFn: (prev: any) => any) => void;
}

export default function GamePage({ selectedPet, onBackToSelection, petStats, onUpdateStats }: GamePageProps) {
  const [feedingAnimation, setFeedingAnimation] = useState<string | null>(null);
  const [playAnimation, setPlayAnimation] = useState<string | null>(null);

  const feedPet = (foodType: string) => {
    setFeedingAnimation(foodType);
    
    // Update pet stats based on food type and pet preferences
    onUpdateStats((prev: any) => {
      let hungerBoost = 0;
      let happinessBoost = 0;
      let healthBoost = 5; // Base health boost for all food
      
      // Pet-specific food bonuses
      if (selectedPet.id === 'bruce') {
        if (foodType === 'bone') hungerBoost = 30;
        else if (foodType === 'water') healthBoost = 30;
      } else if (selectedPet.id === 'manny') {
        if (foodType === 'mealworm') hungerBoost = 30;
        else if (foodType === 'water') healthBoost = 30;
      } else if (selectedPet.id === 'sonic') {
        if (foodType === 'earthworm') hungerBoost = 30;
        else if (foodType === 'water') healthBoost = 30;
      }
      
      // Add baseline happiness for any food (except water)
      if (foodType !== 'water') happinessBoost += 10;
      
      return {
        ...prev,
        hunger: Math.min(100, prev.hunger + hungerBoost),
        happiness: Math.min(100, prev.happiness + happinessBoost),
        health: Math.min(100, prev.health + healthBoost),
        lastFed: Date.now()
      };
    });

    // Clear animation after 2 seconds
    setTimeout(() => setFeedingAnimation(null), 2000);
  };

  const playWithPet = (playType: string) => {
    setPlayAnimation(playType);
    
    // Update pet stats based on play type
    onUpdateStats((prev: any) => {
      let happinessBoost = 0;
      
      // Play-specific bonuses
      if (selectedPet.id === 'bruce') {
        if (playType === 'tennis_ball') happinessBoost = 20;
      } else if (selectedPet.id === 'manny') {
        if (playType === 'chase_ant') happinessBoost = 20;
      } else if (selectedPet.id === 'sonic') {
        if (playType === 'high_five') happinessBoost = 20;
      }
      
      return {
        ...prev,
        happiness: Math.min(100, prev.happiness + happinessBoost),
        lastFed: Date.now()
      };
    });

    // Clear animation after 2 seconds
    setTimeout(() => setPlayAnimation(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToSelection}
              className="pixel-button bg-gray-100 hover:bg-gray-200 px-4 py-2 text-sm font-bold"
            >
              ← Change Pet
            </button>
            <h1 className="text-4xl font-bold pixel-art">
              🐾 TAMAZOO 🐾
            </h1>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Caring for {selectedPet.name}</p>
            <p className="text-sm text-gray-600">{selectedPet.description}</p>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Food and Play Panels */}
          <div className="lg:col-span-3 space-y-6">
            <FoodPanel 
              onFeedPet={feedPet} 
              petType={selectedPet.id}
            />
            <PlayPanel 
              onPlayWithPet={playWithPet} 
              petType={selectedPet.id}
            />
          </div>

          {/* Pet Area - Center */}
          <div className="lg:col-span-6">
            <div className="game-screen h-96 flex items-center justify-center relative">
              <Pet 
                pet={selectedPet}
                stats={petStats} 
                feedingAnimation={feedingAnimation || playAnimation}
              />
            </div>
          </div>

          {/* Stats Panel - Right */}
          <div className="lg:col-span-3">
            <StatsPanel 
              stats={petStats} 
              petName={selectedPet.name} 
            />
          </div>
        </div>


      </div>
    </div>
  );
} 