export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  rating: number;
  description: string;
  pages: number;
  publishYear: number;
  cover: string;
  tags: string[];
}

export const GENRES = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 
  'Fantasy', 'Biography', 'History', 'Self-Help', 'Thriller'
];

export const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: ['Fiction', 'Fantasy'],
    rating: 4.2,
    description: 'A magical library where every book represents a different life you could have lived.',
    pages: 288,
    publishYear: 2020,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    tags: ['philosophical', 'uplifting', 'thought-provoking']
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: ['Science Fiction'],
    rating: 4.6,
    description: 'Epic space opera set in a distant future amidst a feudal interstellar society.',
    pages: 688,
    publishYear: 1965,
    cover: 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=300&h=400&fit=crop',
    tags: ['epic', 'complex', 'worldbuilding']
  },
  {
    id: '3',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: ['Fiction', 'Romance'],
    rating: 4.5,
    description: 'A reclusive Hollywood icon finally decides to give her first interview to an unknown journalist.',
    pages: 400,
    publishYear: 2017,
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    tags: ['glamorous', 'emotional', 'lgbtq']
  },
  {
    id: '4',
    title: 'Educated',
    author: 'Tara Westover',
    genre: ['Biography', 'Non-Fiction'],
    rating: 4.4,
    description: 'A memoir about a woman who grows up in a survivalist family and eventually earns a PhD.',
    pages: 334,
    publishYear: 2018,
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    tags: ['inspiring', 'educational', 'powerful']
  },
  {
    id: '5',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: ['Mystery', 'Thriller'],
    rating: 4.1,
    description: 'A psychological thriller about a marriage gone terribly wrong.',
    pages: 432,
    publishYear: 2012,
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop',
    tags: ['dark', 'psychological', 'twisty']
  }
];