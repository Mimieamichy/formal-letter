import React from "react";
import { LetterData } from "./LetterApp";

interface LetterPreviewProps {
  data: LetterData;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ data }) => {
  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
              <div className="text-[10px] font-bold text-blue-600 leading-tight">
                {formatText(data.subhead)}
              </div>
            </div>
            <div className="text-sm text-gray-700 max-w-md whitespace-pre-line leading-relaxed space-y-1">
              {formatText(data.contactInfo)}
            </div>
          </div>
        </div>

        {/* Top Approval Stamp - Top Right */}
        <div className="absolute top-32 right-8">
          {data.approvalStampFile ? (
            <img
              src={URL.createObjectURL(data.approvalStampFile)}
              alt="Approval Stamp"
              className="w-24 h-24 object-contain"
            />
          ) : (
            data.approvalStamp && (
              <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center bg-red-50">
                <span className="text-red-500 font-bold text-xs text-center transform -rotate-12">
                  {data.approvalStamp}
                </span>
              </div>
            )
          )}
        </div>

        {/* Date and Attention */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="font-semibold">ATTENTION TO:</span>{" "}
            {data.attentionTo}
          </div>
          <div className="text-right">
            <span className="font-semibold">Date:</span> {formatDate(data.date)}
          </div>
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
            <li>
              Company Commercial Trade License/Certificate in official English
              translation.
            </li>
            <li>Copy of HSE Certificate.</li>
            <li>Copy of QA Certificate for ISO series.</li>
          </ul>
        </div>

        <p className="mb-8">
          Congratulations once again. We look forward to your prompt response
          and cooperation.
        </p>

        {/* Bottom Section with Signature and Stamps */}
        <div className="mt-12">
          <p className="font-semibold mb-8">YOURS FAITHFULLY</p>

          {/* Signature and Name Section */}
          <div className="mb-8">
            {data.signatureImage && (
              <div className="mb-4">
                <img
                  src={data.signatureImage}
                  alt="Signature"
                  className="max-w-48 h-16 object-contain"
                />
              </div>
            )}
            <div className="border-b border-black w-48 mb-2"></div>
            <div className="font-semibold text-sm">{data.name}</div>
            <div className="text-sm text-gray-600">{data.position}</div>
          </div>

          {/* Bottom Stamps Row */}
          <div className="flex justify-center ml-40 items-center mt-8 space-x-8">
            {/* Bottom Approval Stamp */}

            <div className="flex flex-col items-center">
              {data.stampFile ? (
                <img
                  src={URL.createObjectURL(data.stampFile)}
                  alt="Company Seal"
                  className="w-50 h-40 object-contain"
                />
              ) : (
                data.stamp && (
                  <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold text-center">
                        {data.stamp}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col items-center">
              {data.bottomApprovalStampFile ? (
                <img
                  src={URL.createObjectURL(data.bottomApprovalStampFile)}
                  alt="Bottom Approval Stamp"
                  className="w-50 h-40 object-contain"
                />
              ) : (
                data.bottomApprovalStamp && (
                  <div className="w-40 h-30 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-50">
                    <span className="text-green-500 font-bold text-xs text-center transform -rotate-12">
                      {data.bottomApprovalStamp}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Company Seal/Stamp */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;
