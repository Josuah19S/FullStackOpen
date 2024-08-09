import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <tr><StatisticsLine text='good' value={props.good}/></tr>
      <tr><StatisticsLine text='neutral' value={props.neutral}/></tr>
      <tr><StatisticsLine text='bad' value={props.bad}/></tr>
      <tr><StatisticsLine text='all' value={props.all}/></tr>
      <tr><StatisticsLine text='average' value={props.average}/></tr>
      <tr><StatisticsLine text='positive' value={props.positive}/></tr>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button handleClick={() => setBad(bad+1)} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={total} average={(good-bad)/total} positive={(good/total*100)+' %'}/>
    </div>
  )
}

export default App
