interface StatsPanelProps {
  stats: {
    hunger: number;
    happiness: number;
    health: number;
    lastFed: number;
  };
  petName?: string;
}

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon: string;
}

function StatBar({ label, value, maxValue, color, icon }: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold flex items-center gap-1">
          <span>{icon}</span>
          {label}
        </span>
        <span className="text-xs">{value}/{maxValue}</span>
      </div>
      
      {/* Pixel-style progress bar */}
      <div className="pixel-border bg-gray-100 h-6 overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-300 pixel-art`}
          style={{ width: `${percentage}%` }}
        >
          {/* Pixel pattern overlay */}
          <div className="h-full w-full opacity-30 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default function StatsPanel({ stats, petName = 'Pet' }: StatsPanelProps) {
  const getLastFedText = () => {
    const timeDiff = Date.now() - stats.lastFed;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="pixel-border bg-white p-4 h-fit">
      <h2 className="text-xl font-bold mb-4 text-center pixel-art">
        📊 {petName} STATS
      </h2>
      
      <div className="space-y-1">
        <StatBar
          label="Hunger"
          value={stats.hunger}
          maxValue={100}
          color="bg-orange-400"
          icon="🍽️"
        />
        
        <StatBar
          label="Happiness"
          value={stats.happiness}
          maxValue={100}
          color="bg-yellow-400"
          icon="😊"
        />
        
        <StatBar
          label="Health"
          value={stats.health}
          maxValue={100}
          color="bg-green-400"
          icon="💚"
        />
      </div>
      
      {/* Additional Info */}
      <div className="mt-4 pt-3 border-t-2 border-gray-300">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Last Fed:</span>
            <span className="font-bold">{getLastFedText()}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-bold">
              {stats.health < 50 ? '🤒 Sick' : 
               stats.hunger < 30 ? '😋 Hungry' :
               stats.happiness > 80 ? '🥳 Happy' : '😐 OK'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Care Tips */}
      <div className="mt-3 p-2 bg-blue-50 rounded pixel-border">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Feed regularly to keep your pet happy and healthy!
        </p>
      </div>
    </div>
  );
} 