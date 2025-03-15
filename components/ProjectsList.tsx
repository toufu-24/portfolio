"use client";
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import Modal from './ui/modal';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Badge } from './ui/badge';

type Project = {
  title: string;
  thumbnail: string;
  description: string;
  detailPath: string;
  tags: string[];
  date: string;
};

// 逆順に表示される
// tagsには個人開発、チーム開発、活動を指定
const projects: Project[] = [
  {
    title: '電脳サークル公式サイト',
    thumbnail: 'projects/Denno-Circle-Official-Site.png',
    description: '電脳サークルの公式ウェブサイト',
    detailPath: 'Denno-Circle-Official-Site.md',
    tags: ['チーム開発'],
    date: '2023/03',
  },
  {
    title: 'PCHIP-Image-Enlarger',
    thumbnail: 'projects/PCHIP-Image-Enlarger.png',
    description: '画像補間プログラム',
    detailPath: 'PCHIP-Image-Enlarger.md',
    tags: ['個人開発'],
    date: '2023/05',
  },
  {
    title: 'Substring-Word-Finder',
    thumbnail: 'projects/Substring-Word-Finder.png',
    description: '部分文字列検索ウェブアプリ',
    detailPath: 'Substring-Word-Finder.md',
    tags: ['個人開発'],
    date: '2023/05',
  },
  {
    title: '飛んでけ鉄拳！Rocket Puncher',
    thumbnail: 'projects/RocketPunch.png',
    description: 'RocketPunchを操作するVRゲーム',
    detailPath: 'RocketPunch.md',
    tags: ['チーム開発'],
    date: '2024/10',
  },
];

const ProjectsList: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProject) {
      setLoading(true);
      fetch(`/projects/${selectedProject.detailPath}`)
        .then((res) => res.text())
        .then((text) => {
          setMarkdownContent(text);
          setLoading(false);
        })
        .catch(() => {
          setMarkdownContent('Failed to load content.');
          setLoading(false);
        });
    }
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setMarkdownContent('');
  };

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {[...projects].reverse().map((project) => (
          <div
            key={project.title}
            onClick={() => openModal(project)}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <Card>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-32 object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.date}</p>
                <div className="mt-2 flex space-x-2">
                  {project.tags.map(tag => {
                    const tagVariant = ({ "個人開発": "blue", "チーム開発": "green", "活動": "white" }[tag] || "outline") as "blue" | "green" | "white" | "outline";
                    return <Badge key={tag} variant={tagVariant}>{tag}</Badge>;
                  })}
                </div>
                <p className="text-sm text-gray-600 mt-2">{project.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      {selectedProject && (
        <Modal isOpen={true} onClose={closeModal}>
          <div className="prose">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{
                "h1": ({ ...props }) => <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />,
                "h2": ({ ...props }) => <h2 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                "h3": ({ ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
              }}>{markdownContent}</ReactMarkdown>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectsList;
