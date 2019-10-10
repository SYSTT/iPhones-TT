import React from 'react';

type Props = {
  link: string;
  children: React.ReactNode;
};

function ExternalLink({ link, children }: Props) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default ExternalLink;
