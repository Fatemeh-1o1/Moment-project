import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { cork:'#B98A5C', 'cork-dark':'#9C6F45', wood:'#6B4226', ink:'#2B2013', 'soft-ink':'#4D3D29',
      paper: { yellow:'#FBE37E', pink:'#FFC9D9', mint:'#B8ECD0', blue:'#BFE1F5', orange:'#FFCB8E' },
      pin: { red:'#D64545', blue:'#3F7EA6', gold:'#D4A02C', turquoise:'#2F9C92' } },
    fontFamily: { sans:['Vazirmatn','sans-serif'], display:['Lalezar','sans-serif'] },
    boxShadow: { paper:'0 12px 26px -10px rgba(0,0,0,.45)' }
  } }, plugins: []
} satisfies Config;
