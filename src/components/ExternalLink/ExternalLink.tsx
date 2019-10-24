import React from 'react';

type Props = {
  link: string;
  children: React.ReactNode;
};

const ExternalLink: React.FC<Props> = ({ link, children }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
