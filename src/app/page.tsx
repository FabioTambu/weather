"use client"
import './page.scss'
import {useState} from "react";
import {Input} from "@/components/input/input";
import {Output} from "@/components/output/output";

export default function Home() {

  const [city, setCity] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(true);
  const [lon, setLon] = useState<number>();
  const [lat, setLat] = useState<number>();

  const handleInputChange = (cityValue: string, showInputRectangle: boolean, latitude: string, longitude: string) => {
    setCity(cityValue);
    setShowInput(showInputRectangle);
    setLat(parseFloat(latitude));
    setLon(parseFloat(longitude));
  }

  const handleOutputChange = (showInput: boolean) => {
    setShowInput(showInput)
  }

  return (
      <div className="app-container">
        <div className="app-container__content">
          {showInput ?
              <Input onClick={handleInputChange}/> :
              <Output onBackClicked={handleOutputChange} city={city} lat={lat} lon={lon}/>
          }
        </div>
      </div>
  );
}
