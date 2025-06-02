import AnimationLoaderForZincBG from "../utils/AnimationLoaderForZincBG";

interface LoaderCardForPreviewProps {
  length?: number;
}

const LoaderCardForPreview: React.FC<LoaderCardForPreviewProps> = ({ length = 5 }) => {
  return (
    <div className="w-[90%] flex flex-col items-center"  >
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="w-full h-[10vh] mx-[5%] mt-2">
          <AnimationLoaderForZincBG />
        </div>
      ))}
    </div>
  );
};

export default LoaderCardForPreview;
