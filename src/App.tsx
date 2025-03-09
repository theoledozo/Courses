import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ShoppingList from './components/ShoppingList';
import RecipeGenerator from './components/RecipeGenerator';
import Inventory from './components/Inventory';
import { ListChecks, ChefHat, Box } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState&lt;'shopping' | 'recipes' | 'inventory'&gt;('shopping');

  return (
    &lt;div className="min-h-screen bg-gray-100"&gt;
      &lt;Toaster position="top-center" /&gt;

      &lt;div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2"&gt;
        &lt;button
          onClick={() =&gt; setActiveTab('shopping')}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === 'shopping' ? 'text-blue-500' : 'text-gray-500'
          }`}
        &gt;
          &lt;ListChecks size={24} /&gt;
          &lt;span className="text-sm"&gt;Courses&lt;/span&gt;
        &lt;/button&gt;
        &lt;button
          onClick={() =&gt; setActiveTab('inventory')}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === 'inventory' ? 'text-green-500' : 'text-gray-500'
          }`}
        &gt;
          &lt;Box size={24} /&gt;
          &lt;span className="text-sm"&gt;Inventaire&lt;/span&gt;
        &lt;/button&gt;
        &lt;button
          onClick={() =&gt; setActiveTab('recipes')}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === 'recipes' ? 'text-orange-500' : 'text-gray-500'
          }`}
        &gt;
          &lt;ChefHat size={24} /&gt;
          &lt;span className="text-sm"&gt;Recettes&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;

      &lt;div className="pb-20"&gt;
        {activeTab === 'shopping' ? &lt;ShoppingList /&gt; :
         activeTab === 'recipes' ? &lt;RecipeGenerator /&gt; :
         &lt;Inventory /&gt;}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

export default App;
