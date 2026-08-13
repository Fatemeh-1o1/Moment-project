import { MemoryComposer } from '../features/memories/components/MemoryComposer';
import { MemoryList } from '../features/memories/components/MemoryList';
import { Throwback } from '../features/memories/components/Throwback';
import paperHeader from '../img/card.png';

export function HomePage() {
  return (
    <div className="page-enter">
      <div
  className="flex flex-col items-center justify-center text-center"
  style={{
    backgroundImage: `url(${paperHeader})`,
    backgroundSize: '40% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '350px',
  }}
>
<h1 className="panel-title text-[#80322e] text-right">امروز چطور گذشت؟</h1>
      </div>

      <div className="px-4">
        <Throwback />
        <MemoryComposer />
        <h2 className="mb-4 text-sm font-medium text-white/90">نوشته‌های اخیر</h2>
        <MemoryList />
      </div>
    </div>
  );
}