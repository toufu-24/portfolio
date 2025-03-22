import React from 'react';
import {
  CalendarDays,
  Rocket,
  PenTool,
  Code,
  CheckCircle,
  Award,
  Trophy,
  Medal,
  Star,
  Crown,
  Cake,
  School,
} from 'lucide-react';

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  type:
    | 'planning'
    | 'design'
    | 'development'
    | 'release'
    | 'award'
    | 'trophy'
    | 'medal'
    | 'star'
    | 'crown'
    | 'birth'
    | 'school';
};

const timelineItems: TimelineItem[] = [
  { date: '2004-02', title: '誕生', description: '', type: 'birth' },
  { date: '2022-04', title: '東京農工大学入学', description: '東京農工大学工学部知能情報システム工学科に入学', type: 'school' },
  { date: '2022-08', title: 'AtCoder Algorithm部門 灰色', description: 'AtCoder Algorithm部門に参加', type: 'trophy' },
  { date: '2022-10', title: 'AtCoder Heuristic部門 灰色', description: 'AtCoder Heuristic部門に参加', type: 'trophy' },
  { date: '2022-10', title: 'AtCoder Algorithm部門 茶色', description: 'AtCoder Algorithm部門でレート400を達成', type: 'trophy' },
  { date: '2023-02', title: 'AtCoder Heuristic部門 茶色', description: 'AtCoder Heuristic部門でレート400を達成', type: 'trophy' },
  { date: '2023-04', title: '数理情報工学コース配属', description: '', type: 'school' },
  { date: '2023-08', title: 'AtCoder Algorithm部門 緑色', description: 'AtCoder Algorithm部門でレート800を達成', type: 'trophy' },
  { date: '2023-08', title: 'AtCoder Heuristic部門 緑色', description: 'AtCoder Heuristic部門でレート800を達成', type: 'trophy' },
  { date: '2024-06', title: 'AtCoder Algorithm部門 水色', description: 'AtCoder Algorithm部門でレート1200を達成', type: 'trophy' },
  { date: '2024-07', title: 'AtCoder Heuristic部門 水色', description: 'AtCoder Heuristic部門でレート1200を達成', type: 'trophy' },
  { date: '2024-07', title: 'CGエンジニア検定エキスパート 合格', description: '', type: 'award' },
  { date: '2024-07', title: '画像処理エンジニア検定エキスパート 合格', description: '', type: 'award' },
  { date: '2024-07', title: '応用情報技術者試験 合格', description: '', type: 'award' },
  { date: '2025-03', title: 'AtCoder Heuristic部門 青色', description: 'AtCoder Heuristic部門でレート1600を達成', type: 'trophy' },
];

// タイトルに含まれる色に合わせた背景色を返す関数
const getAtCoderColor = (title: string) => {
  if (title.includes('灰色')) return 'bg-gray-500';
  if (title.includes('茶色')) return 'bg-amber-600';
  if (title.includes('緑色')) return 'bg-green-500';
  if (title.includes('水色')) return 'bg-blue-300';
  if (title.includes('青色')) return 'bg-blue-500';
  return 'bg-orange-500';
};

// タイトルに含まれる色に合わせたアイコンの色（text-クラス）を返す関数
const getAtCoderIconColor = (title: string) => {
  if (title.includes('灰色')) return 'text-gray-500';
  if (title.includes('茶色')) return 'text-amber-600';
  if (title.includes('緑色')) return 'text-green-500';
  if (title.includes('水色')) return 'text-blue-300';
  if (title.includes('青色')) return 'text-blue-500';
  return 'text-orange-500';
};

// アイコンを返す関数（trophyの場合はタイトルも考慮）
const getIcon = (type: string, title?: string) => {
  switch (type) {
    case 'planning':
      return <CalendarDays className="h-5 w-5 text-blue-500" />;
    case 'design':
      return <PenTool className="h-5 w-5 text-purple-500" />;
    case 'development':
      return <Code className="h-5 w-5 text-green-500" />;
    case 'release':
      return <Rocket className="h-5 w-5 text-red-500" />;
    case 'award':
      return <Award className="h-5 w-5 text-yellow-500" />;
    case 'trophy':
      // タイトルがAtCoder関連の場合は色を変更
      if (title && title.startsWith('AtCoder')) {
        return <Trophy className={`h-5 w-5 ${getAtCoderIconColor(title)}`} />;
      }
      return <Trophy className="h-5 w-5 text-orange-500" />;
    case 'medal':
      return <Medal className="h-5 w-5 text-yellow-500" />;
    case 'star':
      return <Star className="h-5 w-5 text-yellow-400" />;
    case 'crown':
      return <Crown className="h-5 w-5 text-purple-500" />;
    case 'birth':
      return <Cake className="h-5 w-5 text-pink-500" />;
    case 'school':
      return <School className="h-5 w-5 text-teal-500" />;
    default:
      return <CheckCircle className="h-5 w-5 text-gray-500" />;
  }
};

// type とタイトルに応じた背景色を返す関数
const getColor = (type: string, title: string) => {
  // AtCoder関連(trophy)の場合はタイトルの色キーワードで判定
  if (type === 'trophy' && title.startsWith('AtCoder')) {
    return getAtCoderColor(title);
  }
  // それ以外は従来のマッピング
  switch (type) {
    case 'planning':
      return 'bg-blue-500';
    case 'design':
      return 'bg-purple-500';
    case 'development':
      return 'bg-green-500';
    case 'release':
      return 'bg-red-500';
    case 'award':
      return 'bg-yellow-500';
    case 'medal':
      return 'bg-yellow-500';
    case 'star':
      return 'bg-yellow-400';
    case 'crown':
      return 'bg-purple-500';
    case 'birth':
      return 'bg-pink-500';
    case 'school':
      return 'bg-teal-500';
    default:
      return 'bg-gray-500';
  }
};

export default function Timeline() {
  const sortedItems = [...timelineItems].reverse();

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-lg border bg-card text-card-foreground shadow-sm grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div className="relative col-span-full">
        {/* 垂直のライン */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500"></div>

        {sortedItems.map((item, index) => (
          <div
            key={index}
            className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div
                className={`mb-1 flex items-center gap-2 ${
                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
              >
{index % 2 === 0 ? (
  <>
    <h3 className="text-xl font-bold text-white">{item.title}</h3>
    <span className="flex-shrink-0 w-8">{getIcon(item.type, item.title)}</span>
  </>
) : (
  <>
    <span className="flex-shrink-0 w-8">{getIcon(item.type, item.title)}</span>
    <h3 className="text-xl font-bold text-white">{item.title}</h3>
  </>
)}
              </div>
              <p className="text-sm font-semibold text-white mb-2">{item.date}</p>
              <p className="text-white">{item.description}</p>
            </div>

            <div className="relative flex items-center justify-center">
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full ${getColor(
                  item.type,
                  item.title
                )} z-10`}
              ></div>
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full ${getColor(
                  item.type,
                  item.title
                )} opacity-20 animate-pulse`}
              ></div>
            </div>

            <div className="w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
