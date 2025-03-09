import React from 'react';
import { Box } from 'lucide-react';

export default function Inventory() {
  return (
    &lt;div className="max-w-md mx-auto p-4"&gt;
      &lt;h1 className="text-2xl font-bold text-center mb-6"&gt;
        &lt;Box size={24} className="inline-block mr-2" /&gt; Inventaire
      &lt;/h1&gt;
      &lt;p&gt;This is a placeholder for your inventory. Add your inventory display logic here.&lt;/p&gt;
    &lt;/div&gt;
  );
}
