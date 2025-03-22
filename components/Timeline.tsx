import React from 'react';
import { CalendarDays, Rocket, PenTool, Code, CheckCircle } from 'lucide-react';

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  type: 'planning' | 'design' | 'development' | 'release';
};

const timelineItems: TimelineItem[] = [
  { date: '2025-01', title: 'Project Start', description: 'Kick off planning and initial development.', type: 'planning' },
  { date: '2025-02', title: 'Design Phase', description: 'UI/UX designs and prototyping.', type: 'design' },
  { date: '2025-03', title: 'Development Phase', description: 'Start coding and integration.', type: 'development' },
  { date: '2025-03', title: 'Release', description: 'Deploy to production.', type: 'release' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'planning':
      return <CalendarDays className="h-5 w-5 text-blue-500" />;
    case 'design':
      return <PenTool className="h-5 w-5 text-purple-500" />;
    case 'development':
      return <Code className="h-5 w-5 text-green-500" />;
    case 'release':
      return <Rocket className="h-5 w-5 text-red-500" />;
    default:
      return <CheckCircle className="h-5 w-5 text-gray-500" />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'planning':
      return 'bg-blue-500';
    case 'design':
      return 'bg-purple-500';
    case 'development':
      return 'bg-green-500';
    case 'release':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function Timeline() {
  const sortedItems = [...timelineItems].reverse();
  
  return (
    <div className="max-w-3xl mx-auto p-8 rounded-lg border bg-card text-card-foreground shadow-sm grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div className="relative col-span-full">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500"></div>
  
        {sortedItems.map((item, index) => (
          <div
            key={index}
            className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className={`mb-1 flex items-center gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                {index % 2 === 0 ? (
                  <>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    {getIcon(item.type)}
                  </>
                ) : (
                  <>
                    {getIcon(item.type)}
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </>
                )}
              </div>
              <p className="text-sm font-semibold text-white mb-2">
                {item.date}
              </p>
              <p className="text-white">
                {item.description}
              </p>
            </div>
  
            <div className="relative flex items-center justify-center">
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full ${getColor(item.type)} z-10`}
              ></div>
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full ${getColor(item.type)} opacity-20 animate-pulse`}
              ></div>
            </div>
  
            <div className="w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
