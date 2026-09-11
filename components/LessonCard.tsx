// ==========================================
// 📚 课程卡片组件（可展开播放视频）
// ==========================================

'use client';

import { useState } from 'react';
import { PlayCircle, ChevronDown, ChevronUp } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoId: string;
}

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition border-2 border-transparent hover:border-purple-200">
      {/* 课程标题区域 - 可点击 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">{lesson.title}</h3>
                <p className="text-gray-600 mb-2">{lesson.description}</p>
                <div className="text-sm text-gray-500">{lesson.duration}</div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                {isOpen ? (
                  <>
                    <ChevronUp className="w-5 h-5" />
                    Hide
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    Watch
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 视频播放器区域 - 展开时显示 */}
      {isOpen && (
        <div className="px-6 pb-6">
          <VideoPlayer videoId={lesson.videoId} title={lesson.title} />
        </div>
      )}
    </div>
  );
}
