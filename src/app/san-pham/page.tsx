'use client'
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Download, Upload } from 'lucide-react';
import QuickViewModal from "@/components/accounts/QuickViewModal";
import CartAccount from "@/components/accounts/CartAccount";
import EmptyList from "@/components/accounts/EmptyList";
import Pagination from "@/components/common/Pagination";

const AccountManagementDashboard = () => {
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [filteredAccounts, setFilteredAccounts] = useState([] as Account[]);
  const [params, setParams] = useState({} as {[key: string]: string});
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null as Account | null);
  const [categories, setCategories] = useState([] as Category[]);


  // Get unique categories and games for filters
  // const games = [...new Set(accounts.map(acc => acc.game))];

  const onFilter = (key: string, value: string) => {
    if(value === "0") {
      delete params[key];
      fillter(params);
      return;
    }
    params[key] = value;
    setParams(params);
    fillter(params);
  }

  useEffect(() => {
    fillter({})
  }, []);

  const fillter= async (params: {[key: string]: string}) => {
    const [requestCategories, requestAccounts] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'force-cache',
        next: {revalidate: 60}
      }),
      fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/accounts?${new URLSearchParams(params)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    ]);
    const { categories } = (await requestCategories.json());
    const { content: accounts, totalElements } = (await requestAccounts.json());
    setFilteredAccounts(accounts);
    setCategories(categories);
    setTotalAccounts(totalElements);
  }

  const search = (value: string) => {
    if(value.length > 0 && value.length < 3) return;
    if(!value) {
      fillter({})
      return;
    }
    fillter({keyword: value});
  }

  const handleEdit = (account: Account) => {
    setCurrentAccount(account);
    setShowModal(true);
  };

  // const handleDelete = (id: number) => {
  //   if (window.confirm('Are you sure you want to delete this account?')) {
  //     setAccounts(accounts.filter(acc => acc.id !== id));
  //   }
  // };

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

          {/*<div className="bg-white p-6 rounded-lg shadow-sm border">*/}
          {/*  <div className="flex items-center justify-between">*/}
          {/*    <div>*/}
          {/*      <p className="text-sm text-gray-600">Premium Accounts</p>*/}
          {/*      <p className="text-2xl font-bold text-purple-600">{accounts.filter(a => a.category === 'Premium').length}</p>*/}
          {/*    </div>*/}
          {/*    <div className="bg-purple-100 p-3 rounded-lg">*/}
          {/*      <div className="w-6 h-6 bg-purple-600 rounded"></div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="bg-white p-6 rounded-lg shadow-sm border">*/}
          {/*  <div className="flex items-center justify-between">*/}
          {/*    <div>*/}
          {/*      <p className="text-sm text-gray-600">Average Price</p>*/}
          {/*      <p className="text-2xl font-bold text-green-600">*/}
          {/*        ${(accounts.reduce((sum, acc) => sum + acc.price, 0) / accounts.length).toFixed(0)}*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*    <div className="bg-green-100 p-3 rounded-lg">*/}
          {/*      <div className="w-6 h-6 bg-green-600 rounded"></div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="bg-white p-6 rounded-lg shadow-sm border">*/}
          {/*  <div className="flex items-center justify-between">*/}
          {/*    <div>*/}
          {/*      <p className="text-sm text-gray-600">Total Value</p>*/}
          {/*      <p className="text-2xl font-bold text-orange-600">*/}
          {/*        ${totalAccounts}*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*    <div className="bg-orange-100 p-3 rounded-lg">*/}
          {/*      <div className="w-6 h-6 bg-orange-600 rounded"></div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 text-gray-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search accounts, games, or info..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => search(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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

              {/*<select*/}
              {/*  className="px-4 py-2 border rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"*/}
              {/*  value={selectedGame}*/}
              {/*  onChange={(e) => setSelectedGame(e.target.value)}*/}
              {/*>*/}
              {/*  <option value="ALL">All Games</option>*/}
              {/*  {games.map(game => (*/}
              {/*    <option key={game} value={game}>{game}</option>*/}
              {/*  ))}*/}
              {/*</select>*/}
            </div>

            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </button>
              <button
                onClick={() => {
                  setCurrentAccount(null);
                  setShowModal(true);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </button>
            </div>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {filteredAccounts.map((account) => (
            <CartAccount account={account} key={account.id} handleEditAction={handleEdit} />
          ))}
        </div>

        {/* No results message */}
        {filteredAccounts.length === 0 && (
          <EmptyList />
        )}

        {/* Pagination */}
        <Pagination currentLength={filteredAccounts.length} total={totalAccounts} onChangePageAction={(page) => onFilter("page", page.toString())} />
      </div>

      {/* Modal */}
      {showModal && currentAccount && <QuickViewModal account={currentAccount} setShowModalAction={setShowModal} />}
    </div>
  );
};

export default AccountManagementDashboard;