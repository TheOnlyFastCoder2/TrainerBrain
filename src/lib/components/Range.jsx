import { useEffect, useRef, useState } from "react"

export default function ({title, min, max, step, prefix, handler}) {;
  const refTrack = useRef(null);
  const refThumb = useRef(null);

  const [value,setValue] = useState(min);

  function formattingValue(min,max,percent) {
    return ((max - min) * percent + min).toFixed(0);
  }

  function setSlip(thumb,track) {

    thumb.onmousedown = () => {
      window.onmousemove = ({clientX}) => {
        const posX = clientX - track.getBoundingClientRect().left;
        const percent = posX / track.offsetWidth;

        if(posX % step < 1) {
         
          if(percent >= 0 && percent <= 1) {
            const val = formattingValue(min,max,percent);
            thumb.style.left = percent*100-5+"%";
            setValue(val);
            handler(val);
          }
        }
      }

      window.onmouseup = () => {
        window.onmousemove = null
      }
    }
  }
  
  useEffect(() => {
    const track = refTrack.current;
    const thumb = refThumb.current;

    setSlip(thumb,track);
  },[])

  return (
    <>
      <div className="Range">
        {title && <h3>{title}</h3>}
        <div className="Range_track" ref={refTrack}>
          <span className="Range_track_thumb" ref={refThumb}></span>
        </div>
        <div className="Range_value">{value+prefix}</div>
      </div>
    </>
  )

}