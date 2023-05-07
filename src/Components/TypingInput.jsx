import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import randomWords from 'random-words'

function TypingInput() {
    const ref = useRef()
    const [timeCount , setTimeCount]=useState(60)
    const [word , setWord]=useState([])
    const [inputValue , setInputValue]=useState('')
    const [inputWordIndex , setInputWordIndex]=useState(0)
    const [charIndex , setChartIndex]=useState(-1)
    const [inputChar , setInputChar]=useState('')
    const [correct , setCorrect]=useState(0)
    const [inCorrect , setInCorrect]=useState(0)
    const [status , setStatus] = useState('')

    useEffect(()=>{
      if(status === 'start'){
       ref.current.focus()
      }
    },[status])
  
    function handleClick  (){

     if(status !== 'start'){
       
     setStatus('start')
     const interval = setInterval(()=>{
      setTimeCount((preCount)=>{

        if(preCount === 0){
          clearInterval(interval)
          setStatus('finished')
          setInputValue('')
          return 60
         }else{

          return preCount -1
        }

      }
      )
   }, 1000)
   
     }
     if(status === 'finished'){
      setWord(randomWords(30))
      setInputWordIndex(0)
      setCorrect(0)
      setInCorrect(0)
      setChartIndex(-1)
      setInputChar('')
     }
     
    }
  
    useEffect(()=>{
        setWord(randomWords(30)) 

       },[])
      function keyChecker ({keyCode,key}){
        if(keyCode === 32){
          checkMatch()
          setInputValue('')
          setInputWordIndex(inputWordIndex + 1)
          setChartIndex(-1)
        } else if(keyCode === 8){
          setChartIndex(charIndex -1)
          setInputChar('')
        }else{
          setChartIndex(charIndex+1)
          setInputChar(key)
        }
      }
      function checkMatch (){
        const compare = word[inputWordIndex]
        const doseItMatch = compare === inputValue.trim()
        if(doseItMatch){
          setCorrect(correct + 1)
        }
        else{
          setInCorrect(inCorrect + 1)
        }
      }
      function getClass(wordIdx, charIdx, charr){
        if(wordIdx === inputWordIndex && charIdx ===charIndex&&charr && status !== 'finished'){
        if(charr ===inputChar){

          return 'char-bg'
        }else{
          return 'char-bg2'
         }
        }else if (wordIdx ===inputWordIndex && charIndex >= word[inputWordIndex].length ){
          return 'char-bg2'
        }
        else{
          return ''
        }

      }
  return (
    <>
<section className="main-body">
    <h2>typing Speed test</h2>
    <div className='text-box'>
    { status === 'start' && (
      word.map((item,i)=>
      <span key={i} className="showSentence">{item.split('').map((char , idx )=>
     <span key={idx} className={getClass(i,idx,char)}>{char}</span>)}<span> </span></span>
      )
    )
    
    }

    </div>

    <div className="typing_section">
    <p className="timer">Time:{timeCount}</p>
        
        <input ref={ref}  className="textarea" onKeyDown={keyChecker} disabled = {status !== 'start'} onChange={(e)=>setInputValue(e.target.value)} value={inputValue}/>
        <br/>
        <button className="btn" onClick={handleClick}>Start</button>
    </div>
       {status === 'finished' && (
        <>
 <p className="score">WPM:{correct}</p>
 <p className="score">Accuracy:{correct / (correct+inCorrect)*100}%</p>
 </>
       )}
   
    
</section>
    </>
  )
}

export default TypingInput