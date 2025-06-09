'use client'
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import QuickViewModal from "@/components/accounts/QuickViewModal";
import CartAccount from "@/components/accounts/CartAccount";
import EmptyList from "@/components/accounts/EmptyList";
import Pagination from "@/components/common/Pagination";
import {useCategoryStore} from "@/services/categories/categoriesService";
import {useGameStore} from "@/services/games/gamesService";
import Link from "next/link";
import {useAccountStore} from "@/services/accounts/accountsService";
import _ from "lodash";

const AccountManagementDashboard = () => {
  const [params, setParams] = useState({} as {[key: string]: string});
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null as Account | null);
  // const [categories, setCategories] = useState([] as Category[]);
  const {categories, getCategories} = useCategoryStore()
  const {games, getGames} = useGameStore()
  const {accounts, filter, totalAccounts, deleteAccount} = useAccountStore()
  const onFilter = (key: string, value: string) => {
    if(value === "0") {
      delete params[key];
      filter(params);
      return;
    }
    delete params["page"]
    delete params["gameId"]
    params[key] = value;
    setParams(params);
    filter(params);
    if(params["categoryId"]) getGames(params["categoryId"])
  }

  useEffect(() => {
    filter({status: "available"})
    if (_.isEmpty(categories)) {
      getCategories();
    }
  }, []);

  const search = (value: string) => {
    if(value.length > 0 && value.length < 3) return;
    if(!value) {
      filter({})
      return;
    }
    filter({keyword: value});
  }

  const handleEdit = (account: Account) => {
    setCurrentAccount(account);
    setShowModal(true);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý tài khoản game</h1>
          <p className="text-gray-600">Quản lý thông tin tài khoản</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng tài khoản</p>
                <p className="text-2xl font-bold text-gray-900">{totalAccounts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 text-gray-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                <input
                  type="text"
                  placeholder="Search accounts, games, or info..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => search(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                <select
                  className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={params["status"] ?? "available"}
                  onChange={(e) => onFilter("status", e.target.value)}
                >
                  <option value={"available"}>Còn hàng</option>
                  <option value={"sold"}>Hết hàng</option>
                  <option value={"pending"}>Chờ xử lý</option>
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                <select
                  className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={params["categoryId"] ?? "ALL"}
                  onChange={(e) => onFilter("categoryId", e.target.value)}
                >
                  <option value="0">Danh mục</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                <select
                  className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={params["gameId"] ?? "ALL"}
                  onChange={(e) => onFilter("gameId", e.target.value)}
                >
                  <option value="0">Game</option>
                  {games.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-2">
              {/*<button*/}
              {/*  className="flex items-center px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50 transition-colors">*/}
              {/*  <Download className="w-4 h-4 mr-2"/>*/}
              {/*  Export*/}
              {/*</button>*/}
              {/*<button*/}
              {/*  className="flex items-center px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50 transition-colors">*/}
              {/*  <Upload className="w-4 h-4 mr-2"/>*/}
              {/*  Import*/}
              {/*</button>*/}
              <Link
                href={"/san-pham/add"}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm tài khoản
              </Link>
            </div>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {accounts.map((account) => (
            <CartAccount account={account} key={account.id} handleEditAction={handleEdit} />
          ))}
        </div>

        {/* No results message */}
        {accounts.length === 0 && (
          <EmptyList />
        )}

        {/* Pagination */}
        <Pagination currentLength={accounts.length} total={totalAccounts} onChangePageAction={(page) => onFilter("page", page.toString())} />
      </div>

      {/* Modal */}
      {showModal && <QuickViewModal account={currentAccount} setShowModalAction={setShowModal} />}
    </div>
  );
};

export default AccountManagementDashboard;