
 import React, { useState } from 'react';
 import { Toaster } from 'react-hot-toast';
 import ShoppingList from './components/ShoppingList';
-import RecipeGenerator from './components/RecipeGenerator';
+import Inventory from './components/Inventory';
+import RecipeGenerator from './components/RecipeGenerator';
 import { ListChecks, ChefHat } from 'lucide-react';
 
 function App() {
-  const [activeTab, setActiveTab] = useState<'shopping' | 'recipes'>('shopping');
+  const [activeTab, setActiveTab] = useState<'shopping' | 'recipes' | 'inventory'>('shopping');
 
   return (
     <div className="min-h-screen bg-gray-100">

       </div>
 
       <div className="pb-20">
-        {activeTab === 'inventory' ? <Inventory /> : <ShoppingList />}
+        {activeTab === 'shopping' && <ShoppingList />}
+        {activeTab === 'recipes' && <RecipeGenerator />}
+        {activeTab === 'inventory' && <Inventory />}
+        {/* Default case for unexpected tab states */}
+        {activeTab !== 'shopping' && activeTab !== 'recipes' && activeTab !== 'inventory' && <p>Invalid tab selected.</p>}
       </div>
     </div>
   );
