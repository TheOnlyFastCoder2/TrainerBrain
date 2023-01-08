export default function ({name,handler}) {
  const id = 'input-'+name;
  
  return (
    <div className="Input">
      <input 
        type="text" 
        name={id} 
        pattern="[^\S]"
        onChange={handler}/>

      <label htmlFor={id}>
        <span>{name}</span>
      </label>
    </div>
  )
}