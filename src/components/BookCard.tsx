import { Book } from '@/lib/bookData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Calendar, Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToFavorites?: (bookId: string) => void;
  isFavorite?: boolean;
  variant?: 'default' | 'compact';
}

export function BookCard({ book, onAddToFavorites, isFavorite, variant = 'default' }: BookCardProps) {
  const isCompact = variant === 'compact';
  
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 card-gradient border-amber-100 ${
      isCompact ? 'h-64' : 'h-auto'
    }`}>
      <CardHeader className={isCompact ? 'p-3' : 'p-4'}>
        <div className={`flex gap-3 ${isCompact ? 'flex-row' : 'flex-col'}`}>
          <div className={`relative ${isCompact ? 'w-16 h-20' : 'w-full h-48'} bg-gray-200 rounded-md overflow-hidden`}>
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <Button
                size="sm"
                variant={isFavorite ? "default" : "outline"}
                className={`h-6 w-6 p-0 ${isFavorite ? 'bg-red-500 hover:bg-red-600' : ''}`}
                onClick={() => onAddToFavorites?.(book.id)}
              >
                <Heart className={`h-3 w-3 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className={`font-semibold line-clamp-2 text-amber-900 ${
                isCompact ? 'text-sm' : 'text-base'
              }`}>
                {book.title}
              </h3>
              <p className={`text-amber-700 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                by {book.author}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{book.rating}</span>
              </div>
              {!isCompact && (
                <>
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <BookOpen className="h-3 w-3" />
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <Calendar className="h-3 w-3" />
                    <span>{book.publishYear}</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1">
              {book.genre.slice(0, isCompact ? 2 : 3).map(genre => (
                <Badge key={genre} variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      {!isCompact && (
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-amber-700 line-clamp-3 mb-3">
            {book.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {book.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs border-amber-200 text-amber-700">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}