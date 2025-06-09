import React from "react";
import {useGameStore} from "@/services/games/gamesService";
import {useCategoryStore} from "@/services/categories/categoriesService";

type Props = {
  gameId: string;
  handleChangeGame: (gameId: string) => void;
}

export default function ChooseGameForm({gameId, handleChangeGame}: Props) {
  const {games, getGames} = useGameStore()
  const {categories} = useCategoryStore()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2">
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          defaultValue="0"
          onChange={(e) => getGames(e.target.value.toString())}
        >
          <option value="0">Danh mục</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          value={gameId}
          name="gameId"
          onChange={(e) => handleChangeGame(e.target.value)}
        >
          <option value="0">Game</option>
          {games.map(game => (
            <option key={game.id} value={game.id}>{game.name}</option>
          ))}
        </select>
      </div>
    </div>
  )
}