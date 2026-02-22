import "./HeadingCompName.css"
import { memo } from "react"
interface HeadingCompNameProp{
    Name:string;

}

export const HeadingCompName = memo(({Name}:HeadingCompNameProp) => {
  return (
      <div className=" relative mb-2">
  <button className="cyber-btn">{Name}</button>
  <div className="cyber-tooltip ">
    <div className="corner-tl"></div>
    <div className="corner-tr"></div>
    <div className="corner-bl"></div>
    <div className="corner-br"></div>
    NegmCartilla
    </div>
    </div>
  )
})
