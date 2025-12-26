import React from 'react';
import { Perspective } from './types';

// Icons as SVG components
export const Icons = {
  Director: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  Writer: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  Camera: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  Editor: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Actor: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm6.75 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z" />
    </svg>
  ),
  Upload: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  ),
  Film: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M18 10.875c0 .621-.504 1.125-1.125 1.125m-9.75 0c.621 0 1.125.504 1.125 1.125m9.75 0c-.621 0-1.125.504-1.125 1.125m-9.75 0c-.621 0-1.125.504-1.125 1.125m9.75 0c.621 0 1.125.504 1.125 1.125M18 15v1.5c0 .621-.504 1.125-1.125 1.125M4.875 15c.621 0 1.125.504 1.125 1.125M4.875 15c-.621 0-1.125.504-1.125 1.125" />
    </svg>
  )
};

export const PERSPECTIVES: Perspective[] = [
  {
    id: 'director',
    name: 'Đạo Diễn',
    role: 'Đạo diễn phim điện ảnh',
    description: 'Phân tích tổng thể về cách kể chuyện, nhịp điệu (pacing), blocking của diễn viên và ý đồ nghệ thuật.',
    icon: <Icons.Director className="w-6 h-6" />,
    promptFocus: 'Hãy đóng vai một đạo diễn điện ảnh đẳng cấp thế giới. Phân tích đoạn video này về mặt: Cách kể chuyện bằng hình ảnh (Visual Storytelling), Nhịp điệu (Pacing), và dàn cảnh (Mise-en-scène). Chỉ ra ý đồ nghệ thuật đằng sau các lựa chọn này.'
  },
  {
    id: 'screenwriter',
    name: 'Biên Kịch',
    role: 'Biên kịch chuyên nghiệp',
    description: 'Tập trung vào cấu trúc câu chuyện, lời thoại, ẩn ý (subtext) và sự phát triển nhân vật.',
    icon: <Icons.Writer className="w-6 h-6" />,
    promptFocus: 'Hãy đóng vai một biên kịch phim chuyên nghiệp. Phân tích đoạn video này về mặt: Cấu trúc kịch bản, hiệu quả của lời thoại (nếu có), ẩn ý (subtext) trong hành động của nhân vật, và vai trò của cảnh này trong việc phát triển cốt truyện.'
  },
  {
    id: 'dop',
    name: 'Quay Phim (DOP)',
    role: 'Đạo diễn hình ảnh (DOP)',
    description: 'Đánh giá về ánh sáng, màu sắc, bố cục khung hình, chuyển động máy quay và tiêu cự.',
    icon: <Icons.Camera className="w-6 h-6" />,
    promptFocus: 'Hãy đóng vai một Đạo diễn hình ảnh (DOP) kỳ cựu. Phân tích chi tiết về: Thiết kế ánh sáng (Lighting), Bảng màu (Color Palette), Bố cục khung hình (Composition), Chuyển động máy quay (Camera Movement) và lựa chọn góc máy. Tại sao những yếu tố này lại hiệu quả về mặt thị giác?'
  },
  {
    id: 'editor',
    name: 'Dựng Phim',
    role: 'Chuyên gia dựng phim',
    description: 'Phân tích kỹ thuật cắt dựng, sự liên kết giữa các cảnh (continuity) và nhịp điệu dựng.',
    icon: <Icons.Editor className="w-6 h-6" />,
    promptFocus: 'Hãy đóng vai một chuyên gia dựng phim (Editor). Phân tích đoạn video này về: Kỹ thuật cắt nối (Cutting), Nhịp điệu dựng (Editing Rhythm), sự liền mạch (Continuity) và cách các shot phim được ghép nối để tạo cảm xúc.'
  },
  {
    id: 'actor',
    name: 'Diễn Xuất',
    role: 'Huấn luyện viên diễn xuất',
    description: 'Đánh giá biểu cảm vi mô, ngôn ngữ cơ thể và mức độ chân thực trong diễn xuất.',
    icon: <Icons.Actor className="w-6 h-6" />,
    promptFocus: 'Hãy đóng vai một huấn luyện viên diễn xuất. Quan sát kỹ và phân tích: Biểu cảm khuôn mặt (Micro-expressions), Ngôn ngữ cơ thể, Giọng điệu (nếu có) và sự tương tác giữa các diễn viên. Đánh giá mức độ chân thực và chiều sâu tâm lý của nhân vật.'
  },
];
