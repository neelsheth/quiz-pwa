import React, { useEffect, useState } from 'react'
import YourScore from './YourScore';

export default function ShowQue(props) {
    const [idx, setidx] = useState(1);
    const [rightclass, setrightclass] = useState(null);
    const [wrongclass, setwrongclass] = useState(null);
    const [score, setScore] = useState(0);
    const [lock, setlock] = useState(false);
    const [minutes, setminutes] = useState(4);
    const [second, setSec] = useState(59);
    const [colSuff, setcolSuff] = useState('flexcol')
    const [rowSuff, setRowSuff] = useState('shuffleRow')
    const [showScore, setShowScore] = useState(false);



    //timer show
    useEffect(() => {
        const timefun = setInterval(() => {
            if (second > 0) {
                setSec(second - 1);
            }
            else {
                if (minutes > 0) {
                    setminutes(minutes - 1);
                    setSec(59);
                }
                else {
                    console.log(minutes);
                    alert("Time Out");
                    alert("your score is " + score);
                    props.gameover();
                    localStorage.removeItem('playing');
                }

            }
        }, 1000);
        return () => clearInterval(timefun)
    })

    //next Btn - changing question 
    const next = () => {
        if (lock == true) {

            if (idx < 10) {
                setidx(idx + 1);
                rightclass.className = 'optionIdx';
                wrongclass.className = 'optionIdx';
                setlock(false);
            }
            else {
                setShowScore(true);
                // alert("your score is " + score);
                // props.gameover();
                // localStorage.removeItem('playing');
            }
        }
        else {
            alert('please select any Option');
        }

    }

    //close score
    function close(){
        //  alert("your score is " + score);
                props.gameover();
                localStorage.removeItem('playing');
    }


    //shuffling option
    useEffect(() => {
        var randomIdx = Math.floor(Math.random() * 10) % 4
        if (randomIdx == 0) {
            setcolSuff('flexcolrev')
            setRowSuff('shuffleRowRev')
        }
        else if (randomIdx == 1) {
            setRowSuff('shuffleRowRev')
            setcolSuff('flexcol')
        }
        else if (randomIdx == 2) {
            setcolSuff('flexcol')
            setRowSuff('shuffleRow')
        }
        else if (randomIdx == 3) {
            setRowSuff('shuffleRow')
            setcolSuff('flexcolrev')
        }

    }, [idx])

    //checking right or wrong
    const check = (e) => {

        if (lock == false) {
            setlock(true);
            const selected = document.getElementById(e.target.id)
            setrightclass(selected);
            // console.log();
            if (selected.innerText != props.data[idx - 1].correctAnswer) {
                selected.className = 'wrong';
                console.log(score);
            }
            else {
                setScore(score + 1);
                console.log(score);
            }
            const rightAns = document.getElementById('d')
            setwrongclass(rightAns);
            rightAns.className = 'right';

        }
        else {
            alert('click Next');
        }
    }

    return (
        <div>
            {showScore ? <YourScore score={score} close ={()=>close()}></YourScore> :

                <div>

                    {/* timer */}
                    <div className='timerclass'>
                        <div><span className='timer'>{minutes + " : " + second}</span></div>
                    </div>

                    {/* question */}
                    <div className='questionCol'>
                        <div className='question'>
                            <span className='circle'>{idx}</span><span className='queBlock'>{props.data[idx - 1].question}</span>
                        </div>

                        <div className='option'>

                            <div className={colSuff}>
                                <div className={rowSuff}>
                                    <div className='optionIdx' id='a' onClick={(id) => check(id)}>
                                        {props.data[idx - 1].incorrectAnswers[0]}
                                    </div>
                                    <div className='optionIdx' id='b' onClick={(id) => check(id)}>
                                        {props.data[idx - 1].incorrectAnswers[1]}
                                    </div>
                                </div>
                                <div className={rowSuff}>
                                    <div className='optionIdx' id='c' onClick={(id) => check(id)}>
                                        {props.data[idx - 1].incorrectAnswers[2]}
                                    </div>
                                    <div className='optionIdx ' id='d' onClick={(id) => check(id)}>
                                        {props.data[idx - 1].correctAnswer}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <button className='nextBtn' onClick={next}>Next</button>
                        </div>

                    </div>

                </div>

            }

        </div>






    )
}
