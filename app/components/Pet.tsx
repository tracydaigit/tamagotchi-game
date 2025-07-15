import { Pet as PetType } from './WelcomePage';

interface PetProps {
  pet: PetType;
  stats: {
    hunger: number;
    happiness: number;
    health: number;
    lastFed: number;
  };
  feedingAnimation: string | null;
}

export default function Pet({ pet, stats, feedingAnimation }: PetProps) {
  // Determine pet's mood based on stats
  const getMoodEmoji = () => {
    if (stats.health < 30) return '😵';
    if (stats.hunger < 20) return '😫';
    if (stats.happiness > 80) return '😄';
    if (stats.happiness > 60) return '😊';
    if (stats.happiness > 40) return '😐';
    return '😔';
  };

  const getPetSprite = () => {
    const mood = getMoodEmoji();
    let petEmoji = pet.emoji;
    let spriteStyle = {};

    // Apply special styling for different pets
    if (pet.id === 'bruce') {
      // Black dog with CSS filter
      spriteStyle = { filter: 'hue-rotate(180deg) brightness(0.3) saturate(0)' };
    } else if (pet.id === 'manny') {
      // Mantis - keep natural green color
      petEmoji = '🦗';
    } else if (pet.id === 'sonic') {
      // Hedgehog - keep natural color
      petEmoji = '🦔';
    }
    
    return (
      <div className="relative">
        {/* Pet Body */}
        <div className="text-6xl pixel-art select-none">
          <div className="flex flex-col items-center">
            {/* Head */}
            <div className="relative">
              <span style={spriteStyle}>{petEmoji}</span>
              <span className="absolute -top-2 -right-2 text-lg">{mood}</span>
            </div>
          </div>
        </div>
        
        {/* Feeding/Play Animation */}
        {feedingAnimation && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <span className="text-2xl">
              {feedingAnimation === 'bone' ? '🦴' : 
               feedingAnimation === 'mealworm' ? '🐛' :
               feedingAnimation === 'earthworm' ? '🪱' :
               feedingAnimation === 'tennis_ball' ? '🎾' :
               feedingAnimation === 'chase_ant' ? '🐜' :
               feedingAnimation === 'high_five' ? '✋' :
               '💧'}
            </span>
          </div>
        )}
        
        {/* Hearts when happy */}
        {stats.happiness > 80 && (
          <div className="absolute -top-6 -left-4 animate-pulse">
            <span className="text-red-500">💖</span>
          </div>
        )}
        
        {/* Hunger indicator */}
        {stats.hunger < 30 && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <span className="text-xl animate-pulse">💭💭💭</span>
          </div>
        )}

        {/* Pet-specific indicators */}
        {pet.id === 'manny' && stats.happiness > 70 && (
          <div className="absolute -top-4 -right-6 animate-bounce">
            <span className="text-green-500">🍃</span>
          </div>
        )}
        
        {pet.id === 'sonic' && stats.health > 80 && (
          <div className="absolute -bottom-2 -right-4 animate-spin">
            <span className="text-blue-500">💨</span>
          </div>
        )}
      </div>
    );
  };

  // Pet-specific status messages
  const getPetStatusMessage = () => {
    if (stats.hunger < 20) {
      if (pet.id === 'manny') return "I need some tasty insects!";
      if (pet.id === 'sonic') return "I'm super hungry!";
      return "I'm hungry!";
    }
    
    if (stats.happiness < 30 && stats.hunger >= 20) {
      if (pet.id === 'manny') return "I need to meditate...";
      if (pet.id === 'sonic') return "I want to run around!";
      return "I need some fun!";
    }
    
    if (stats.health < 50) {
      if (pet.id === 'manny') return "My wings feel weak...";
      if (pet.id === 'sonic') return "I don't feel speedy...";
      return "I don't feel well...";
    }
    
    if (stats.happiness > 80 && stats.hunger > 50) {
      if (pet.id === 'manny') return "Zen and happy!";
      if (pet.id === 'sonic') return "Gotta go fast!";
      return "I'm so happy!";
    }
    
    return "";
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Pet Sprite */}
      <div className="relative pixel-art">
        {getPetSprite()}
      </div>
      
      {/* Pet Name */}
      <div className="text-center">
        <h3 className="text-lg font-bold">
          {pet.name}
        </h3>
        <p className="text-xs text-gray-600 mt-1">{pet.type}</p>
      </div>
      
      {/* Status Message */}
      <div className="text-center text-sm min-h-[1.5rem]">
        {getPetStatusMessage() && (
          <p className={`
            font-bold animate-pulse
            ${stats.hunger < 20 ? 'text-red-600' : ''}
            ${stats.happiness < 30 && stats.hunger >= 20 ? 'text-blue-600' : ''}
            ${stats.health < 50 ? 'text-red-800' : ''}
            ${stats.happiness > 80 && stats.hunger > 50 ? 'text-green-600' : ''}
          `}>
            {getPetStatusMessage()}
          </p>
        )}
      </div>
    </div>
  );
} 