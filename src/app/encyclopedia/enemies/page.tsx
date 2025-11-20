import { getAllEnemyVariants } from '@/data/enemies';
import EnemiesView from '@/components/EnemiesView';

export default function EnemiesPage() {
  const variants = getAllEnemyVariants();

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <EnemiesView variants={variants} />
    </div>
  );
}
