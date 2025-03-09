 import React, { useState } from 'react';
 import { Toaster } from 'react-hot-toast';
 import ShoppingList from './components/ShoppingList';
-import RecipeGenerator from './components/RecipeGenerator';
+import RecipeGenerator from './components/RecipeGenerator';
 import { ListChecks, ChefHat } from 'lucide-react';

 function App() {
@@ -34,7 +34,7 @@
       </div>

       <div className="pb-20">
-        {activeTab === 'shopping' ? <ShoppingList /> : <RecipeGenerator />}
+        {activeTab === 'inventory' ? <Inventory /> : <RecipeGenerator />}
       </div>
     </div>
   );
