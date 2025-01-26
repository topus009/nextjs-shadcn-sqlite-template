import * as React from 'react';

interface EmailTemplateProps {
  href: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  href,
}) => (
  <div>
    <a href={href}>Magic Link</a>
  </div>
);
