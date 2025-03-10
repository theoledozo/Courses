import React, { useState, useEffect } from 'react';
import { ChefHat, Loader2, RotateCcw, Plus } from 'lucide-react';
import { generateRecipe } from '../lib/gemini';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Recipe {
  id: string;
  ingredients: string[];
  suggestion: string;
  created_at: string;
}

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement des recettes');
      return;
    }
    setRecipes(data || []);
  }

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredient.trim()) return;
    setIngredients([...ingredients, newIngredient.trim()]);
    setNewIngredient('');
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      toast.error('Ajoutez des ingrédients d\'abord !');
      return;
    }

    setLoading(true);
    try {
      const suggestion = await generateRecipe(ingredients);
      
      const { error } = await supabase
        .from('recipes')
        .insert([{
          ingredients,
          suggestion
        }]);

      if (error) throw error;
      
      toast.success('Recette générée et sauvegardée !');
      fetchRecipes();
    } catch (error) {
      toast.error('Erreur lors de la génération de la recette');
    } finally {
      setLoading(false);
    }
  };

  const resetRecipes = async () => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .neq('id', '0');

    if (error) {
      toast.error('Erreur lors de la réinitialisation');
      return;
    }

    toast.success('Historique des recettes réinitialisé');
    setIngredients([]);
    setRecipes([]);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Générateur de Recettes</h1>
      
      <form onSubmit={addIngredient} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Ajouter un ingrédient..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
          >
            <Plus size={24} />
          </button>
        </div>
      </form>

      <div className="mb-6">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-3 mb-2 rounded-lg"
            onClick={() => removeIngredient(index)}
          >
            <span>{ingredient}</span>
            <button className="text-red-500">×</button>
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerateRecipe}
        disabled={loading || ingredients.length === 0}
        className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Génération en cours...
          </>
        ) : (
          <>
            <ChefHat size={20} />
            Générer une recette
          </>
        )}
      </button>

      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">
              Ingrédients: {recipe.ingredients.join(', ')}
            </div>
            <div className="prose prose-sm">
              {recipe.suggestion.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {recipes.length > 0 && (
        <button
          onClick={resetRecipes}
          className="mt-6 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Réinitialiser l'historique
        </button>
      )}
    </div>
  );
}
