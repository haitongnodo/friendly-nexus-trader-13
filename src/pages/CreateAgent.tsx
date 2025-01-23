import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateAgent = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>Create Your Agent</h1>
      <div className="mt-8">
        <div className="bg-[#16171E] border-2 border-dashed border-[#222329] rounded-lg p-10 text-center cursor-pointer hover:border-[#FB7402] transition-colors aspect-video flex flex-col items-center justify-center">
          <Upload className="h-8 w-8" />
          <p className="text-sm text-muted-foreground mt-4 mb-2">Drop image here or click to upload</p>
          <p className="text-xs text-muted-foreground">Supported formats: PNG, JPG, GIF (max. 5MB)</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
      </div>
      <Button className="mt-4">Create Agent</Button>
    </div>
  );
};

export default CreateAgent;
