import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { User } from '../types';
import { loadUsers, getTotalUsersCount } from '../dataGenerator';
import LeaderboardRow from './LeaderboardRow';

const ITEMS_PER_PAGE = 50;

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observerTarget = useRef<HTMLDivElement>(null);
  const totalUsers = getTotalUsersCount();

  const rankWidth = useMemo(() => {
    const maxRank = users.length;
    const digits = String(maxRank).length;
    return Math.max(20, 20 + digits * 10);
  }, [users.length]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const initialUsers = await loadUsers(0, ITEMS_PER_PAGE);
        setUsers(initialUsers);
        setHasMore(initialUsers.length < totalUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    loadInitialData();
  }, [totalUsers]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const offset = users.length;
    const newUsers = await loadUsers(offset, ITEMS_PER_PAGE);
    
    setUsers(prev => [...prev, ...newUsers]);
    setLoading(false);
    setHasMore(offset + newUsers.length < totalUsers);
  }, [loading, hasMore, users.length, totalUsers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, loading]);

  const handleRowSelect = useCallback((index: number) => {
    setSelectedIndex(prev => prev === index ? null : index);
  }, []);

  if (initialLoading) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 md:shadow-xl mt-6">
        <header className="p-5 sm:p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center rounded-t-lg">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Рейтингова таблиця</h1>
          <p className="text-sm opacity-90">Гоночки</p>
        </header>
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Завантаження...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 md:shadow-xl mt-6 mb-6 rounded-lg overflow-hidden">
      <header className="p-5 sm:p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Рейтингова таблиця</h1>
        <p className="text-sm opacity-90">Гоночки • {totalUsers.toLocaleString('uk-UA')} гравців</p>
      </header>
      
      <div className="relative">
        {users.map((user, index) => (
          <LeaderboardRow
            key={`${index}-${user.name}`}
            user={user}
            rank={index + 1}
            isSelected={selectedIndex === index}
            onSelect={() => handleRowSelect(index)}
            rankWidth={rankWidth}
          />
        ))}
        
        <div ref={observerTarget} className="h-5 pointer-events-none" />
        
        {loading && (
          <div className="flex flex-col items-center justify-center p-8 gap-4">
            <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Завантаження...</p>
          </div>
        )}
        
        {!hasMore && users.length > 0 && (
          <div className="text-center p-8 text-gray-400 dark:text-gray-500 text-sm border-t border-gray-100 dark:border-gray-800">
            Усі {users.length} гравців завантажено
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
