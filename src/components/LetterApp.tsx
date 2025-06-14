import React, { useState } from 'react';
import LetterForm from './LetterForm';
import LetterPreview from './LetterPreview';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Download } from 'lucide-react';



export interface ContactItem {
  type: 'phone' | 'email' | 'website' | 'address';
  value: string;
}
export interface LetterData {
  date: string;
  attentionTo: string;
  letterhead: string;
  subhead: string;
  logo: File | null;
  contactInfo: ContactItem[];
  letterBody: string;
  signature: string;
  signatureImage: string | null;
  name: string;
  position: string;
  stamp: string;
  stampFile: File | null;
  approvalStamp: string;
  approvalStampFile: File | null;
  bottomApprovalStamp: string;
  bottomApprovalStampFile: File | null;
}

const LetterApp: React.FC = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [letterData, setLetterData] = useState<LetterData>({
    date: '',
    attentionTo: '',
    letterhead: 'ZENXO\nTOTALITY',
    subhead: 'TRADING & CONTRACTING CO. L.L.C.',
    logo: null,
    contactInfo: [
    { type: 'phone', value: '+971 52 344 5460' },
    { type: 'email', value: 'o.al-khowaiter@zttcontracting.com' },
    { type: 'website', value: 'www.zttcontracting.com' },
    { type: 'address', value: '40th Floor, Ubora Tower, Business Bay,\nP.O. Box 10162, Dubai, United Arab Emirates' }
  ],
    letterBody: 'CONGRATULATIONS!!!\n\nWe hereby confirm the acceptance of your submitted proforma invoice for the supply of safety shoes with the specified quantity and details as outlined in the invoice. AND WHICH The total amount of the contract is four million United States Dollars (US$4,000,000).\n\nYour proforma invoice for this supply has been approved after our board of directors\' executive meetings. Your company has been selected for this supply contract as one of the best among all the quotations/invoices received from various suppliers. Please review the draft contract agreement before the official signing date following the completion of the approval process.\n\nAs per the UAE Supply Contract Act, the supplier must be registered with the National Contracts Approval Council (NCAC) by completing and returning the attached registration form. This registration is necessary for NCAC to grant final approval for the release and transfer of the invoice amount to your company\'s account without any issues.',
    signature: '',
    signatureImage: null,
    name: 'MR. AHMAD O. AL-KHOWAITER',
    position: 'DUBAI REGIONAL MANAGER',
    stamp: 'SEAL',
    stampFile: null,
    approvalStamp: 'APPROVED',
    approvalStampFile: null,
    bottomApprovalStamp: 'VERIFIED',
    bottomApprovalStampFile: null
  });

  const handleFormSubmit = (data: LetterData) => {
    setLetterData(data);
    setIsPreviewMode(true);
  };

  const handleBackToEdit = () => {
    setIsPreviewMode(false);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {!isPreviewMode ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Formal Letter Generator</h1>
            </div>
            <LetterForm onSubmit={handleFormSubmit} initialData={letterData} />
          </div>
        ) : (
          <div>
            <div className="flex gap-4 mb-6 print:hidden">
              <Button onClick={handleBackToEdit} variant="outline" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Letter
              </Button>
              <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
            <LetterPreview data={letterData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterApp;
