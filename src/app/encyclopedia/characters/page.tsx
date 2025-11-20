import { getAllCharacters } from '@/data/characters';
import CharactersView from '@/components/CharactersView';

export default function CharactersPage() {
  const characters = getAllCharacters();

  return (
    <main className="min-h-screen p-4 pt-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Content Card */}
        <CharactersView characters={characters} />
      </div>
    </main>
  );
}
