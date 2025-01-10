import localFont from 'next/font/local'

const square = localFont({
  src: [
    {
      path: '../../public/fonts/NanumSquareR.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NanumSquareB.ttf',
      weight: '800 900',
      style: 'normal',
    },
  ],
  variable: '--font-square',
});

export { square };