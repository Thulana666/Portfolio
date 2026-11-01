import Image from 'next/image';
import ProjectVisual from './ProjectVisual';

/** Real cover image when provided, otherwise the abstract composition. */
export default function ProjectCover({ project, sizes, className, preload = false }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`${project.title} cover`}
        fill
        sizes={sizes}
        preload={preload}
        className={className}
        style={{ objectFit: 'cover' }}
      />
    );
  }
  return <ProjectVisual type={project.visual} className={className} />;
}
