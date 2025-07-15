interface Pet {
  id: string;
  name: string;
  type: string;
  emoji: string;
  description: string;
  color: string;
}

const availablePets: Pet[] = [
  {
    id: 'bruce',
    name: 'BRUCE',
    type: 'Dog',
    emoji: '🐕',
    description: 'Loyal and friendly',
    color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300'
  },
  {
    id: 'manny',
    name: 'MANNY',
    type: 'Mantis',
    emoji: '🦗',
    description: 'Wise and patient',
    color: 'bg-green-100 hover:bg-green-200 border-green-300'
  },
  {
    id: 'sonic',
    name: 'SONIC',
    type: 'Hedgehog',
    emoji: '🦔',
    description: 'Fast and spiky',
    color: 'bg-blue-100 hover:bg-blue-200 border-blue-300'
  }
];

export { type Pet, availablePets };

interface WelcomePageProps {
  onSelectPet: (pet: Pet) => void;
}

export default function WelcomePage({ onSelectPet }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gray-200 p-4 font-mono flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        {/* Game Title */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 pixel-art">
            🐾 TAMAZOO 🐾
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Welcome to the Digital Pet Universe!
          </p>
          <p className="text-md text-gray-600">
            Choose your companion and embark on a caring adventure
          </p>
        </div>

        {/* Pet Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {availablePets.map((pet) => (
            <div
              key={pet.id}
              className="pixel-border bg-white p-6 hover:scale-105 transform transition-all duration-200"
            >
              {/* Pet Image */}
              <div className="text-8xl mb-4 pixel-art">
                {pet.id === 'bruce' ? (
                  <span style={{ filter: 'hue-rotate(180deg) brightness(0.3) saturate(0)' }}>
                    🐕
                  </span>
                ) : (
                  <span>{pet.emoji}</span>
                )}
              </div>

              {/* Pet Info */}
              <h3 className="text-2xl font-bold mb-2">{pet.name}</h3>
              <p className="text-lg text-gray-600 mb-2">{pet.type}</p>
              <p className="text-sm text-gray-500 mb-4">{pet.description}</p>

              {/* Pet Characteristics */}
              <div className="text-xs text-gray-600 mb-4">
                {pet.id === 'bruce' && (
                  <div>
                    <p>🦴 Loves bones and treats</p>
                    <p>🎾 Enjoys ball games</p>
                    <p>💧 Needs fresh water</p>
                  </div>
                )}
                {pet.id === 'manny' && (
                  <div>
                    <p>🐛 Prefers mealworms</p>
                    <p>🐜 Enjoys chasing ants</p>
                    <p>💧 Needs clean water</p>
                  </div>
                )}
                {pet.id === 'sonic' && (
                  <div>
                    <p>🪱 Loves earthworms</p>
                    <p>✋ Enjoys high fives</p>
                    <p>💧 Needs fresh water</p>
                  </div>
                )}
              </div>

              {/* Choose Button */}
              <button
                onClick={() => onSelectPet(pet)}
                className={`
                  w-full py-3 px-6 pixel-button ${pet.color}
                  font-bold text-lg
                  transform transition-all duration-150
                  hover:scale-105 active:scale-95
                `}
              >
                Choose {pet.name}
              </button>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
} 