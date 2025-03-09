@@ -1,7 +1,7 @@
 import React, { useState } from 'react';
 import { Toaster } from 'react-hot-toast';
 import ShoppingList from './components/ShoppingList';
-import RecipeGenerator from './components/RecipeGenerator';
+import Inventory from './components/Inventory';
 import { ListChecks, ChefHat } from 'lucide-react';

 function App() {
@@ -13,13 +13,13 @@
       
       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2">
         <button
-          onClick={() => setActiveTab('shopping')}
+          onClick={() => setActiveTab('inventory')}
           className={`flex flex-col items-center p-2 rounded-lg ${
-            activeTab === 'shopping' ? 'text-blue-500' : 'text-gray-500'
+            activeTab === 'inventory' ? 'text-blue-500' : 'text-gray-500'
           }`}
         >
           <ListChecks size={24} />
-          <span className="text-sm">Courses</span>
+          <span className="text-sm">Inventaire</span>
         </button>
         <button
           onClick={() => setActiveTab('recipes')}
@@ -34,7 +34,7 @@
       </div>

       <div className="pb-20">
-        {activeTab === 'shopping' ? <ShoppingList /> : <RecipeGenerator />}
+        {activeTab === 'inventory' ? <Inventory /> : <RecipeGenerator />}
       </div>
     </div>
   );
