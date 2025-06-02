import { MdErrorOutline } from "react-icons/md";
interface ErrorHandlerProps {
  messege: string;
}

function ErrorHandler({ messege }: ErrorHandlerProps) {
    messege && console.log(messege)
  return (
    <div className="w-full flex flex-col pb-[20vh] bg-[#111217] items-center justify-center gap-6 h-[100vh]">
      <MdErrorOutline className="text-white"  size={120}></MdErrorOutline>
      <h1 className="card font-extrabold text-white tracking-wider">{messege}!!!</h1>
    </div>
  );
}

export default ErrorHandler;
