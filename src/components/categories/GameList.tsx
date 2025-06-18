import {Plus, Save, X} from "lucide-react";
import React, {useEffect, useState} from "react";
import _ from "lodash";
import {useGameStore} from "@/services/games/gamesService";

type Props = {
  categoryId: number,
  games: Game[];
  title: string
}
export default function GameList({games, title, categoryId}: Props) {
  const [currentGames, setCurrentGames] = useState([] as Game[]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {updateGame, deleteGame} = useGameStore()
  useEffect(() => {
    if(!_.isEmpty(games)) {
      setCurrentGames(games);
    }
  }, [JSON.stringify(games)]);

  const handleArrayChange = (index: number, value: string) => {
    currentGames[index] = { ...currentGames[index], name: value};
    setCurrentGames([...currentGames]);
  };

  const addArrayItem = () => {
    setCurrentGames([...currentGames, {name: ""}])
  };

  const removeArrayItem = async (game: Game) => {
    setIsSubmitting(true)
    if(game.id) {
      await deleteGame(game.id)
    }
    setIsSubmitting(false)
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await updateGame(categoryId, currentGames)
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {title}
      </label>
      <div className="space-y-3">
        {currentGames.map((game, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={game.name}
              onChange={(e) => handleArrayChange(index, e.target.value)}
              className="flex-6 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder={`${title} ${index + 1}`}
            />
            {currentGames.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(game)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5"/>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem()}
          className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4"/>
          <span>Thêm {title}</span>
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-md hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5"/>
              <span>Cập nhật danh sách game</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}