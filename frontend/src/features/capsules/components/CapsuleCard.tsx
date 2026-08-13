import { Pin } from '../../../components/ui/Pin';
import { useDeleteCapsule } from '../hooks/useCapsules';
import type { Capsule } from '../types';
import { CapsuleStatus } from './CapsuleStatus';
import letterBg from '../../../img/tie.png';

export function CapsuleCard({ capsule, index }: { capsule: Capsule; index: number }) {
  const remove = useDeleteCapsule();

  const date = new Date(capsule.unlockAt);
  const valid = !isNaN(date.getTime());

  return (
    <div className={`${index % 2 ? 'rotate-1' : '-rotate-1'}`}>
      <article
        className="relative"
        style={{
          backgroundImage: `url(${letterBg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '200px',
        }}
      >
      </article>

      <div className="mt-2 flex flex-col gap-1">
        <CapsuleStatus capsule={capsule} />

        <div className="flex items-center justify-between border-t border-dashed border-black/20 pt-2 text-[11px] font-bold text-soft-ink">
          <span>
            {valid
              ? `باز می‌شه در ${new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)}`
              : 'تاریخ نامشخص'}
          </span>
          <button
            onClick={() => confirm('این کپسول پاک شود؟') && remove.mutate(capsule.id)}
            className="rounded-full px-2 py-1 hover:bg-black/10"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}