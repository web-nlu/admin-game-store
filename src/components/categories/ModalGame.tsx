import AppendList from "@/components/common/AppendList";
import {X} from "lucide-react";
import {useGameStore} from "@/services/games/gamesService";
import {useEffect} from "react";
import GameList from "@/components/categories/GameList";

type Props = {
  category: Category | null;
  afterSubmitAction?: () => void;
  closeAction: () => void;
}

export default function ModalGame({category, closeAction}: Props) {
  const {games, getGames, clearGame} = useGameStore();

  useEffect(() => {
    if(category?.id) {
      getGames(category.id.toString());
    }else {
      closeAction();
    }
  }, [category?.id])

  const handleClose = () => {
    clearGame()
    closeAction();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Danh sách trò chơi
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6"/>
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4 text-gray-500">
            <GameList categoryId={category!.id} games={games} title={"Trò chơi"}/>
          </div>
        </div>
      </div>
    </div>
  )
}