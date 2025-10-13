import React from 'react';
import Image from 'next/image';

const ResumeContent = () => {
  return (
    <div className="flex justify-center p-4 bg-muted/20">
        <Image
          src="https://img.playbook.com/8pFB4KlKL9FuYToTd5-PekJaAGknnvSeg9cnxvDKtLc/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2U4ZDM3MzI1/LTAzMjYtNDM1OS05/ZjY0LTVjYzM5NGQz/ZGRlMA"
          alt="Rajath Hegde's Resume"
          width={850}
          height={1100}
          className="max-w-full h-auto shadow-lg"
          data-ai-hint="resume document"
        />
    </div>
  );
};

export default ResumeContent;
