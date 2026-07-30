import React from 'react';
import LeadershipMessage from './LeadershipMessage';

export default function ConnectClient({ data, locale = 'en' }) {
  const { leadership } = data;

  return (
    <div className="w-full relative z-10 flex flex-col items-center">
      {/* Leadership Message & Portrait — sourced from top chairperson member */}
      <LeadershipMessage leadership={leadership} locale={locale} />
    </div>
  );
}
