import { useState, useEffect } from 'react';
import { BookCard } from '@/components/BookCard';
import { PreferencesPanel } from '@/components/PreferencesPanel';
import { RecommendationEngine, UserPreferences } from '@/lib/recommendationEngine';
import { SAMPLE_BOOKS, Book } from '@/lib/bookData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Sparkles, TrendingUp, Users } from 'lucide-react';

const engine = new RecommendationEngine(SAMPLE_BOOKS);

const Index = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    favoriteGenres: ['Fiction'],
    favoriteBooks: [],
    preferredLength: 'any',
    preferredRating: 3.5,
    tags: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'search' | 'favorites'>('recommendations');

  useEffect(() => {
    const newRecommendations = engine.getRecommendations(preferences, 6);
    setRecommendations(newRecommendations);
  }, [preferences]);

  useEffect(() => {
    const results = engine.searchBooks(searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  const addToFavorites = (bookId: string) => {
    const newFavorites = preferences.favoriteBooks.includes(bookId)
      ? preferences.favoriteBooks.filter(id => id !== bookId)
      : [...preferences.favoriteBooks, bookId];
    
    setPreferences({ ...preferences, favoriteBooks: newFavorites });
  };

  const favoriteBooks = SAMPLE_BOOKS.filter(book => preferences.favoriteBooks.includes(book.id));

  const displayBooks = () => {
    switch (activeTab) {
      case 'search':
        return searchResults;
      case 'favorites':
        return favoriteBooks;
      default:
        return recommendations;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'search':
        return searchQuery ? `Search Results for "${searchQuery}"` : 'Search Books';
      case 'favorites':
        return 'Your Favorite Books';
      default:
        return 'Recommended for You';
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'search':
        return searchQuery ? 'No books found for your search.' : 'Start typing to search for books...';
      case 'favorites':
        return 'You haven\'t added any favorite books yet. Heart some books to see them here!';
      default:
        return 'Adjust your preferences to get personalized recommendations.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <BookOpen className="h-16 w-16 text-white animate-float" />
              <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-bounce-slow" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Your Next
            <span className="block text-yellow-200">Great Read</span>
          </h1>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Get personalized book recommendations based on your reading preferences, favorite genres, and past reads.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PreferencesPanel 
              preferences={preferences}
              onPreferencesChange={setPreferences}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
                <Input
                  placeholder="Search books by title, author, genre, or tags..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) {
                      setActiveTab('search');
                    }
                  }}
                  className="pl-10 border-amber-200 focus:border-amber-400 bg-white"
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={activeTab === 'recommendations' ? 'default' : 'outline'}
                onClick={() => setActiveTab('recommendations')}
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Recommendations
                <Badge variant="secondary" className="ml-1">
                  {recommendations.length}
                </Badge>
              </Button>
              <Button
                variant={activeTab === 'search' ? 'default' : 'outline'}
                onClick={() => setActiveTab('search')}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search Results
                <Badge variant="secondary" className="ml-1">
                  {searchResults.length}
                </Badge>
              </Button>
              <Button
                variant={activeTab === 'favorites' ? 'default' : 'outline'}
                onClick={() => setActiveTab('favorites')}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Favorites
                <Badge variant="secondary" className="ml-1">
                  {favoriteBooks.length}
                </Badge>
              </Button>
            </div>

            {/* Content Area */}
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                {getTabTitle()}
              </h2>

              {displayBooks().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayBooks().map(book => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onAddToFavorites={addToFavorites}
                      isFavorite={preferences.favoriteBooks.includes(book.id)}
                      variant={activeTab === 'search' ? 'compact' : 'default'}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <p className="text-amber-700 text-lg">
                    {getEmptyMessage()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;