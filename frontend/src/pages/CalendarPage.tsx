import { motion } from 'motion/react';
import { PageContainer } from '../components/layout/PageContainer';
import { MemoryCalendar } from '../features/calendar/components/MemoryCalendar';
import bottomImage from '../img/calender.png';
import sticker from '../img/stick1.png';

export function CalendarPage() {
  return (
    <PageContainer>
      <div className="page-enter">
        <h1 className="panel-title">تقویم حسی من</h1>
        <p className="panel-sub">روزهایی که چیزی حس کردی، اینجا مثل یادداشت‌های کوچیک پیدا می‌شن.</p>
        <MemoryCalendar />
        {/* <img
          src={bottomImage}
          alt=""
          className="mr-0 mt-6 w-1/3 max-w-[150px]"
        /> */}
        <motion.img
          src={sticker}
          alt=""
          className="mx-auto mt-4 w-20"
          animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </PageContainer>
  );
}