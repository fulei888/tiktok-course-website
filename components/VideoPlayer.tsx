// ==========================================
// 🎥 视频播放器组件（带占位符）
// ==========================================

'use client';

import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
      {/* 视频占位符 - 16:9 比例 */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {/* 占位符内容 */}
        <div className="text-center text-white p-8">
          <PlayCircle className="w-20 h-20 mx-auto mb-4 text-purple-400 opacity-50" />
          <div className="text-xl font-semibold mb-2">Video Player</div>
          <div className="text-gray-400 mb-4">{title}</div>
          <div className="text-sm text-gray-500 mb-2">Video ID: {videoId}</div>
          <div className="inline-block px-4 py-2 bg-purple-600 rounded-lg text-sm">
            📹 Video will be loaded here
          </div>
        </div>

        {/* 播放控制栏占位符 */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <PlayCircle className="w-8 h-8 text-white" />
              <div className="text-white text-sm">0:00 / 0:00</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white text-sm">Quality</div>
              <div className="text-white text-sm">Speed</div>
              <div className="text-white text-sm">Fullscreen</div>
            </div>
          </div>
        </div>
      </div>

      {/* 视频描述 */}
      <div className="bg-gray-800 p-4 text-white">
        <div className="text-sm text-gray-400">
          ℹ️ Video content will be available once uploaded. For now, this is a placeholder.
        </div>
      </div>
    </div>
  );
}
