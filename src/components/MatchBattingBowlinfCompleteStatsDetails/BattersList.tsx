import React from 'react';

interface PlayerProps {
  playerName: string;
  index: number;
}

function BattersList({ playerName,index }: PlayerProps) {
  return (
    <div key={index} className="w-full border-b-[#282930] border-b-[.1px] py-[2px] flex flex-col">
      {playerName} 
    </div>
  );
}

export default BattersList;
