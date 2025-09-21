import React from 'react';
import { Project } from '../types';
import { FolderIcon } from './common/icons';

interface ProjectInputProps {
  project: Project;
  onProjectChange: (field: keyof Project, value: string) => void;
}

const ProjectInput: React.FC<ProjectInputProps> = ({ project, onProjectChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <FolderIcon className="w-6 h-6 text-indigo-400"/>
        <h2 className="text-lg font-semibold text-white">1. Project Details</h2>
      </div>
      <div className="space-y-3">
        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
          <input
            type="text"
            id="project-name"
            value={project.name}
            onChange={(e) => onProjectChange('name', e.target.value)}
            placeholder="e.g., E-commerce Platform"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md shadow-sm px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <label htmlFor="project-description" className="block text-sm font-medium text-gray-400 mb-1">Project Description</label>
          <textarea
            id="project-description"
            rows={3}
            value={project.description}
            onChange={(e) => onProjectChange('description', e.target.value)}
            placeholder="Briefly describe the project's goals and scope."
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md shadow-sm px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInput;
