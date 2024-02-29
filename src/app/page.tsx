"use client"
import './page.scss'
import {useState} from "react";
import {Input} from "@/components/input/input";
import {Loading} from "@/components/loading/loading";
import {Output} from "@/components/output/output";

export default function Home() {

  const [numberValue, setNumberValue] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [lon, setLon] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);

  const handleInputChange = (value: string, showInputRectangle: boolean, latitude: number, longitude: number) => {
    setNumberValue(value);
    setShowInput(showInputRectangle);
    setLoading(true);
    setLat(latitude);
    setLon(longitude);
  }

  const handleDataFetched = () => {
    setLoading(false)
  }

  return (
      <div className="app-container">
        <div className="app-container__content">
          {loading && <Loading/>}
          {showInput ?
              <Input onClick={handleInputChange}/> :
              <Output dataFetched={handleDataFetched}/>
          }
        </div>
      </div>
  );
}
