interface PlayPanelProps {
  onPlayWithPet: (playType: string) => void;
  disabled?: boolean;
  petType?: string;
}

const getPlayItems = (petType?: string) => {
  switch (petType) {
    case 'bruce':
      return [
        {
          id: 'tennis_ball',
          name: 'Tennis Ball',
          emoji: '🎾',
          description: 'Happiness +20',
          color: 'bg-green-100 hover:bg-green-200'
        }
      ];
    case 'manny':
      return [
        {
          id: 'chase_ant',
          name: 'Chase Ant',
          emoji: '🐜',
          description: 'Happiness +20',
          color: 'bg-red-100 hover:bg-red-200'
        }
      ];
    case 'sonic':
      return [
        {
          id: 'high_five',
          name: 'High Five',
          emoji: '✋',
          description: 'Happiness +20',
          color: 'bg-yellow-100 hover:bg-yellow-200'
        }
      ];
    default:
      return [];
  }
};

export default function PlayPanel({ onPlayWithPet, disabled = false, petType }: PlayPanelProps) {
  const playItems = getPlayItems(petType);

  if (playItems.length === 0) {
    return null; // Don't render if no play items for this pet
  }

  return (
    <div className="pixel-border bg-white p-4 h-fit">
      <h2 className="text-xl font-bold mb-4 text-center pixel-art">
        🎮 PLAY
      </h2>
      
      <div className="space-y-3">
        {playItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !disabled && onPlayWithPet(item.id)}
            disabled={disabled}
            className={`
              w-full p-4 pixel-button ${item.color}
              flex flex-col items-center space-y-2
              transform transition-all duration-150
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
            `}
          >
            <span className="text-3xl pixel-art">{item.emoji}</span>
            <span className="font-bold text-sm">{item.name}</span>
            <span className="text-xs text-gray-600">{item.description}</span>
          </button>
        ))}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Click to play with your pet!
      </div>
    </div>
  );
} 