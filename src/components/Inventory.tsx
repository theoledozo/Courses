import React, { useState, useEffect } from 'react';
    import { Plus, Trash2, RotateCcw } from 'lucide-react';
    import { supabase } from '../lib/supabase';
    import toast from 'react-hot-toast';

    interface InventoryItem {
      id: number;
      name: string;
      quantity: number;
      created_at: string;
    }

    export default function Inventory() {
      const [items, setItems] = useState<InventoryItem[]>([]);
      const [newItem, setNewItem] = useState('');

      useEffect(() => {
        fetchItems();
      }, []);

      async function fetchItems() {
        const { data, error } = await supabase
          .from('inventory_items')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          toast.error('Erreur lors du chargement de l\'inventaire');
          return;
        }
        setItems(data || []);
      }

      async function addItem(e: React.FormEvent) {
        e.preventDefault();
        if (!newItem.trim()) return;

        const { error } = await supabase
          .from('inventory_items')
          .insert([{ name: newItem.trim(), quantity: 1 }]);

        if (error) {
          toast.error('Erreur lors de l\'ajout de l\'article à l\'inventaire');
          return;
        }

        toast.success('Article ajouté à l\'inventaire');
        setNewItem('');
        fetchItems();
      }

      async function updateQuantity(id: number, newQuantity: number) {
        if (newQuantity <= 0) {
          await deleteItem(id);
          return;
        }

        const { error } = await supabase
          .from('inventory_items')
          .update({ quantity: newQuantity })
          .eq('id', id);

        if (error) {
          toast.error('Erreur lors de la mise à jour de la quantité');
          return;
        }

        fetchItems();
      }

      async function deleteItem(id: number) {
        const { error } = await supabase
          .from('inventory_items')
          .delete()
          .eq('id', id);

        if (error) {
          toast.error('Erreur lors de la suppression de l\'inventaire');
          return;
        }

        toast.success('Article supprimé de l\'inventaire');
        fetchItems();
      }

      async function resetList() {
        const { error } = await supabase
          .from('inventory_items')
          .delete()
          .neq('id', 0);

        if (error) {
          toast.error('Erreur lors de la réinitialisation de l\'inventaire');
          return;
        }

        toast.success('Inventaire réinitialisé');
        fetchItems();
      }

      return (
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Inventaire</h1>

          <form onSubmit={addItem} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Ajouter un article à l'inventaire..."
                className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                <Plus size={24} />
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 mb-2 rounded-lg shadow-sm"
              >
                <span className="flex-grow">{item.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-green-500 hover:text-green-700 px-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <button
              onClick={resetList}
              className="mt-6 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Réinitialiser l'inventaire
            </button>
          )}
        </div>
      );
    }
