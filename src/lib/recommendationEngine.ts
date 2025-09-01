import { Book, SAMPLE_BOOKS } from './bookData';

export interface UserPreferences {
  favoriteGenres: string[];
  favoriteBooks: string[];
  preferredLength: 'short' | 'medium' | 'long' | 'any';
  preferredRating: number;
  tags: string[];
}

export class RecommendationEngine {
  private books: Book[];
  
  constructor(books: Book[] = SAMPLE_BOOKS) {
    this.books = books;
  }
  
  getRecommendations(preferences: UserPreferences, limit: number = 5): Book[] {
    const scores = this.books.map(book => ({
      book,
      score: this.calculateScore(book, preferences)
    }));
    
    return scores
      .filter(item => !preferences.favoriteBooks.includes(item.book.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.book);
  }
  
  private calculateScore(book: Book, preferences: UserPreferences): number {
    let score = 0;
    
    // Genre matching (40% weight)
    const genreMatch = book.genre.filter(g => preferences.favoriteGenres.includes(g)).length;
    score += (genreMatch / Math.max(book.genre.length, 1)) * 40;
    
    // Rating preference (25% weight)
    if (book.rating >= preferences.preferredRating) {
      score += 25;
    } else {
      score += (book.rating / preferences.preferredRating) * 25;
    }
    
    // Length preference (15% weight)
    if (preferences.preferredLength !== 'any') {
      const lengthScore = this.getLengthScore(book.pages, preferences.preferredLength);
      score += lengthScore * 15;
    } else {
      score += 15;
    }
    
    // Tag matching (20% weight)
    const tagMatch = book.tags.filter(t => preferences.tags.includes(t)).length;
    if (preferences.tags.length > 0) {
      score += (tagMatch / preferences.tags.length) * 20;
    } else {
      score += 20;
    }
    
    return score;
  }
  
  private getLengthScore(pages: number, preference: string): number {
    switch (preference) {
      case 'short':
        return pages <= 250 ? 1 : Math.max(0, 1 - (pages - 250) / 250);
      case 'medium':
        return pages >= 250 && pages <= 450 ? 1 : 
               pages < 250 ? 1 - (250 - pages) / 250 :
               Math.max(0, 1 - (pages - 450) / 200);
      case 'long':
        return pages >= 450 ? 1 : Math.max(0, pages / 450);
      default:
        return 1;
    }
  }
  
  searchBooks(query: string): Book[] {
    if (!query.trim()) return this.books;
    
    const lowercaseQuery = query.toLowerCase();
    return this.books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.some(g => g.toLowerCase().includes(lowercaseQuery)) ||
      book.tags.some(t => t.toLowerCase().includes(lowercaseQuery))
    );
  }
}