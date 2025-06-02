const ShowToast = ({ text }: { text: string }) => (
    <div className="w-full md:w-fit md:text-nowrap md:mx-auto px-4 bg-red-400  p-2 rounded">
      {text}
    </div>
  );
  
  export default ShowToast;
