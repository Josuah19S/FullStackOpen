const Courses = (props) => {
    const { courses } = props
  
    return (
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </div>
        ))}
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    const { parts } = props
  
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part.name} exercises={part.exercises}/>
        ))}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum+part.exercises, 0)
  
    return (
      <div>
        <p><b>total of {total} exercises</b></p>
      </div>
    )
  }

  export default Courses