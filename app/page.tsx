import FinalImage from "@/components/FinalImage";
import ImageDisplay from "@/components/ImageDisplay";
import ImageTransform from "@/components/ImageTransform";
import UploadExample from "@/components/ImageUploader";


export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">CleanCut AI</h1>
      <div className="max-w-6xl mx-auto">
        <ImageDisplay />
        <ImageTransform />
        <FinalImage />
      </div>
    </main>
  );
}
