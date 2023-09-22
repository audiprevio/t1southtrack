import React, { useState, useEffect } from 'react';

const PenguinComponent = () => {
  const [data, setData] = useState<Penguin[] | null>(null);

  interface Penguin {
    penguinName: string;
    lastPosition: number[];
    lastUpdate: string;
    speciesName: string;
    ageAtTagging: string;
    taggedPosition: string;
    taggedTime: string;
    taggedBy: string;
  }
  

  useEffect(() => {
    fetch('https://penguintrackerapi.fly.dev/admin/penguins')
      .then(response => response.json())
      .then((data: Penguin[]) => setData(data));
  }, []);

  return (
    <div className="card">
      {data ? (
        data.map((penguin, index) => (
          <div key={index}>
            <h2>{penguin.penguinName}</h2>
            <p>Last Position: {penguin.lastPosition.join(', ')}</p>
            <p>Last Update: {penguin.lastUpdate}</p>
            <p>Species Name: {penguin.speciesName}</p>
            <p>Age at Tagging: {penguin.ageAtTagging}</p>
            <p>Tagged Position: {penguin.taggedPosition}</p>
            <p>Tagged Time: {penguin.taggedTime}</p>
            <p>Tagged By: {penguin.taggedBy}</p>
          </div>
        ))
      ) : (
        'Loading Data...'
      )}
    </div>
  );
};

export default PenguinComponent;
