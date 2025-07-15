interface FoodPanelProps {
  onFeedPet: (foodType: string) => void;
  disabled?: boolean;
  petType?: string;
}

const getFoodItems = (petType?: string) => {
  switch (petType) {
    case 'bruce':
      return [
        {
          id: 'bone',
          name: 'Bone',
          emoji: '🦴',
          description: 'High hunger +30',
          color: 'bg-yellow-100 hover:bg-yellow-200'
        },
        {
          id: 'water',
          name: 'Water',
          emoji: '💧',
          description: 'High health +30',
          color: 'bg-blue-100 hover:bg-blue-200'
        }
      ];
    case 'manny':
      return [
        {
          id: 'mealworm',
          name: 'Mealworm',
          emoji: '🐛',
          description: 'High hunger +30',
          color: 'bg-orange-100 hover:bg-orange-200'
        },
        {
          id: 'water',
          name: 'Water',
          emoji: '💧',
          description: 'High health +30',
          color: 'bg-blue-100 hover:bg-blue-200'
        }
      ];
    case 'sonic':
      return [
        {
          id: 'earthworm',
          name: 'Earthworm',
          emoji: '🪱',
          description: 'High hunger +30',
          color: 'bg-amber-100 hover:bg-amber-200'
        },
        {
          id: 'water',
          name: 'Water',
          emoji: '💧',
          description: 'High health +30',
          color: 'bg-blue-100 hover:bg-blue-200'
        }
      ];
    default:
      return [
        {
          id: 'generic_food',
          name: 'Food',
          emoji: '🍽️',
          description: 'Choose a pet first',
          color: 'bg-gray-100 hover:bg-gray-200'
        }
      ];
  }
};

export default function FoodPanel({ onFeedPet, disabled = false, petType }: FoodPanelProps) {
  const foodItems = getFoodItems(petType);
  return (
    <div className="pixel-border bg-white p-4 h-fit">
      <h2 className="text-xl font-bold mb-4 text-center pixel-art">
        🍽️ FOOD
      </h2>
      
      <div className="space-y-3">
        {foodItems.map((food) => (
          <button
            key={food.id}
            onClick={() => !disabled && onFeedPet(food.id)}
            disabled={disabled}
            className={`
              w-full p-4 pixel-button ${food.color}
              flex flex-col items-center space-y-2
              transform transition-all duration-150
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
            `}
          >
            <span className="text-3xl pixel-art">{food.emoji}</span>
            <span className="font-bold text-sm">{food.name}</span>
            <span className="text-xs text-gray-600">{food.description}</span>
          </button>
        ))}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Click to feed your pet!
      </div>
    </div>
  );
} 