"use client";
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import Modal from './ui/modal';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type Project = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  detailPath: string;
};

// 下の方が上部に表示される
const projects: Project[] = [
  {
    id: '1',
    title: 'PCHIP-Image-Enlarger',
    thumbnail: 'projects/PCHIP-Image-Enlarger.png',
    description: '画像補間プログラム',
    detailPath: 'PCHIP-Image-Enlarger.md',
  },
  {
    id: '2',
    title: '電脳サークル公式ウェブサイト',
    thumbnail: 'projects/Substring-Word-Finder.png',
    description: '部分文字列検索ウェブアプリ',
    detailPath: 'Substring-Word-Finder.md',
  },
  {
    id: '3',
    title: 'Substring-Word-Finder',
    thumbnail: 'projects/Substring-Word-Finder.png',
    description: '部分文字列検索ウェブアプリ',
    detailPath: 'Substring-Word-Finder.md',
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
        .catch((err) => {
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
        {projects.slice().sort((a, b) => Number(b.id) - Number(a.id)).map((project) => (
          <div
            key={project.id}
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
                <p className="text-sm text-gray-600">{project.description}</p>
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
                "h1": ({ node, ...props }) => <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />,
                "h2": ({ node, ...props }) => <h2 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                "h3": ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
              }}>{markdownContent}</ReactMarkdown>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectsList;
