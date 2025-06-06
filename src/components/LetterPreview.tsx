
import React from 'react';
import { LetterData } from './LetterApp';

interface LetterPreviewProps {
  data: LetterData;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ data }) => {
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
      <div className="p-8 min-h-[29.7cm] relative">
        {/* Header with Letterhead and Contact Info */}
        <div className="border-b-2 border-gray-300 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-2xl font-bold text-blue-600 leading-tight">
                {formatText(data.letterhead)}
              </div>
            </div>
            <div className="text-right text-sm text-gray-600 max-w-md">
              {formatText(data.contactInfo)}
            </div>
          </div>
        </div>

        {/* Date and Attention */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="font-semibold">ATTENTION TO:</span> {data.attentionTo}
          </div>
          <div className="text-right">
            <span className="font-semibold">Date:</span> {formatDate(data.date)}
          </div>
        </div>

        {/* Approved Stamp - Top Right */}
        <div className="absolute top-32 right-8">
          {data.stampFile ? (
            <img 
              src={URL.createObjectURL(data.stampFile)} 
              alt="Stamp" 
              className="w-24 h-24 object-contain"
            />
          ) : data.stamp && (
            <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center bg-red-50">
              <span className="text-red-500 font-bold text-xs text-center transform -rotate-12">
                {data.stamp}
              </span>
            </div>
          )}
        </div>

        {/* Subject Line */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold underline">
            RE: SUPPLY CONTRACT INVOICE APPROVAL LETTER
          </h2>
        </div>

        {/* Letter Body */}
        <div className="mb-8 text-justify leading-relaxed">
          {formatText(data.letterBody)}
        </div>

        {/* Required Documents List */}
        <div className="mb-8">
          <p className="mb-2">Therefore, please submit the following:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Filled Supplier Approval Registration Form.</li>
            <li>Company Commercial Trade License/Certificate in official English translation.</li>
            <li>Copy of HSE Certificate.</li>
            <li>Copy of QA Certificate for ISO series.</li>
          </ul>
        </div>

        <p className="mb-8">
          Congratulations once again. We look forward to your prompt response and cooperation.
        </p>

        {/* Signature Section */}
        <div className="flex justify-between items-end mt-12">
          <div>
            <p className="font-semibold mb-8">YOURS FAITHFULLY</p>
            <div className="space-y-2">
              {data.signature && (
                <div className="font-cursive text-xl mb-2">{data.signature}</div>
              )}
              <div className="border-b border-black w-48 mb-1"></div>
              <div className="font-semibold">{data.name}</div>
              <div className="text-sm">{data.position}</div>
            </div>
          </div>

          {/* Seal/Stamp area */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold text-center">
                  SEAL
                </span>
              </div>
            </div>
            
            {/* Second Approved Stamp */}
            {data.stamp && (
              <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center bg-red-50">
                <span className="text-red-500 font-bold text-xs text-center transform -rotate-12">
                  {data.stamp}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;
