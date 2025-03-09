import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ShoppingList from './components/ShoppingList';
import RecipeGenerator from './components/RecipeGenerator';
import { ListChecks, ChefHat } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'shopping' | 'recipes'>('shopping');

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2">
        <button
          onClick={() => setActiveTab('shopping')}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === 'shopping' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <ListChecks size={24} />
          <span className="text-sm">Courses</span>
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === 'recipes' ? 'text-orange-500' : 'text-gray-500'
          }`}
        >
          <ChefHat size={24} />
          <span className="text-sm">Recettes</span>
        </button>
      </div>

      <div className="pb-20">
        {activeTab === 'shopping' ? <ShoppingList /> : <RecipeGenerator />}
      </div>
    </div>
  );
}

export default App;
