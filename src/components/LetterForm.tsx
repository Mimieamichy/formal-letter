import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  User,
  Building,
  FileText,
  Pen,
  Stamp,
  Phone,
  Mail,
  Globe,
  MapPin,
  Upload,
  Image,
} from "lucide-react";
import { LetterData, ContactItem } from "./LetterApp";
import SignatureCanvas from "./SignatureCanvas";

interface LetterFormProps {
  onSubmit: (data: LetterData) => void;
  initialData: LetterData;
}

const LetterForm: React.FC<LetterFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<LetterData>(initialData);

  const handleInputChange = (field: keyof LetterData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  const handleStampFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      stampFile: file,
    }));
  };

  const handleApprovalStampFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      approvalStampFile: file,
    }));
  };

  const handleBottomApprovalStampFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      bottomApprovalStampFile: file,
    }));
  };

  const handleSignatureChange = (signature: string | null) => {
    setFormData((prev) => ({
      ...prev,
      signatureImage: signature,
    }));
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          signatureImage: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert array to string for textarea
  const formatContactInfo = (info: ContactItem[]): string => {
    return info
      .map((item) => `${capitalize(item.type)}: ${item.value}`)
      .join("\n");
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Convert textarea string back to array
  const parseContactInfo = (text: string): ContactItem[] => {
    const lines = text.split("\n");
    return lines
      .map((line) => {
        const [label, ...rest] = line.split(":");
        const value = rest.join(":").trim();
        const type = label.trim().toLowerCase();
        if (!value || !["phone", "email", "website", "address"].includes(type))
          return null;
        return { type: type as ContactItem["type"], value };
      })
      .filter(Boolean) as ContactItem[];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Letter Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attentionTo" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Attention To
              </Label>
              <Input
                id="attentionTo"
                value={formData.attentionTo}
                onChange={(e) =>
                  handleInputChange("attentionTo", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Company Logo
            </Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="letterhead" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Letterhead
            </Label>
            <Textarea
              id="letterhead"
              value={formData.letterhead}
              onChange={(e) => handleInputChange("letterhead", e.target.value)}
              placeholder="Company name "
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subhead" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Subhead
            </Label>
            <Textarea
              id="letterhead"
              value={formData.subhead}
              onChange={(e) => handleInputChange("subhead", e.target.value)}
              placeholder="subtitle"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <Mail className="w-4 h-4" />
              <Globe className="w-4 h-4" />
              <MapPin className="w-4 h-4" />
              Contact Information
            </Label>
            <Textarea
              id="contactInfo"
              value={formatContactInfo(formData.contactInfo)} // Convert array to string
              onChange={(e) =>
                handleInputChange(
                  "contactInfo",
                  parseContactInfo(e.target.value)
                )
              } // Parse string to array
              placeholder={`Phone: +971...\nEmail: user@example.com\nWebsite: www.example.com\nAddress: ...`}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="letterBody" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Letter Body
            </Label>
            <Textarea
              id="letterBody"
              value={formData.letterBody}
              onChange={(e) => handleInputChange("letterBody", e.target.value)}
              placeholder="Main content of the letter"
              rows={10}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Position
              </Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Pen className="w-4 h-4" />
              Signature
            </Label>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Draw Signature</Label>
                <SignatureCanvas
                  onSignatureChange={handleSignatureChange}
                  initialSignature={formData.signatureImage}
                />
              </div>
              <div className="text-center text-sm text-muted-foreground">
                OR
              </div>
              <div>
                <Label
                  htmlFor="signatureUpload"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Upload Signature Image
                </Label>
                <Input
                  id="signatureUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Stamp className="w-4 h-4" />
              Top Approval Stamp
            </Label>
            <div className="space-y-2">
              <div>
                <Label htmlFor="approvalStampText">Approval Stamp Text</Label>
                <Input
                  id="approvalStampText"
                  value={formData.approvalStamp}
                  onChange={(e) =>
                    handleInputChange("approvalStamp", e.target.value)
                  }
                  placeholder="e.g., APPROVED"
                />
              </div>
              <div>
                <Label htmlFor="approvalStampFile">
                  Or Upload Approval Stamp Image
                </Label>
                <Input
                  id="approvalStampFile"
                  type="file"
                  accept="image/*"
                  onChange={handleApprovalStampFileChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Stamp className="w-4 h-4" />
              Bottom Approval Stamp
            </Label>
            <div className="space-y-2">
              <div>
                <Label htmlFor="bottomApprovalStampText">
                  Bottom Approval Stamp Text
                </Label>
                <Input
                  id="bottomApprovalStampText"
                  value={formData.bottomApprovalStamp}
                  onChange={(e) =>
                    handleInputChange("bottomApprovalStamp", e.target.value)
                  }
                  placeholder="e.g., VERIFIED"
                />
              </div>
              <div>
                <Label htmlFor="bottomApprovalStampFile">
                  Or Upload Bottom Approval Stamp Image
                </Label>
                <Input
                  id="bottomApprovalStampFile"
                  type="file"
                  accept="image/*"
                  onChange={handleBottomApprovalStampFileChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Stamp className="w-4 h-4" />
              Company Stamp/Seal (Bottom Right)
            </Label>
            <div className="space-y-2">
              <div>
                <Label htmlFor="stampText">Stamp Text</Label>
                <Input
                  id="stampText"
                  value={formData.stamp}
                  onChange={(e) => handleInputChange("stamp", e.target.value)}
                  placeholder="e.g., SEAL"
                />
              </div>
              <div>
                <Label htmlFor="stampFile">Or Upload Stamp Image</Label>
                <Input
                  id="stampFile"
                  type="file"
                  accept="image/*"
                  onChange={handleStampFileChange}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Generate Letter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LetterForm;
