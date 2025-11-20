import { getAllLevels } from '@/data/levels';
import LevelsView from '@/components/LevelsView';

export default function LevelsPage() {
  const levels = getAllLevels();

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <LevelsView levels={levels} />
    </div>
  );
}
