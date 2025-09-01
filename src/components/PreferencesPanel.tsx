import { UserPreferences } from '@/lib/recommendationEngine';
import { GENRES } from '@/lib/bookData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Settings2, Star } from 'lucide-react';

interface PreferencesPanelProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export function PreferencesPanel({ preferences, onPreferencesChange }: PreferencesPanelProps) {
  const updateGenres = (genre: string) => {
    const newGenres = preferences.favoriteGenres.includes(genre)
      ? preferences.favoriteGenres.filter(g => g !== genre)
      : [...preferences.favoriteGenres, genre];
    
    onPreferencesChange({ ...preferences, favoriteGenres: newGenres });
  };

  const addTag = (tag: string) => {
    if (tag && !preferences.tags.includes(tag)) {
      onPreferencesChange({ 
        ...preferences, 
        tags: [...preferences.tags, tag.toLowerCase()] 
      });
    }
  };

  const removeTag = (tag: string) => {
    onPreferencesChange({ 
      ...preferences, 
      tags: preferences.tags.filter(t => t !== tag) 
    });
  };

  return (
    <Card className="sticky top-4 card-gradient border-amber-100">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-amber-900">
          <Settings2 className="h-5 w-5" />
          Reading Preferences
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Favorite Genres */}
        <div>
          <Label className="text-sm font-medium text-amber-900 mb-3 block">
            Favorite Genres
          </Label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map(genre => (
              <Badge
                key={genre}
                variant={preferences.favoriteGenres.includes(genre) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  preferences.favoriteGenres.includes(genre)
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'border-amber-200 text-amber-700 hover:bg-amber-50'
                }`}
                onClick={() => updateGenres(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Preferred Length */}
        <div>
          <Label className="text-sm font-medium text-amber-900 mb-3 block">
            Preferred Book Length
          </Label>
          <Select 
            value={preferences.preferredLength} 
            onValueChange={(value: any) => onPreferencesChange({ ...preferences, preferredLength: value })}
          >
            <SelectTrigger className="border-amber-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Length</SelectItem>
              <SelectItem value="short">Short (under 250 pages)</SelectItem>
              <SelectItem value="medium">Medium (250-450 pages)</SelectItem>
              <SelectItem value="long">Long (450+ pages)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Rating */}
        <div>
          <Label className="text-sm font-medium text-amber-900 mb-3 block">
            Minimum Rating: {preferences.preferredRating}
          </Label>
          <div className="px-3">
            <Slider
              value={[preferences.preferredRating]}
              onValueChange={([value]) => onPreferencesChange({ ...preferences, preferredRating: value })}
              min={1}
              max={5}
              step={0.1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-amber-600 mt-1">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />1.0
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />5.0
            </span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label className="text-sm font-medium text-amber-900 mb-3 block">
            Favorite Tags
          </Label>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Add a tag..."
              className="border-amber-200"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTag(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
          {preferences.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {preferences.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 cursor-pointer hover:bg-amber-200"
                  onClick={() => removeTag(tag)}
                >
                  #{tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}